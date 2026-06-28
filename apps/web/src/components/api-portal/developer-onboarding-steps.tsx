"use client";

import * as React from "react";
import { CheckCircle2, Circle, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  cta?: { label: string; href?: string; onClick?: () => void };
}

interface DeveloperOnboardingStepsProps {
  steps: OnboardingStep[];
  completedIds?: string[];
  onComplete?: (id: string) => void;
  className?: string;
}

export function DeveloperOnboardingSteps({
  steps,
  completedIds = [],
  onComplete,
  className,
}: DeveloperOnboardingStepsProps) {
  const [localCompleted, setLocalCompleted] = React.useState<string[]>(completedIds);
  const allDone = localCompleted.length === steps.length;

  function markDone(id: string) {
    setLocalCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]));
    onComplete?.(id);
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Demarrage rapide
          </CardTitle>
          <span className="text-xs text-muted-foreground">
            {localCompleted.length}/{steps.length} etapes
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted mt-2">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${(localCompleted.length / steps.length) * 100}%` }}
          />
        </div>
      </CardHeader>
      <CardContent className="grid gap-3">
        {allDone && (
          <div className="flex items-center gap-2 rounded-md bg-green-50 px-3 py-2 text-sm font-medium text-green-700 dark:bg-green-950 dark:text-green-300">
            <CheckCircle2 className="h-4 w-4" /> Tout est configure. Vous etes pret !
          </div>
        )}
        {steps.map((step, i) => {
          const done = localCompleted.includes(step.id);
          const isNext = !done && localCompleted.length === i;
          return (
            <div
              key={step.id}
              className={cn(
                "flex items-start gap-3 rounded-lg border p-3 transition-colors",
                done    && "opacity-60",
                isNext  && "border-primary bg-primary/5",
              )}
            >
              <div className="mt-0.5 shrink-0 text-primary">
                {done
                  ? <CheckCircle2 className="h-5 w-5 text-green-500" />
                  : <Circle className="h-5 w-5 text-muted-foreground" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm font-medium", done && "line-through text-muted-foreground")}>
                  {step.title}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">{step.description}</p>
                {step.cta && !done && (
                  <Button
                    size="sm"
                    variant={isNext ? "default" : "outline"}
                    className="mt-2 h-7 text-xs gap-1"
                    onClick={() => { step.cta?.onClick?.(); markDone(step.id); }}
                  >
                    {step.cta.label} <ChevronRight className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
