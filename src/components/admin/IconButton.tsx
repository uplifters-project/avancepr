import { forwardRef } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Every icon-only button in the admin dashboard (toolbar buttons, row
// actions like edit/archive/delete) goes through this, so what the icon
// does is never a guessing game — hovering always shows `label`, which
// also doubles as the accessible name. Requires a TooltipProvider
// ancestor (AdminLayout supplies one for every /admin page).
const IconButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, "size"> & { label: string; pressed?: boolean }
>(({ label, pressed, className, variant = "ghost", ...props }, ref) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        ref={ref}
        type="button"
        variant={variant}
        size="icon"
        aria-label={label}
        aria-pressed={pressed}
        className={cn("h-8 w-8", pressed && "bg-accent text-accent-foreground", className)}
        {...props}
      />
    </TooltipTrigger>
    <TooltipContent>{label}</TooltipContent>
  </Tooltip>
));
IconButton.displayName = "IconButton";

export default IconButton;
