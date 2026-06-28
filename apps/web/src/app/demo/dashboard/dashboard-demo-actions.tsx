"use client";

import * as React from "react";
import { Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/dashboard-ui/confirm-dialog";
import { EntityDrawer, DrawerFooter } from "@/components/dashboard-ui/entity-drawer";
import { StatusBadge } from "@/components/dashboard-ui/status-badge";
import { notify } from "@/components/ui/use-toast";

export function DashboardDemoActions() {
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDrawerOpen(true)}
          >
            <Eye className="h-3.5 w-3.5" />
            Voir un utilisateur
          </Button>
          <Badge variant="outline" size="sm" className="font-mono text-[10px]">
            EntityDrawer
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={() => setConfirmOpen(true)}
          >
            <Trash2 className="h-3.5 w-3.5" />
            Supprimer un compte
          </Button>
          <Badge variant="outline" size="sm" className="font-mono text-[10px]">
            ConfirmDialog
          </Badge>
        </div>
      </div>

      {/* EntityDrawer */}
      <EntityDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        title="Alice Dupont"
        description="Details du compte utilisateur"
        footer={
          <DrawerFooter>
            <Button variant="ghost" size="sm" onClick={() => setDrawerOpen(false)}>
              Fermer
            </Button>
            <Button size="sm" onClick={() => notify.success("Sauvegarde")}>
              Sauvegarder
            </Button>
          </DrawerFooter>
        }
      >
        <div className="grid gap-4 text-sm">
          <div className="grid gap-1">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Nom</span>
            <span>Alice Dupont</span>
          </div>
          <div className="grid gap-1">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Email</span>
            <span>alice@ex.com</span>
          </div>
          <div className="grid gap-1">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Plan</span>
            <span><Badge variant="outline" size="sm">Pro</Badge></span>
          </div>
          <div className="grid gap-1">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Statut</span>
            <StatusBadge status="active" label="Actif" dot />
          </div>
          <div className="grid gap-1">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Inscrit le</span>
            <span>14 juin 2026</span>
          </div>
        </div>
      </EntityDrawer>

      {/* ConfirmDialog */}
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Supprimer ce compte ?"
        description="alice@ex.com — Plan Pro — inscrite le 14 juin 2026"
        warning="Cette action est irreversible. Toutes les donnees associees seront supprimees."
        confirmLabel="Oui, supprimer"
        cancelLabel="Annuler"
        variant="destructive"
        onConfirm={() => {
          notify.success("Compte supprime", "alice@ex.com a ete supprimee.");
        }}
      />
    </>
  );
}
