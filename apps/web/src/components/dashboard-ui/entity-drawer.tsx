"use client";
import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE, DURATION } from "@/components/animations/motion";

interface EntityDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: "sm" | "md" | "lg";
  className?: string;
}

const WIDTH_CLASS = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
};

export function EntityDrawer({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  width = "md",
  className,
}: EntityDrawerProps) {
  const close = React.useCallback(() => onOpenChange(false), [onOpenChange]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.fast }}
            className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />

          {/* Panel */}
          <motion.aside
            key="drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: DURATION.base * 0.85, ease: EASE.sharp }}
            className={cn(
              "fixed inset-y-0 right-0 z-50 flex w-full flex-col border-l bg-background shadow-2xl",
              WIDTH_CLASS[width],
              className
            )}
          >
            {/* Header */}
            <div className="flex shrink-0 items-start justify-between gap-4 border-b px-6 py-5">
              <div>
                <h2 className="text-base font-semibold">{title}</h2>
                {description && (
                  <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
                )}
              </div>
              <button
                type="button"
                onClick={close}
                className="mt-0.5 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Fermer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>

            {/* Footer */}
            {footer && (
              <div className="shrink-0 border-t px-6 py-4">{footer}</div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

export function DrawerFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex justify-end gap-2", className)}>
      {children}
    </div>
  );
}
