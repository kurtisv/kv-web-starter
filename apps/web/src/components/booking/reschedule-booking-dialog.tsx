"use client";

import * as React from "react";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { notify } from "@/components/ui/use-toast";

const DEMO_SLOTS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];

interface RescheduleBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceName?: string;
  onConfirm?: (date: string, time: string) => void;
}

export function RescheduleBookingDialog({
  open,
  onOpenChange,
  serviceName,
  onConfirm,
}: RescheduleBookingDialogProps) {
  const [selectedDate, setSelectedDate] = React.useState("");
  const [selectedTime, setSelectedTime] = React.useState("");

  const today = new Date().toISOString().split("T")[0]!;

  function handleConfirm() {
    if (!selectedDate || !selectedTime) return;
    onConfirm?.(selectedDate, selectedTime);
    notify.success(
      "Rendez-vous replanifie",
      `Nouveau creneau : ${selectedDate} a ${selectedTime}.`
    );
    onOpenChange(false);
    setSelectedDate("");
    setSelectedTime("");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="max-w-md">
      <DialogClose onClose={() => onOpenChange(false)} />
      <DialogHeader>
        <DialogTitle>Replanifier le rendez-vous</DialogTitle>
        {serviceName && <DialogDescription>{serviceName}</DialogDescription>}
      </DialogHeader>

      <div className="px-6 pb-2 grid gap-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Nouvelle date
          </label>
          <input
            type="date"
            min={today}
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setSelectedTime("");
            }}
            className="w-full border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>

        {selectedDate && (
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Creneaux disponibles
            </label>
            <div className="grid grid-cols-4 gap-2">
              {DEMO_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  className={`border px-2 py-1.5 text-sm transition-colors ${
                    selectedTime === slot
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground/40"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <DialogFooter>
        <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
          Annuler
        </Button>
        <Button
          type="button"
          onClick={handleConfirm}
          disabled={!selectedDate || !selectedTime}
        >
          <CalendarDays className="h-3.5 w-3.5" />
          Confirmer le nouveau creneau
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
