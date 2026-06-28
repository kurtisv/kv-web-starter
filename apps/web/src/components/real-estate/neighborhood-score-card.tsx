import * as React from "react";
import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface NeighborhoodCriteria {
  label: string;
  score: number;
}

export interface NeighborhoodScoreCardProps {
  name: string;
  district: string;
  overallScore: number;
  avgPricePerSqm: string;
  criteria: NeighborhoodCriteria[];
}

function ScoreBar({ label, score }: { label: string; score: number }) {
  const pct = Math.round((score / 10) * 100);
  const color =
    score >= 8 ? "bg-success" : score >= 6 ? "bg-primary" : "bg-warning";

  return (
    <div className="grid gap-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold tabular-nums">{score}/10</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full transition-all", color)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function scoreLabel(s: number) {
  if (s >= 9) return "Excellent";
  if (s >= 7) return "Tres bien";
  if (s >= 5) return "Bien";
  return "Correct";
}

export function NeighborhoodScoreCard({
  name,
  district,
  overallScore,
  avgPricePerSqm,
  criteria,
}: NeighborhoodScoreCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-base">{name}</CardTitle>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {district}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-semibold tabular-nums">{overallScore}</div>
            <Badge variant="soft" size="sm" className="mt-0.5">
              {scoreLabel(overallScore)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-3">
        {criteria.map((c) => (
          <ScoreBar key={c.label} label={c.label} score={c.score} />
        ))}
        <div className="mt-1 flex items-center justify-between rounded-md bg-muted/50 px-3 py-2 text-xs">
          <span className="text-muted-foreground">Prix moyen/m²</span>
          <span className="font-semibold">{avgPricePerSqm}</span>
        </div>
      </CardContent>
    </Card>
  );
}
