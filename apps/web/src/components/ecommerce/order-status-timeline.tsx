import { CheckCircle2, Circle, PackageCheck } from "lucide-react";

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
    <ol className="grid gap-3">
      {steps.map((step, index) => {
        const done = index < currentIndex;
        const active = index === currentIndex;
        const Icon = done ? CheckCircle2 : active ? PackageCheck : Circle;
        return (
          <li key={step.id} className="flex gap-3">
            <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", done || active ? "text-primary" : "text-muted-foreground")} />
            <div>
              <p className={cn("text-sm font-medium", !done && !active && "text-muted-foreground")}>{step.label}</p>
              {step.description && <p className="text-xs text-muted-foreground">{step.description}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
