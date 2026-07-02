"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

interface WizardStep {
  id: number;
  label: string;
}

const STEPS: WizardStep[] = [
  { id: 1, label: "Profil client" },
  { id: 2, label: "Identite visuelle" },
  { id: 3, label: "Fonctionnalites" },
  { id: 4, label: "Apercu & Export" },
];

interface WizardShellProps {
  step: number;
  onPrev: () => void;
  onNext: () => void;
  canNext: boolean;
  children: React.ReactNode;
}

export function WizardShell({ step, onPrev, onNext, canNext, children }: WizardShellProps) {
  const isFirst = step === 1;
  const isLast = step === STEPS.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Progress bar header */}
      <div className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-muted-foreground">
                Etape {step} sur {STEPS.length}
              </span>
              <div className="flex items-center gap-1" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={STEPS.length}>
                {STEPS.map((s) => (
                  <div
                    key={s.id}
                    className={cn(
                      "h-1.5 w-8 rounded-full transition-colors duration-300",
                      s.id < step
                        ? "bg-primary"
                        : s.id === step
                        ? "bg-primary/60"
                        : "bg-muted",
                    )}
                  />
                ))}
              </div>
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              {STEPS[step - 1]?.label}
            </span>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          {/* Side nav — desktop only */}
          <nav className="hidden lg:block" aria-label="Etapes du wizard">
            <ol className="space-y-1">
              {STEPS.map((s) => (
                <li key={s.id}>
                  <div
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm",
                      s.id === step
                        ? "bg-primary/10 font-medium text-primary"
                        : s.id < step
                        ? "text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                        s.id === step
                          ? "bg-primary text-primary-foreground"
                          : s.id < step
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground",
                      )}
                      aria-hidden="true"
                    >
                      {s.id < step ? <Check className="size-3" aria-hidden="true" /> : s.id}
                    </span>
                    {s.label}
                  </div>
                </li>
              ))}
            </ol>
          </nav>

          {/* Step content */}
          <div>
            <div className="min-h-[400px]">{children}</div>

            {/* Navigation buttons */}
            <div className="mt-8 flex items-center justify-between border-t pt-6">
              <Button
                variant="outline"
                onClick={onPrev}
                disabled={isFirst}
                leftIcon={<ChevronLeft className="size-4" />}
              >
                Precedent
              </Button>
              {!isLast && (
                <Button
                  onClick={onNext}
                  disabled={!canNext}
                  rightIcon={<ChevronRight className="size-4" />}
                >
                  Suivant
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
