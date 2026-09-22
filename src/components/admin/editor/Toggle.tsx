import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Small pressed-state toolbar button. Not the shadcn "toggle" primitive
// (not installed) — this is deliberately minimal since the toolbar only
// ever needs an active/inactive visual, not a full toggle-group.
export const Toggle: React.FC<{
  pressed: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}> = ({ pressed, onClick, label, children }) => (
  <Button
    type="button"
    variant="ghost"
    size="icon"
    aria-label={label}
    aria-pressed={pressed}
    onClick={onClick}
    className={cn("h-8 w-8", pressed && "bg-accent text-accent-foreground")}
  >
    {children}
  </Button>
);
