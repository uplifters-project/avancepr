import { useEffect, useState } from "react";
import type { Editor } from "@tiptap/react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const LinkDialog: React.FC<{
  editor: Editor;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}> = ({ editor, open, onOpenChange }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (open) {
      setUrl(editor.getAttributes("link").href ?? "");
    }
  }, [open, editor]);

  const apply = () => {
    const trimmed = url.trim();
    if (!trimmed) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: trimmed, target: "_blank" })
        .run();
    }
    onOpenChange(false);
  };

  const remove = () => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Link</DialogTitle>
        </DialogHeader>
        <div className="space-y-1.5">
          <Label htmlFor="link-url">URL</Label>
          <Input
            id="link-url"
            placeholder="https://"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                apply();
              }
            }}
            autoFocus
          />
        </div>
        <DialogFooter>
          {editor.isActive("link") && (
            <Button type="button" variant="ghost" onClick={remove}>
              Remove link
            </Button>
          )}
          <Button type="button" onClick={apply}>
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LinkDialog;
