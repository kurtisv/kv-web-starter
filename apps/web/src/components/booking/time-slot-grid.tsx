"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { CalendarX2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import { DURATION, EASE } from "@/components/animations/motion";
import type { BookingSlot } from "@/modules/booking";

interface TimeSlotGridProps {
  slots: BookingSlot[];
  formId: string;
  className?: string;
}

export function TimeSlotGrid({ slots, formId, className }: TimeSlotGridProps) {
  const reduced = useReducedMotion();

  if (slots.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 border bg-muted/30 px-4 py-10 text-center">
        <CalendarX2 className="h-8 w-8 text-muted-foreground/40" />
        <p className="text-sm font-medium">Aucun creneau disponible</p>
        <p className="text-xs text-muted-foreground">
          Essayez une autre date ou un autre service.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn("grid grid-cols-3 gap-2 sm:grid-cols-4", className)}
      role="radiogroup"
      aria-label="Creneaux disponibles"
    >
      {slots.map((slot, i) => (
        <motion.label
          key={slot.startAt.toISOString()}
          initial={reduced ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: DURATION.base * 0.7, delay: i * 0.035, ease: EASE.smooth }
          }
          className="flex h-11 cursor-pointer items-center justify-center border text-sm font-medium transition-colors has-[:checked]:border-foreground has-[:checked]:bg-foreground has-[:checked]:text-background hover:border-foreground/50"
        >
          <input
            className="sr-only"
            type="radio"
            name="startAt"
            form={formId}
            value={slot.startAt.toISOString()}
            defaultChecked={i === 0}
            required
          />
          {slot.startTime}
        </motion.label>
      ))}
    </div>
  );
}
