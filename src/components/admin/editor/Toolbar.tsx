import { useRef, useState } from "react";
import type { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  LinkIcon,
  ImageIcon,
  Undo2,
  Redo2,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/admin/editor/Toggle";
import LinkDialog from "@/components/admin/editor/LinkDialog";
import { uploadImage, UploadError } from "@/lib/admin/upload";
import { MEDIA_FOLDERS } from "@/lib/admin/storage";
import { useToast } from "@/components/ui/use-toast";

const Toolbar: React.FC<{ editor: Editor }> = ({ editor }) => {
  const { toast } = useToast();
  const [linkOpen, setLinkOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const insertImage = async (file: File | undefined) => {
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadImage(file, MEDIA_FOLDERS.blogBody);
      editor.chain().focus().setImage({ src: url }).run();
    } catch (err) {
      toast({
        title: "Image upload failed",
        description: err instanceof UploadError ? err.message : "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1 border-b bg-muted/30 p-2">
      <Toggle
        pressed={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
        label="Bold"
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        label="Italic"
      >
        <Italic className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="mx-1 h-6" />

      <Toggle
        pressed={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        label="Heading 2"
      >
        <Heading2 className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        label="Heading 3"
      >
        <Heading3 className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="mx-1 h-6" />

      <Toggle
        pressed={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        label="Bullet list"
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        label="Numbered list"
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        label="Quote"
      >
        <Quote className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="mx-1 h-6" />

      <Toggle pressed={editor.isActive("link")} onClick={() => setLinkOpen(true)} label="Link">
        <LinkIcon className="h-4 w-4" />
      </Toggle>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => insertImage(e.target.files?.[0])}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        disabled={uploadingImage}
        onClick={() => fileInputRef.current?.click()}
        aria-label="Insert image"
      >
        {uploadingImage ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ImageIcon className="h-4 w-4" />
        )}
      </Button>

      <Separator orientation="vertical" className="mx-1 h-6" />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        aria-label="Undo"
      >
        <Undo2 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        aria-label="Redo"
      >
        <Redo2 className="h-4 w-4" />
      </Button>

      <LinkDialog editor={editor} open={linkOpen} onOpenChange={setLinkOpen} />
    </div>
  );
};

export default Toolbar;
