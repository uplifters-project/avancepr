import { useEffect, useState, useCallback } from "react";
import { Search, Archive, ArchiveRestore, Trash2, Eye } from "lucide-react";

import type { ResourceDef } from "@/lib/admin/resources";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Row = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  company_name: string | null;
  enquiry: string;
  is_archived: boolean;
  created_at: string;
};
type Status = "active" | "archived" | "all";

// Enquiries are read-only (see SECURITY_FIX_REPORT.md WAT-01 — this table
// backs that finding, so it gets its own list UI instead of ResourceTable's
// edit link / drag-reorder, neither of which apply here) — view full
// message, archive/restore (hide from the "Active" default view), delete
// permanently once archived.
const EnquiryTable: React.FC<{ resource: ResourceDef }> = ({ resource }) => {
  const { toast } = useToast();
  const [status, setStatus] = useState<Status>("active");
  const [q, setQ] = useState("");
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewing, setViewing] = useState<Row | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Row | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ status });
      if (q.trim()) params.set("q", q.trim());
      const res = await fetch(`/api/admin/${resource.slug}?${params.toString()}`);
      if (!res.ok) throw new Error();
      const { data } = await res.json();
      setRows(data ?? []);
    } catch {
      toast({ title: "Failed to load", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [resource.slug, status, q, toast]);

  useEffect(() => {
    const t = setTimeout(load, q ? 300 : 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, q]);

  const archiveToggle = async (row: Row) => {
    const next = !row.is_archived;
    const res = await fetch(`/api/admin/${resource.slug}/${row.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_archived: next }),
    });
    if (!res.ok) {
      toast({ title: "Failed to update", variant: "destructive" });
      return;
    }
    toast({ title: next ? "Archived" : "Restored" });
    load();
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    const res = await fetch(`/api/admin/${resource.slug}/${pendingDelete.id}`, { method: "DELETE" });
    if (!res.ok && res.status !== 204) {
      const body = await res.json().catch(() => ({}));
      toast({ title: "Delete failed", description: body.detail, variant: "destructive" });
    } else {
      toast({ title: "Deleted permanently" });
      load();
    }
    setPendingDelete(null);
  };

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={status} onValueChange={(v) => setStatus(v as Status)}>
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search name, email, phone…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-64 pl-8"
          />
        </div>
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : rows.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">
          No enquiries.
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border">
          {rows.map((row) => (
            <div
              key={row.id}
              className="flex items-center gap-4 border-b bg-background px-4 py-3 text-sm last:border-b-0"
            >
              <div className="min-w-0 flex-1">
                <div className="font-medium">{row.full_name}</div>
                <div className="truncate text-xs text-muted-foreground">
                  {row.email} · {row.phone}
                  {row.company_name ? ` · ${row.company_name}` : ""}
                </div>
              </div>
              <div className="shrink-0 text-xs text-muted-foreground">
                {new Date(row.created_at).toLocaleDateString()}
              </div>
              {row.is_archived && (
                <span className="shrink-0 rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  Archived
                </span>
              )}
              <div className="flex shrink-0 items-center gap-1">
                <Button variant="ghost" size="icon" aria-label="View" onClick={() => setViewing(row)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={row.is_archived ? "Restore" : "Archive"}
                  onClick={() => archiveToggle(row)}
                >
                  {row.is_archived ? (
                    <ArchiveRestore className="h-4 w-4" />
                  ) : (
                    <Archive className="h-4 w-4" />
                  )}
                </Button>
                {row.is_archived && (
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Delete permanently"
                    onClick={() => setPendingDelete(row)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={!!viewing} onOpenChange={(open) => !open && setViewing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{viewing?.full_name}</DialogTitle>
          </DialogHeader>
          {viewing && (
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-muted-foreground">Email:</span> {viewing.email}
              </p>
              <p>
                <span className="text-muted-foreground">Phone:</span> {viewing.phone}
              </p>
              {viewing.company_name && (
                <p>
                  <span className="text-muted-foreground">Company:</span> {viewing.company_name}
                </p>
              )}
              <p>
                <span className="text-muted-foreground">Received:</span>{" "}
                {new Date(viewing.created_at).toLocaleString()}
              </p>
              <div className="whitespace-pre-wrap rounded-md border bg-muted/30 p-3">
                {viewing.enquiry || "(no message)"}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!pendingDelete}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        title="Delete this enquiry permanently?"
        description="This cannot be undone — the row will be removed from the database entirely, not just hidden."
        confirmLabel="Delete permanently"
        destructive
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default EnquiryTable;
