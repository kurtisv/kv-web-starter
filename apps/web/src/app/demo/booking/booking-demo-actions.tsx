"use client";

import * as React from "react";
import { CalendarX2, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CancelBookingDialog } from "@/components/booking/cancel-booking-dialog";
import { RescheduleBookingDialog } from "@/components/booking/reschedule-booking-dialog";

export function BookingDemoActions({ serviceName }: { serviceName: string }) {
  const [cancelOpen, setCancelOpen] = React.useState(false);
  const [rescheduleOpen, setRescheduleOpen] = React.useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCancelOpen(true)}
            className="text-destructive hover:text-destructive"
          >
            <CalendarX2 className="h-3.5 w-3.5" />
            Annuler le RDV
          </Button>
          <Badge variant="outline" size="sm" className="font-mono text-[10px]">
            CancelBookingDialog
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setRescheduleOpen(true)}
          >
            <RefreshCcw className="h-3.5 w-3.5" />
            Replanifier
          </Button>
          <Badge variant="outline" size="sm" className="font-mono text-[10px]">
            RescheduleBookingDialog
          </Badge>
        </div>
      </div>

      <CancelBookingDialog
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        serviceName={serviceName}
        bookingRef="BK-2026-0042"
        onConfirm={() => {}}
      />

      <RescheduleBookingDialog
        open={rescheduleOpen}
        onOpenChange={setRescheduleOpen}
        serviceName={serviceName}
        onConfirm={() => {}}
      />
    </>
  );
}
