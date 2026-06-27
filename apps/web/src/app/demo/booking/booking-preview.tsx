"use client";

import * as React from "react";
import { TimeSlotGrid } from "@/components/booking/time-slot-grid";
import type { BookingSlot } from "@/modules/booking";

function makeSlot(date: string, hour: number, durationMin: number): BookingSlot {
  const startAt = new Date(`${date}T${String(hour).padStart(2, "0")}:00:00`);
  const endAt   = new Date(startAt.getTime() + durationMin * 60_000);
  return {
    date,
    startTime: startAt.toTimeString().slice(0, 5),
    endTime:   endAt.toTimeString().slice(0, 5),
    startAt,
    endAt,
  };
}

const DEMO_DATE = "2026-07-15";
const DEMO_SLOTS: BookingSlot[] = [9, 10, 11, 13, 14, 15, 16].map((h) => makeSlot(DEMO_DATE, h, 60));

export function TimeSlotGridPreview() {
  return (
    <TimeSlotGrid
      slots={DEMO_SLOTS}
      formId="booking-demo-form"
    />
  );
}
