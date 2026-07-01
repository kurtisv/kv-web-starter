import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface OrderStatusStep {
  id: string;
  label: string;
  description?: string;
}

interface OrderStatusTimelineProps {
  steps: OrderStatusStep[];
  currentStep: string;
}

export function OrderStatusTimeline({ steps, currentStep }: OrderStatusTimelineProps) {
  const currentIndex = Math.max(steps.findIndex((step) => step.id === currentStep), 0);

  return (
    <ol className="grid gap-0">
      {steps.map((step, index) => {
        const done   = index < currentIndex;
        const active = index === currentIndex;
        const upcoming = index > currentIndex;
        const isLast = index === steps.length - 1;

        return (
          <li key={step.id} className="flex gap-3">
            {/* Icon + connector column */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  done   && "border-primary bg-primary text-primary-foreground",
                  active && "border-primary bg-background text-primary",
                  upcoming && "border-border bg-background text-muted-foreground",
                )}
              >
                {done   ? <CheckCircle2 className="h-4 w-4" /> : null}
                {active ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {upcoming ? <Circle className="h-4 w-4" /> : null}
              </div>
              {!isLast && (
                <div className="mt-1 w-0.5 flex-1 min-h-[20px]">
                  <div
                    className={cn(
                      "h-full w-full transition-colors",
                      done ? "bg-primary" : "bg-border",
                    )}
                  />
                </div>
              )}
            </div>

            {/* Content */}
            <div className={cn("pb-5", isLast && "pb-0")}>
              <p
                className={cn(
                  "mt-1 text-sm font-medium",
                  active && "text-primary",
                  upcoming && "text-muted-foreground",
                )}
              >
                {step.label}
              </p>
              {step.description && (
                <p className="mt-0.5 text-xs text-muted-foreground">{step.description}</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
