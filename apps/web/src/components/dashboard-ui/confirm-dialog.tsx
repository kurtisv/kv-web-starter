"use client";
import * as React from "react";
import { useFormStatus } from "react-dom";
import { Loader2, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  warning?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "destructive" | "default";
  onConfirm?: () => void;
  action?: (formData: FormData) => void | Promise<void>;
  hiddenFields?: Record<string, string>;
  className?: string;
}

function ConfirmButton({
  label,
  variant,
}: {
  label: string;
  variant: "destructive" | "default";
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant={variant === "destructive" ? "destructive" : "default"}
      disabled={pending}
    >
      {pending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
      {label}
    </Button>
  );
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  warning,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  variant = "destructive",
  onConfirm,
  action,
  hiddenFields,
  className,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} className={cn("max-w-md", className)}>
      <DialogClose onClose={() => onOpenChange(false)} />
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>

      {warning && (
        <div className="mx-6 mb-2 flex items-start gap-2 border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
          {warning}
        </div>
      )}

      <DialogFooter>
        <Button
          type="button"
          variant="ghost"
          onClick={() => onOpenChange(false)}
        >
          {cancelLabel}
        </Button>

        {action ? (
          <form action={action}>
            {hiddenFields &&
              Object.entries(hiddenFields).map(([name, value]) => (
                <input key={name} type="hidden" name={name} value={value} />
              ))}
            <ConfirmButton label={confirmLabel} variant={variant} />
          </form>
        ) : (
          <Button
            type="button"
            variant={variant === "destructive" ? "destructive" : "default"}
            onClick={() => {
              onConfirm?.();
              onOpenChange(false);
            }}
          >
            {confirmLabel}
          </Button>
        )}
      </DialogFooter>
    </Dialog>
  );
}
