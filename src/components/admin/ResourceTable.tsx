import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, GripVertical, Archive, ArchiveRestore, Trash2, Pencil } from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { ResourceDef } from "@/lib/admin/resources";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import IconButton from "@/components/admin/IconButton";
import { cn } from "@/lib/utils";

type Row = Record<string, any>;
type Status = "active" | "archived" | "all";

function SortableRow({
  row,
  resource,
  onArchiveToggle,
  onDeleteRequest,
  draggable,
}: {
  row: Row;
  resource: ResourceDef;
  onArchiveToggle: (row: Row) => void;
  onDeleteRequest: (row: Row) => void;
  draggable: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: row.id,
    disabled: !draggable,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const hasImageColumn = resource.listColumns.some((c) => c.key === "image");

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-3 border-b bg-background px-3 py-2 last:border-b-0",
        isDragging && "z-10 opacity-80 shadow-md"
      )}
    >
      {draggable && (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              aria-label="Drag to reorder"
              className="cursor-grab touch-none text-muted-foreground active:cursor-grabbing"
              {...attributes}
              {...listeners}
            >
              <GripVertical className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent>Drag to reorder</TooltipContent>
        </Tooltip>
      )}

      {hasImageColumn && (
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded bg-muted">
          {row.image ? (
            <Image src={row.image} alt="" fill className="object-cover" unoptimized />
          ) : null}
        </div>
      )}

      <div className="min-w-0 flex-1">
        {resource.listColumns
          .filter((c) => c.key !== "image" && c.key !== "order")
          .map((col, i) => (
            <div
              key={col.key}
              className={cn(
                "truncate",
                i === 0 ? "text-sm font-medium" : "text-xs text-muted-foreground"
              )}
            >
              {formatValue(row[col.key], col.key)}
            </div>
          ))}
      </div>

      {row.is_draft && (
        <span className="rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300">
          Draft
        </span>
      )}
      {row.is_archived && (
        <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
          Archived
        </span>
      )}

      <div className="flex shrink-0 items-center gap-1">
        <Link href={`/admin/${resource.slug}/${row.id}`}>
          <IconButton label="Edit">
            <Pencil className="h-4 w-4" />
          </IconButton>
        </Link>
        <IconButton
          label={row.is_archived ? "Restore" : "Archive"}
          onClick={() => onArchiveToggle(row)}
        >
          {row.is_archived ? <ArchiveRestore className="h-4 w-4" /> : <Archive className="h-4 w-4" />}
        </IconButton>
        {row.is_archived && (
          <IconButton label="Delete permanently" onClick={() => onDeleteRequest(row)}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </IconButton>
        )}
      </div>
    </div>
  );
}

function formatValue(value: any, key: string) {
  if (value == null || value === "") return "—";
  if (key === "updated_at" || key === "created_at") {
    return new Date(value).toLocaleString();
  }
  return String(value);
}

const ResourceTable: React.FC<{ resource: ResourceDef }> = ({ resource }) => {
  const { toast } = useToast();
  const [status, setStatus] = useState<Status>("active");
  const [q, setQ] = useState("");
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [pendingDelete, setPendingDelete] = useState<Row | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

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
    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, is_archived: next } : r)));
    const res = await fetch(`/api/admin/${resource.slug}/${row.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_archived: next }),
    });
    if (!res.ok) {
      toast({ title: "Failed to update", variant: "destructive" });
      load();
      return;
    }
    if (status !== "all") load();
    toast({ title: next ? "Archived" : "Restored" });
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    const res = await fetch(`/api/admin/${resource.slug}/${pendingDelete.id}`, {
      method: "DELETE",
    });
    if (!res.ok && res.status !== 204) {
      const body = await res.json().catch(() => ({}));
      toast({ title: "Delete failed", description: body.detail, variant: "destructive" });
    } else {
      setRows((prev) => prev.filter((r) => r.id !== pendingDelete.id));
      toast({ title: "Deleted permanently" });
    }
    setPendingDelete(null);
  };

  const draggable = resource.orderable && status === "active" && !q.trim();

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = rows.findIndex((r) => r.id === active.id);
    const newIndex = rows.findIndex((r) => r.id === over.id);
    const reordered = arrayMove(rows, oldIndex, newIndex);
    setRows(reordered);

    const payload = reordered.map((r, i) => ({ id: r.id, order: i }));
    const res = await fetch(`/api/admin/${resource.slug}/reorder`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      toast({ title: "Failed to save order", variant: "destructive" });
      load();
    }
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

        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-52 pl-8"
            />
          </div>
          {!resource.readOnly && (
            <Link href={`/admin/${resource.slug}/new`}>
              <Button size="sm">
                <Plus className="h-4 w-4" />
                New
              </Button>
            </Link>
          )}
        </div>
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      ) : rows.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">
          Nothing here yet.
        </div>
      ) : draggable ? (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={rows.map((r) => r.id)} strategy={verticalListSortingStrategy}>
            <div className="overflow-hidden rounded-lg border">
              {rows.map((row) => (
                <SortableRow
                  key={row.id}
                  row={row}
                  resource={resource}
                  onArchiveToggle={archiveToggle}
                  onDeleteRequest={setPendingDelete}
                  draggable
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className="overflow-hidden rounded-lg border">
          {rows.map((row) => (
            <SortableRow
              key={row.id}
              row={row}
              resource={resource}
              onArchiveToggle={archiveToggle}
              onDeleteRequest={setPendingDelete}
              draggable={false}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        title={`Delete this ${resource.singular.toLowerCase()} permanently?`}
        description="This cannot be undone — the row will be removed from the database entirely, not just hidden."
        confirmLabel="Delete permanently"
        destructive
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ResourceTable;
