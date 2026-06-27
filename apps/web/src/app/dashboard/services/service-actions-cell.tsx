"use client";
import * as React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { EntityDrawer, DrawerFooter } from "@/components/dashboard-ui/entity-drawer";
import { ConfirmDialog } from "@/components/dashboard-ui/confirm-dialog";

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  durationMin: number;
  priceCents: number | null;
  isActive: boolean;
}

interface ServiceActionsCellProps {
  service: Service;
  updateAction: (formData: FormData) => void | Promise<void>;
  deactivateAction: (formData: FormData) => void | Promise<void>;
}

export function ServiceActionsCell({
  service,
  updateAction,
  deactivateAction,
}: ServiceActionsCellProps) {
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  return (
    <>
      <div className="flex items-center justify-end gap-1">
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => setEditOpen(true)}
          aria-label="Modifier"
        >
          <Pencil className="h-3.5 w-3.5" />
        </Button>
        {service.isActive && (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => setDeleteOpen(true)}
            aria-label="Desactiver"
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      {/* Edit drawer */}
      <EntityDrawer
        open={editOpen}
        onOpenChange={setEditOpen}
        title={`Modifier — ${service.name}`}
        description="Les modifications sont appliquees immediatement."
        footer={
          <DrawerFooter>
            <Button type="button" variant="ghost" onClick={() => setEditOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" form={`edit-service-${service.id}`}>
              Sauvegarder
            </Button>
          </DrawerFooter>
        }
      >
        <form
          id={`edit-service-${service.id}`}
          action={updateAction}
          onSubmit={() => setEditOpen(false)}
          className="grid gap-4"
        >
          <input type="hidden" name="serviceId" value={service.id} />

          <div className="grid gap-2">
            <Label htmlFor={`edit-name-${service.id}`}>Nom</Label>
            <Input
              id={`edit-name-${service.id}`}
              name="name"
              defaultValue={service.name}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`edit-slug-${service.id}`}>Slug</Label>
            <Input
              id={`edit-slug-${service.id}`}
              name="slug"
              defaultValue={service.slug}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`edit-description-${service.id}`}>Description</Label>
            <Textarea
              id={`edit-description-${service.id}`}
              name="description"
              defaultValue={service.description}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor={`edit-duration-${service.id}`}>Duree (min)</Label>
              <Input
                id={`edit-duration-${service.id}`}
                name="durationMin"
                type="number"
                min={5}
                defaultValue={service.durationMin}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor={`edit-price-${service.id}`}>Prix (centimes)</Label>
              <Input
                id={`edit-price-${service.id}`}
                name="priceCents"
                type="number"
                min={0}
                defaultValue={service.priceCents ?? ""}
              />
            </div>
          </div>
        </form>
      </EntityDrawer>

      {/* Deactivate confirm */}
      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Desactiver ce service ?"
        description={`"${service.name}" ne sera plus reservable par les clients.`}
        warning="Cette action peut etre annulee depuis la base de donnees, mais pas depuis ce dashboard."
        confirmLabel="Desactiver"
        action={deactivateAction}
        hiddenFields={{ serviceId: service.id }}
      />
    </>
  );
}
