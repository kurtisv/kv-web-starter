import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: ProcessStep[];
  className?: string;
}

export function ProcessSteps({ steps, className }: ProcessStepsProps) {
  return (
    <div className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {steps.map((step, i) => (
        <div key={step.number} className="relative flex flex-col gap-3">
          {i < steps.length - 1 && (
            <div className="absolute top-4 left-10 right-0 hidden h-px bg-border lg:block" />
          )}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-sm font-semibold text-primary">
            {step.number}
          </div>
          <div>
            <p className="font-semibold">{step.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
