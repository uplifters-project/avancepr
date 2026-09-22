import { useState } from "react";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { ResourceDef } from "@/lib/admin/resources";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import ImageField from "@/components/admin/ImageField";

const ResourceForm: React.FC<{
  resource: ResourceDef;
  defaultValues: Record<string, any>;
  /** Existing row id, or null when creating. */
  id?: number;
  onSaved?: (row: any) => void;
}> = ({ resource, defaultValues, id, onSaved }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resource.schema),
    defaultValues,
  });

  const onSubmit = async (values: Record<string, any>) => {
    setSubmitting(true);
    try {
      const url = id ? `/api/admin/${resource.slug}/${id}` : `/api/admin/${resource.slug}`;
      const method = id ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        toast({
          title: "Save failed",
          description: body.detail ?? "Something went wrong.",
          variant: "destructive",
        });
        return;
      }

      const { data } = await res.json();
      toast({ title: id ? `${resource.singular} updated` : `${resource.singular} created` });

      if (onSaved) onSaved(data);
      else router.push(`/admin/${resource.slug}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-5">
      {resource.fields.map((field) => (
        <div key={field.name} className="space-y-1.5">
          <Label htmlFor={field.name}>
            {field.label}
            {field.required && <span className="text-destructive"> *</span>}
          </Label>

          {field.type === "text" && (
            <Input id={field.name} maxLength={field.maxLength} {...register(field.name)} />
          )}

          {field.type === "textarea" && (
            <Textarea id={field.name} rows={5} {...register(field.name)} />
          )}

          {field.type === "url" && (
            <Input id={field.name} type="url" placeholder="https://" {...register(field.name)} />
          )}

          {field.type === "number" && (
            <Input id={field.name} type="number" min={0} {...register(field.name)} />
          )}

          {field.type === "boolean" && (
            <Controller
              name={field.name}
              control={control}
              render={({ field: { value, onChange } }) => (
                <div>
                  <Switch checked={!!value} onCheckedChange={onChange} />
                </div>
              )}
            />
          )}

          {field.type === "image" && field.folder && (
            <Controller
              name={field.name}
              control={control}
              render={({ field: { value, onChange } }) => (
                <ImageField value={value ?? null} onChange={onChange} folder={field.folder!} label={field.label} />
              )}
            />
          )}

          {field.helpText && (
            <p className="text-xs text-muted-foreground">{field.helpText}</p>
          )}
          {errors[field.name] && (
            <p className="text-xs text-destructive">
              {String(errors[field.name]?.message ?? "Invalid value")}
            </p>
          )}
        </div>
      ))}

      <div className="flex gap-2">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving…" : id ? "Save changes" : `Create ${resource.singular.toLowerCase()}`}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push(`/admin/${resource.slug}`)}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ResourceForm;
