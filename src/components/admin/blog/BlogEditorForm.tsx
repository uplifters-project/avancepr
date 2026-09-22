import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Eye, Pencil } from "lucide-react";

import BlogEditor, { type BlogEditorHandle } from "@/components/admin/editor/BlogEditor";
import BlogBody from "@/components/blog/BlogBody";
import ImageField from "@/components/admin/ImageField";
import { MEDIA_FOLDERS } from "@/lib/admin/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

interface BlogFormState {
  title: string;
  author: string;
  credits: string;
  image: string | null;
  is_draft: boolean;
}

const emptyState: BlogFormState = {
  title: "",
  author: "",
  credits: "",
  image: null,
  is_draft: true,
};

const BlogEditorForm: React.FC<{
  /** null when creating a new post. */
  id: number | null;
  initial?: BlogFormState & { body_md: string | null; body: string | null };
}> = ({ id, initial }) => {
  const router = useRouter();
  const { toast } = useToast();
  const editorRef = useRef<BlogEditorHandle>(null);
  const [saving, setSaving] = useState(false);
  const [mode, setMode] = useState<"write" | "preview">("write");
  const [fields, setFields] = useState<BlogFormState>(initial ?? emptyState);
  const [liveMarkdown, setLiveMarkdown] = useState(initial?.body_md ?? "");
  const [restoredDraft, setRestoredDraft] = useState(false);
  // BlogEditor (Tiptap) only reads its initial content at mount time, so
  // restoring a localStorage draft after the fact (see the effect below,
  // which runs client-side only and therefore can't run during the first
  // render without a server/client hydration mismatch) requires forcing a
  // clean remount via `key`, not just updating a prop.
  const [editorSeed, setEditorSeed] = useState({
    key: 0,
    markdown: initial?.body_md ?? null,
    html: initial?.body ?? null,
  });

  const storageKey = `avancepr-admin-blog-draft-${id ?? "new"}`;

  // Restore an unsaved local draft (e.g. the tab was closed mid-edit)
  // once, on mount. Only offered when it actually differs from what's
  // already loaded, so a normal open never shows the banner.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const saved = JSON.parse(raw) as BlogFormState & { body_md: string };
      const baseline = initial ?? emptyState;
      const changed =
        saved.body_md !== (initial?.body_md ?? "") ||
        saved.title !== baseline.title ||
        saved.author !== baseline.author;
      if (changed) {
        setFields({
          title: saved.title,
          author: saved.author,
          credits: saved.credits,
          image: saved.image,
          is_draft: saved.is_draft,
        });
        setLiveMarkdown(saved.body_md);
        setEditorSeed((s) => ({ key: s.key + 1, markdown: saved.body_md, html: null }));
        setRestoredDraft(true);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_err) {
      // Corrupt/foreign localStorage value — ignore, keep server content.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autosave to localStorage, debounced.
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify({ ...fields, body_md: liveMarkdown })
        );
      } catch {
        // Storage full/unavailable (e.g. private browsing) — autosave is a
        // convenience, not a requirement; fail silently.
      }
    }, 400);
    return () => clearTimeout(t);
  }, [fields, liveMarkdown, storageKey]);

  const discardDraft = () => {
    localStorage.removeItem(storageKey);
    setFields(initial ?? emptyState);
    setLiveMarkdown(initial?.body_md ?? "");
    setRestoredDraft(false);
    router.reload();
  };

  const save = async () => {
    const body_md = editorRef.current?.getMarkdown() ?? liveMarkdown;
    const payload = { ...fields, body_md };

    setSaving(true);
    try {
      const url = id ? `/api/admin/blogs/${id}` : "/api/admin/blogs";
      const res = await fetch(url, {
        method: id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        toast({
          title: "Save failed",
          description: errBody.detail ?? "Check the fields above and try again.",
          variant: "destructive",
        });
        return;
      }

      const { data } = await res.json();
      localStorage.removeItem(storageKey);
      toast({ title: id ? "Blog updated" : "Blog created" });

      if (id) router.replace(router.asPath);
      else router.push(`/admin/blogs/${data.id}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div>
        {restoredDraft && (
          <div className="mb-4 flex items-center justify-between rounded-md border border-yellow-300 bg-yellow-50 px-4 py-2 text-sm text-yellow-900 dark:border-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-200">
            <span>Restored unsaved changes from this browser.</span>
            <Button variant="ghost" size="sm" onClick={discardDraft}>
              Discard, use saved version
            </Button>
          </div>
        )}

        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-1 rounded-md border p-1">
            <Button
              type="button"
              size="sm"
              variant={mode === "write" ? "secondary" : "ghost"}
              onClick={() => setMode("write")}
            >
              <Pencil className="h-3.5 w-3.5" />
              Write
            </Button>
            <Button
              type="button"
              size="sm"
              variant={mode === "preview" ? "secondary" : "ghost"}
              onClick={() => setMode("preview")}
            >
              <Eye className="h-3.5 w-3.5" />
              Preview
            </Button>
          </div>
          <Button onClick={save} disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </Button>
        </div>

        <div className={mode === "write" ? "" : "hidden"}>
          <BlogEditor
            key={editorSeed.key}
            ref={editorRef}
            initialMarkdown={editorSeed.markdown}
            initialHtml={editorSeed.html}
            onChangeMarkdown={setLiveMarkdown}
          />
        </div>

        {mode === "preview" && (
          <article className="rounded-md border p-6 text-lg">
            <h1 className="mb-2 text-center text-3xl font-bold">
              {fields.title || "Untitled post"}
            </h1>
            <p className="mb-8 text-center text-muted-foreground">{fields.author}</p>
            <BlogBody body_md={liveMarkdown} body={null} />
          </article>
        )}
      </div>

      <div className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="blog-title">Title</Label>
          <Input
            id="blog-title"
            maxLength={100}
            value={fields.title}
            onChange={(e) => setFields((f) => ({ ...f, title: e.target.value }))}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="blog-author">Author</Label>
          <Input
            id="blog-author"
            maxLength={50}
            value={fields.author}
            onChange={(e) => setFields((f) => ({ ...f, author: e.target.value }))}
          />
        </div>

        <div className="space-y-1.5">
          <Label>Cover image</Label>
          <ImageField
            value={fields.image}
            onChange={(image) => setFields((f) => ({ ...f, image }))}
            folder={MEDIA_FOLDERS.blogPhoto}
            label="Cover"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="blog-credits">Credits</Label>
          <Textarea
            id="blog-credits"
            rows={3}
            value={fields.credits}
            onChange={(e) => setFields((f) => ({ ...f, credits: e.target.value }))}
          />
        </div>

        <div className="flex items-center justify-between rounded-md border p-3">
          <div>
            <Label htmlFor="blog-draft">Draft</Label>
            <p className="text-xs text-muted-foreground">
              Hidden from the public site until turned off.
            </p>
          </div>
          <Switch
            id="blog-draft"
            checked={fields.is_draft}
            onCheckedChange={(is_draft) => setFields((f) => ({ ...f, is_draft }))}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogEditorForm;
