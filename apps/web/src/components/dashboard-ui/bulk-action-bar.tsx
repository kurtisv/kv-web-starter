"use client";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { EASE, DURATION } from "@/components/animations/motion";

export interface BulkAction {
  label: string;
  onClick: () => void;
  variant?: "default" | "destructive" | "ghost" | "secondary";
  icon?: React.ReactNode;
}

interface BulkActionBarProps {
  selectedCount: number;
  actions: BulkAction[];
  onClear: () => void;
  entityLabel?: string;
  className?: string;
}

export function BulkActionBar({
  selectedCount,
  actions,
  onClear,
  entityLabel = "element",
  className,
}: BulkActionBarProps) {
  const visible = selectedCount > 0;

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          key="bulk-bar"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: DURATION.base * 0.7, ease: EASE.sharp }}
          className={cn(
            "fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3",
            "border bg-background px-4 py-2.5 shadow-lg",
            className
          )}
        >
          {/* Count */}
          <span className="shrink-0 text-sm font-medium tabular-nums">
            {selectedCount} {selectedCount === 1 ? entityLabel : `${entityLabel}s`} selectionne
            {selectedCount > 1 ? "s" : ""}
          </span>

          <div className="h-4 w-px bg-border" aria-hidden />

          {/* Actions */}
          {actions.map((action) => (
            <Button
              key={action.label}
              size="sm"
              variant={action.variant ?? "secondary"}
              onClick={action.onClick}
            >
              {action.icon}
              {action.label}
            </Button>
          ))}

          {/* Clear */}
          <button
            type="button"
            onClick={onClear}
            className="ml-1 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Annuler la selection"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
