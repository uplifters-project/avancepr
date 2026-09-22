import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";

import { uploadImage, UploadError } from "@/lib/admin/upload";
import type { MediaFolder } from "@/lib/admin/storage";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

const ImageField: React.FC<{
  value: string | null;
  onChange: (url: string | null) => void;
  folder: MediaFolder;
  label?: string;
}> = ({ value, onChange, folder, label }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
    } catch (err) {
      toast({
        title: "Upload failed",
        description: err instanceof UploadError ? err.message : "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <div
        className={cn(
          "relative flex h-40 w-full items-center justify-center overflow-hidden rounded-md border border-dashed bg-muted/30",
          uploading && "opacity-60"
        )}
      >
        {value ? (
          <Image src={value} alt={label ?? "Image"} fill className="object-cover" unoptimized />
        ) : (
          <span className="text-sm text-muted-foreground">No image</span>
        )}
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="h-3.5 w-3.5" />
          {value ? "Replace" : "Upload"}
        </Button>
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={uploading}
            onClick={() => onChange(null)}
          >
            <X className="h-3.5 w-3.5" />
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};

export default ImageField;
