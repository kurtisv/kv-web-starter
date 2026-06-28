import { CheckCircle2, Clock, CalendarCheck, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export type BookingStatus = "confirmed" | "reminded" | "in_progress" | "completed" | "cancelled";

interface TimelineStep {
  key: BookingStatus;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const STEPS: TimelineStep[] = [
  { key: "confirmed",   label: "Confirme",    description: "Email de confirmation envoye", icon: <CheckCircle2 className="h-4 w-4" /> },
  { key: "reminded",    label: "Rappele",     description: "Rappel 24h avant envoye",      icon: <Clock className="h-4 w-4" /> },
  { key: "in_progress", label: "En cours",    description: "Rendez-vous en cours",          icon: <CalendarCheck className="h-4 w-4" /> },
  { key: "completed",   label: "Termine",     description: "Merci pour votre visite !",     icon: <Star className="h-4 w-4" /> },
];

const ORDER: BookingStatus[] = ["confirmed", "reminded", "in_progress", "completed"];

function stepIndex(status: BookingStatus) {
  return ORDER.indexOf(status);
}

interface BookingStatusTimelineProps {
  status: BookingStatus;
  className?: string;
}

export function BookingStatusTimeline({ status, className }: BookingStatusTimelineProps) {
  const currentIndex = stepIndex(status === "cancelled" ? "confirmed" : status);

  return (
    <div className={cn("flex flex-col gap-0", className)}>
      {STEPS.map((step, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex && status !== "cancelled";
        const upcoming = i > currentIndex;

        return (
          <div key={step.key} className="flex gap-3">
            {/* Connector + dot */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  done    && "border-primary bg-primary text-primary-foreground",
                  active  && "border-primary bg-primary/10 text-primary",
                  upcoming && "border-border bg-background text-muted-foreground",
                )}
              >
                {step.icon}
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn("w-0.5 flex-1 my-1", done ? "bg-primary" : "bg-border")} style={{ minHeight: 16 }} />
              )}
            </div>

            {/* Content */}
            <div className="pb-4 pt-1 min-w-0">
              <p className={cn("text-sm font-medium leading-none", upcoming && "text-muted-foreground")}>
                {step.label}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
