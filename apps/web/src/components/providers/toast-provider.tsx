"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      closeButton
      gap={8}
      toastOptions={{
        duration: 4000,
        classNames: {
          toast:
            "border bg-background text-foreground text-sm font-sans shadow-md rounded-none",
          title: "font-medium",
          description: "text-muted-foreground",
          actionButton:
            "bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-none",
          cancelButton:
            "bg-secondary text-secondary-foreground text-xs font-medium px-3 py-1 rounded-none",
          closeButton:
            "border-border bg-background text-muted-foreground hover:text-foreground rounded-none",
          error:   "border-destructive/40",
          success: "border-success/30",
          warning: "border-warning/30",
          info:    "border-blue-200/50",
        },
      }}
    />
  );
}
