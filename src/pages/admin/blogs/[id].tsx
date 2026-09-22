import { useState } from "react";
import { useRouter } from "next/router";
import type { GetServerSideProps, NextPage } from "next";
import { Archive, ArchiveRestore, Trash2 } from "lucide-react";

import AdminLayout from "@/components/admin/AdminLayout";
import BlogEditorForm from "@/components/admin/blog/BlogEditorForm";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { requireAdminSSP } from "@/lib/admin/auth";
import { supabaseAdmin } from "@/lib/supabase";
import { RESOURCES } from "@/lib/admin/resources";
import { normalizeRowMedia } from "@/lib/admin/media-server";

interface BlogRow {
  id: number;
  title: string;
  author: string;
  credits: string | null;
  image: string | null;
  body: string | null;
  body_md: string | null;
  is_draft: boolean;
  is_archived: boolean;
}

const EditBlogPage: NextPage<{ email: string; blog: BlogRow }> = ({ email, blog }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isArchived, setIsArchived] = useState(blog.is_archived);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const archiveToggle = async () => {
    const next = !isArchived;
    const res = await fetch(`/api/admin/blogs/${blog.id}`, {
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
    const res = await fetch(`/api/admin/blogs/${blog.id}`, { method: "DELETE" });
    setConfirmingDelete(false);
    if (!res.ok && res.status !== 204) {
      const body = await res.json().catch(() => ({}));
      toast({ title: "Delete failed", description: body.detail, variant: "destructive" });
      return;
    }
    toast({ title: "Deleted permanently" });
    router.push("/admin/blogs");
  };

  return (
    <AdminLayout
      title="Edit blog"
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
      <BlogEditorForm
        id={blog.id}
        initial={{
          title: blog.title,
          author: blog.author,
          credits: blog.credits ?? "",
          image: blog.image,
          is_draft: blog.is_draft,
          body_md: blog.body_md,
          body: blog.body,
        }}
      />

      <ConfirmDialog
        open={confirmingDelete}
        onOpenChange={setConfirmingDelete}
        title="Delete this blog permanently?"
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

  const id = Number(ctx.params?.id);
  if (!Number.isInteger(id)) return { notFound: true };

  const { data, error } = await supabaseAdmin
    .from(RESOURCES.blogs.table)
    .select(RESOURCES.blogs.formSelect)
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return { notFound: true };

  return { props: { email: admin.email, blog: normalizeRowMedia(RESOURCES.blogs, data) } };
};

export default EditBlogPage;
