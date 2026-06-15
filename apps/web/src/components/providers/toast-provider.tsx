"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "border bg-background text-foreground text-sm font-sans shadow-md",
          title: "font-medium",
          description: "text-muted-foreground",
          actionButton:
            "bg-primary text-primary-foreground text-xs font-medium px-3 py-1",
          cancelButton:
            "bg-secondary text-secondary-foreground text-xs font-medium px-3 py-1",
          error: "border-destructive/50 text-destructive",
          success: "border-success/20 text-success",
        },
      }}
    />
  );
}
