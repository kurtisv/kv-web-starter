"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function computeTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  };
}

interface CountdownProps {
  targetDate: Date | string;
  expiredText?: string;
  className?: string;
  onExpired?: () => void;
  showDays?: boolean;
}

export function Countdown({
  targetDate,
  expiredText = "Offre expirée",
  className,
  onExpired,
  showDays = true,
}: CountdownProps) {
  const target = React.useMemo(
    () => (typeof targetDate === "string" ? new Date(targetDate) : targetDate),
    [targetDate]
  );

  const [time, setTime] = React.useState<TimeLeft>(() => computeTimeLeft(target));
  const [expired, setExpired] = React.useState(false);

  React.useEffect(() => {
    const tick = () => {
      const t = computeTimeLeft(target);
      setTime(t);
      if (t.days === 0 && t.hours === 0 && t.minutes === 0 && t.seconds === 0) {
        setExpired(true);
        onExpired?.();
      }
    };

    const id = setInterval(tick, 1_000);
    return () => clearInterval(id);
  }, [target, onExpired]);

  if (expired) {
    return <p className={cn("text-sm font-medium text-muted-foreground", className)}>{expiredText}</p>;
  }

  const units = [
    { value: time.days, label: "j", show: showDays },
    { value: time.hours, label: "h", show: true },
    { value: time.minutes, label: "min", show: true },
    { value: time.seconds, label: "s", show: true },
  ].filter((u) => u.show);

  return (
    <div className={cn("flex items-end gap-3", className)} aria-live="polite" aria-label="Compte a rebours">
      {units.map((u, i) => (
        <React.Fragment key={u.label}>
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-2xl font-semibold tabular-nums leading-none">
              {String(u.value).padStart(2, "0")}
            </span>
            <span className="text-[10px] font-medium uppercase text-muted-foreground tracking-wide">
              {u.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="mb-3 text-muted-foreground font-medium">:</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
