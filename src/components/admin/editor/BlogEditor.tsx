import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { Markdown } from "@tiptap/markdown";

import Toolbar from "@/components/admin/editor/Toolbar";

export interface BlogEditorHandle {
  getMarkdown: () => string;
}

const BlogEditor = forwardRef<
  BlogEditorHandle,
  {
    /** Markdown to load if present — the canonical, post-migration format. */
    initialMarkdown: string | null;
    /**
     * Raw HTML to load when there is no markdown yet — only true for the
     * handful of posts saved by the old Django/TinyMCE admin that predate
     * body_md. Tiptap parses this into the same document model; the first
     * save from here on writes body_md and the post never falls back to
     * this branch again.
     */
    initialHtml: string | null;
    editable?: boolean;
    /** Fired ~600ms after typing stops, for the autosave draft and live preview. */
    onChangeMarkdown?: (markdown: string) => void;
  }
>(({ initialMarkdown, initialHtml, editable = true, onChangeMarkdown }, ref) => {
  const hasMarkdown = !!initialMarkdown;
  const initialContent = hasMarkdown ? initialMarkdown! : initialHtml ?? "";
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: {
          openOnClick: false,
          autolink: true,
          HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
        },
      }),
      Image,
      Placeholder.configure({
        placeholder: "Write the post…",
      }),
      Markdown.configure({
        indentation: { style: "space", size: 2 },
      }),
    ],
    content: initialContent,
    contentType: hasMarkdown || !initialHtml ? "markdown" : "html",
    editable,
    editorProps: {
      attributes: {
        class:
          "prose prose-neutral max-w-none min-h-[50vh] px-4 py-3 focus:outline-none prose-img:rounded-md",
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor: e }) => {
      if (!onChangeMarkdown) return;
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => onChangeMarkdown(e.getMarkdown()), 600);
    },
  });

  useEffect(() => () => clearTimeout(debounceRef.current), []);

  useImperativeHandle(ref, () => ({
    getMarkdown: () => editor?.getMarkdown() ?? "",
  }));

  if (!editor) return null;

  return (
    <div className="overflow-hidden rounded-md border">
      {editable && <Toolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
});

BlogEditor.displayName = "BlogEditor";

export default BlogEditor;
