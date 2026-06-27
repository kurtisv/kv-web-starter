"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { DatePicker } from "@/components/ui/date-picker";

interface BookingDateSelectorProps {
  serviceId: string;
  staffId?: string;
  value: string;
}

export function BookingDateSelector({ serviceId, staffId, value }: BookingDateSelectorProps) {
  const router = useRouter();
  const initialDate = React.useMemo(() => {
    const d = new Date(`${value}T12:00:00`);
    return isNaN(d.getTime()) ? new Date() : d;
  }, [value]);

  const today = React.useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  function handleChange(date: Date) {
    const dateStr = format(date, "yyyy-MM-dd");
    const params = new URLSearchParams({ serviceId, date: dateStr });
    if (staffId) params.set("staffId", staffId);
    router.push(`/booking?${params.toString()}`);
  }

  return (
    <DatePicker
      value={initialDate}
      onChange={handleChange}
      minDate={today}
      placeholder="Choisir une date"
    />
  );
}
