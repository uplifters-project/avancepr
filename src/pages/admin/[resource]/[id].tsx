import { useState } from "react";
import { useRouter } from "next/router";
import type { GetServerSideProps, NextPage } from "next";
import { Archive, ArchiveRestore, Trash2 } from "lucide-react";

import AdminLayout from "@/components/admin/AdminLayout";
import ResourceForm from "@/components/admin/ResourceForm";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { requireAdminSSP } from "@/lib/admin/auth";
import { supabaseAdmin } from "@/lib/supabase";
import { getResource, GENERIC_RESOURCE_SLUGS, type ResourceSlug } from "@/lib/admin/resources";
import { normalizeRowMedia } from "@/lib/admin/media-server";

const EditResourcePage: NextPage<{
  email: string;
  slug: ResourceSlug;
  row: Record<string, any>;
}> = ({ email, slug, row }) => {
  const resource = getResource(slug)!;
  const router = useRouter();
  const { toast } = useToast();
  const [isArchived, setIsArchived] = useState<boolean>(row.is_archived);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const archiveToggle = async () => {
    const next = !isArchived;
    const res = await fetch(`/api/admin/${resource.slug}/${row.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_archived: next }),
    });
    if (!res.ok) {
      toast({ title: "Failed to update", variant: "destructive" });
      return;
    }
    setIsArchived(next);
    toast({ title: next ? "Archived" : "Restored" });
  };

  const confirmDelete = async () => {
    const res = await fetch(`/api/admin/${resource.slug}/${row.id}`, { method: "DELETE" });
    setConfirmingDelete(false);
    if (!res.ok && res.status !== 204) {
      const body = await res.json().catch(() => ({}));
      toast({ title: "Delete failed", description: body.detail, variant: "destructive" });
      return;
    }
    toast({ title: "Deleted permanently" });
    router.push(`/admin/${resource.slug}`);
  };

  return (
    <AdminLayout
      title={`Edit ${resource.singular}`}
      email={email}
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={archiveToggle}>
            {isArchived ? (
              <>
                <ArchiveRestore className="h-3.5 w-3.5" />
                Restore
              </>
            ) : (
              <>
                <Archive className="h-3.5 w-3.5" />
                Archive
              </>
            )}
          </Button>
          {isArchived && (
            <Button variant="outline" size="sm" onClick={() => setConfirmingDelete(true)}>
              <Trash2 className="h-3.5 w-3.5 text-destructive" />
              Delete
            </Button>
          )}
        </div>
      }
    >
      <ResourceForm resource={resource} defaultValues={row} id={row.id} />

      <ConfirmDialog
        open={confirmingDelete}
        onOpenChange={setConfirmingDelete}
        title={`Delete this ${resource.singular.toLowerCase()} permanently?`}
        description="This cannot be undone — the row will be removed from the database entirely, not just hidden."
        confirmLabel="Delete permanently"
        destructive
        onConfirm={confirmDelete}
      />
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const admin = await requireAdminSSP(ctx);
  if ("redirect" in admin) return admin;

  const slug = String(ctx.params?.resource);
  if (!GENERIC_RESOURCE_SLUGS.includes(slug as ResourceSlug)) return { notFound: true };

  const resource = getResource(slug)!;
  const id = Number(ctx.params?.id);
  if (!Number.isInteger(id)) return { notFound: true };

  const { data, error } = await supabaseAdmin
    .from(resource.table)
    .select(resource.formSelect)
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return { notFound: true };

  return { props: { email: admin.email, slug, row: normalizeRowMedia(resource, data) } };
};

export default EditResourcePage;
