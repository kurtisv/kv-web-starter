import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepperStep {
  label: string;
  description?: string;
}

interface StepperProps {
  steps: StepperStep[];
  currentStep: number;
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export function Stepper({
  steps,
  currentStep,
  className,
  orientation = "horizontal",
}: StepperProps) {
  if (orientation === "vertical") {
    return (
      <nav aria-label="Étapes" className={cn("flex flex-col gap-0", className)}>
        {steps.map((step, i) => {
          const completed = i < currentStep;
          const current = i === currentStep;

          return (
            <div key={step.label} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors",
                    completed && "border-primary bg-primary text-primary-foreground",
                    current && "border-primary text-primary bg-background",
                    !completed && !current && "border-border text-muted-foreground"
                  )}
                  aria-current={current ? "step" : undefined}
                >
                  {completed ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={cn(
                      "mt-1 w-0.5 flex-1 min-h-[24px] transition-colors",
                      completed ? "bg-primary" : "bg-border"
                    )}
                  />
                )}
              </div>
              <div className="pb-6 min-w-0">
                <p
                  className={cn(
                    "text-sm font-medium leading-none pt-1.5",
                    current ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p className="mt-1 text-xs text-muted-foreground">{step.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </nav>
    );
  }

  return (
    <nav aria-label="Étapes" className={cn("flex items-start", className)}>
      {steps.map((step, i) => {
        const completed = i < currentStep;
        const current = i === currentStep;
        const isLast = i === steps.length - 1;

        return (
          <div key={step.label} className={cn("flex items-center", !isLast && "flex-1")}>
            <div className="flex flex-col items-center gap-1.5 min-w-0">
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors",
                  completed && "border-primary bg-primary text-primary-foreground",
                  current && "border-primary text-primary bg-background",
                  !completed && !current && "border-border text-muted-foreground"
                )}
                aria-current={current ? "step" : undefined}
              >
                {completed ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <p
                className={cn(
                  "text-xs text-center max-w-[80px] leading-tight",
                  current ? "font-medium text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </p>
            </div>
            {!isLast && (
              <div
                className={cn(
                  "mb-5 h-0.5 flex-1 mx-2 transition-colors",
                  completed ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
