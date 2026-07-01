"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

type SheetSide = "right" | "left" | "top" | "bottom";

const slideVariants: Record<SheetSide, { hidden: Record<string, string | number>; visible: Record<string, string | number> }> = {
  right:  { hidden: { x: "100%" }, visible: { x: 0 } },
  left:   { hidden: { x: "-100%" }, visible: { x: 0 } },
  top:    { hidden: { y: "-100%" }, visible: { y: 0 } },
  bottom: { hidden: { y: "100%" }, visible: { y: 0 } },
};

const sideClasses: Record<SheetSide, string> = {
  right:  "inset-y-0 right-0 h-full w-full sm:max-w-sm",
  left:   "inset-y-0 left-0 h-full w-full sm:max-w-sm",
  top:    "inset-x-0 top-0 w-full",
  bottom: "inset-x-0 bottom-0 w-full",
};

export interface SheetRootProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  side?: SheetSide;
  className?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}

export function SheetRoot({
  open,
  onOpenChange,
  children,
  side = "right",
  className,
  "aria-labelledby": labelledby,
  "aria-describedby": describedby,
}: SheetRootProps) {
  const close = React.useCallback(() => onOpenChange(false), [onOpenChange]);
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const triggerRef = React.useRef<Element | null>(null);

  React.useEffect(() => {
    if (!open) return;
    triggerRef.current = document.activeElement;
    const frame = requestAnimationFrame(() => {
      const first = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      first?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [open]);

  React.useEffect(() => {
    if (open) return;
    const el = triggerRef.current;
    if (el instanceof HTMLElement) el.focus();
  }, [open]);

  React.useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { close(); return; }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      );
      if (!focusable.length) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  if (typeof window === "undefined") return null;

  const { hidden, visible } = slideVariants[side];

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />
          <motion.div
            key="panel"
            ref={panelRef}
            initial={hidden}
            animate={visible}
            exit={hidden}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledby}
            aria-describedby={describedby}
            className={cn(
              "fixed z-50 border bg-background shadow-xl",
              sideClasses[side],
              className
            )}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

export function SheetClose({
  onClose,
  className,
}: {
  onClose: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClose}
      className={cn(
        "absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground",
        className
      )}
      aria-label="Fermer"
    >
      <X className="h-4 w-4" />
    </button>
  );
}

// Layout sub-components — preserved as structural wrappers (backwards compatible)

export function Sheet({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("relative", className)} {...props} />;
}

export function SheetContent({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <aside className={cn("border bg-card p-6 shadow-lg", className)} {...props} />;
}

export function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-1.5 pb-4", className)} {...props} />;
}

export function SheetTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-lg font-semibold pr-8", className)} {...props} />;
}

export function SheetDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export function SheetBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-1 overflow-y-auto py-4", className)} {...props} />;
}

export function SheetFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex justify-end gap-2 border-t pt-4", className)} {...props} />
  );
}
