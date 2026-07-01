import * as React from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface PlanFeature {
  label: string;
  starter: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
}

interface PlanComparisonTableProps {
  features: PlanFeature[];
  onSelect?: (plan: "starter" | "pro" | "enterprise") => void;
  className?: string;
}

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="h-4 w-4 text-success mx-auto" />
    ) : (
      <Minus className="h-4 w-4 text-muted-foreground/40 mx-auto" />
    );
  }
  return <span className="text-sm">{value}</span>;
}

export function PlanComparisonTable({
  features,
  onSelect,
  className,
}: PlanComparisonTableProps) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b">
            <th className="sticky left-0 z-10 w-1/2 bg-card py-3 pr-6 text-left font-medium text-muted-foreground">
              Fonctionnalite
            </th>
            <th className="px-4 py-3 text-center font-semibold">Starter</th>
            <th className="px-4 py-3 text-center font-semibold">
              <span className="inline-flex items-center gap-1.5">
                Pro
                <Badge variant="default" size="sm">
                  Populaire
                </Badge>
              </span>
            </th>
            <th className="px-4 py-3 text-center font-semibold">Enterprise</th>
          </tr>
        </thead>
        <tbody>
          {features.map((f, i) => (
            <tr
              key={f.label}
              className={cn("border-b", i % 2 === 0 ? "bg-muted/20" : "")}
            >
              <td className="sticky left-0 z-10 bg-card py-2.5 pr-6 shadow-[1px_0_0_0_hsl(var(--border))]">
                {f.label}
              </td>
              <td className="px-4 py-2.5 text-center">
                <Cell value={f.starter} />
              </td>
              <td className="bg-primary/5 px-4 py-2.5 text-center">
                <Cell value={f.pro} />
              </td>
              <td className="px-4 py-2.5 text-center">
                <Cell value={f.enterprise} />
              </td>
            </tr>
          ))}
        </tbody>
        {onSelect && (
          <tfoot>
            <tr className="border-t">
              <td />
              <td className="px-4 pb-2 pt-4 text-center">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onSelect("starter")}
                >
                  Choisir
                </Button>
              </td>
              <td className="px-4 pb-2 pt-4 text-center">
                <Button size="sm" onClick={() => onSelect("pro")}>
                  Choisir
                </Button>
              </td>
              <td className="px-4 pb-2 pt-4 text-center">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onSelect("enterprise")}
                >
                  Contacter
                </Button>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
