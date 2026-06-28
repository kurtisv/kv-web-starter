"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { DrawerFooter, EntityDrawer } from "./entity-drawer";

interface AdminFormDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  submitLabel?: string;
  cancelLabel?: string;
  formId?: string;
  loading?: boolean;
}

export function AdminFormDrawer({
  open,
  onOpenChange,
  title,
  description,
  children,
  submitLabel = "Sauvegarder",
  cancelLabel = "Annuler",
  formId,
  loading = false,
}: AdminFormDrawerProps) {
  return (
    <EntityDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      width="lg"
      footer={
        <DrawerFooter>
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
            {cancelLabel}
          </Button>
          <Button type="submit" form={formId} disabled={loading}>
            {loading ? "Sauvegarde..." : submitLabel}
          </Button>
        </DrawerFooter>
      }
    >
      {children}
    </EntityDrawer>
  );
}
