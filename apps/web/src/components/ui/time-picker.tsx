import * as React from "react";
import { cn } from "@/lib/utils";

interface TimePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function TimePicker({ className, label, id, ...props }: TimePickerProps) {
  return (
    <input
      id={id}
      type="time"
      aria-label={label}
      className={cn(
        "flex h-10 w-full border border-border bg-background px-3 text-sm outline-none",
        "transition-colors focus:border-foreground",
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Remove the native time picker icon on WebKit
        "[&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:cursor-pointer",
        className
      )}
      {...props}
    />
  );
}
