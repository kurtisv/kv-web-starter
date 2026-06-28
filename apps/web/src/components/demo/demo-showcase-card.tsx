import Link from "next/link";
import { ArrowRight, CheckCircle, Puzzle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { DemoPreviewFrame } from "./demo-preview-frame";
import { DemoStackBadges } from "./demo-stack-badges";
import { cn } from "@/lib/utils";

export type DemoComplexity = "Starter" | "Intermediate" | "Advanced";
export type DemoLayout = "standard" | "dashboard" | "portal" | "store";

export interface DemoCardData {
  slug: string;
  label: string;
  type: string;
  tagline: string;
  result: string;
  accent: string;
  bg: string;
  fg: string;
  heroFrom: string;
  dark?: boolean;
  layout?: DemoLayout;
  complexity: DemoComplexity;
  keyComponents: string[];
  integrations: string[];
}

const COMPLEXITY_COLORS: Record<DemoComplexity, string> = {
  Starter:      "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
  Intermediate: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300",
  Advanced:     "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300",
};

interface DemoShowcaseCardProps {
  demo: DemoCardData;
  className?: string;
}

export function DemoShowcaseCard({ demo, className }: DemoShowcaseCardProps) {
  return (
    <div
      className={cn(
        "group flex flex-col rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md overflow-hidden",
        className,
      )}
    >
      {/* Accent bar */}
      <div className="h-1 w-full shrink-0" style={{ background: demo.accent }} />

      {/* Preview frame */}
      <div className="px-4 pt-4">
        <DemoPreviewFrame
          accent={demo.accent}
          bg={demo.bg}
          fg={demo.fg}
          heroFrom={demo.heroFrom}
          dark={demo.dark}
          layout={demo.layout}
        />
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-4 p-4 pt-3">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-base font-semibold leading-tight">{demo.label}</h3>
            <Badge variant="outline" size="sm" className="shrink-0 font-normal text-xs">
              {demo.type}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{demo.tagline}</p>
        </div>

        {/* Result */}
        <div className="rounded-md bg-muted/50 px-3 py-2">
          <p className="text-xs font-medium text-foreground">{demo.result}</p>
        </div>

        {/* Key components */}
        <div>
          <p className="mb-1.5 flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <Puzzle className="h-3 w-3" /> Composants inclus
          </p>
          <div className="space-y-0.5">
            {demo.keyComponents.slice(0, 4).map((c) => (
              <div key={c} className="flex items-center gap-1.5">
                <CheckCircle className="h-3 w-3 shrink-0 text-green-500" />
                <span className="text-xs text-muted-foreground font-mono">{c}</span>
              </div>
            ))}
            {demo.keyComponents.length > 4 && (
              <p className="text-xs text-muted-foreground pl-4.5">
                +{demo.keyComponents.length - 4} autres
              </p>
            )}
          </div>
        </div>

        {/* Integrations */}
        {demo.integrations.length > 0 && (
          <div>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">Integrations optionnelles</p>
            <DemoStackBadges items={demo.integrations} size="sm" />
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-2">
            <Badge variant="outline" size="sm" className={cn("text-xs font-normal", COMPLEXITY_COLORS[demo.complexity])}>
              {demo.complexity}
            </Badge>
            <Badge variant="outline" size="sm" className="text-xs font-normal text-muted-foreground">
              Demo mode
            </Badge>
          </div>
          <Link
            href={`/demo/${demo.slug}`}
            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            Voir la demo
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
