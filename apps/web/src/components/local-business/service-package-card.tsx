import * as React from "react";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ServicePackageCardProps {
  name: string;
  tagline: string;
  price: string;
  period: string;
  savings?: string;
  services: string[];
  featured?: boolean;
  badge?: string;
  onBook?: () => void;
}

export function ServicePackageCard({
  name,
  tagline,
  price,
  period,
  savings,
  services,
  featured = false,
  badge,
  onBook,
}: ServicePackageCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col",
        featured && "ring-2 ring-primary shadow-md"
      )}
    >
      <CardHeader className="pb-4">
        {badge && (
          <Badge className="mb-2 w-fit">{badge}</Badge>
        )}
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{tagline}</p>
        <div className="mt-2 flex items-end gap-1">
          <span className="text-3xl font-semibold">{price}</span>
          <span className="mb-1 text-sm text-muted-foreground">{period}</span>
        </div>
        {savings && (
          <p className="text-xs text-success font-medium">{savings}</p>
        )}
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between gap-5">
        <ul className="grid gap-2">
          {services.map((s) => (
            <li key={s} className="flex items-start gap-2 text-sm">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
        <Button
          variant={featured ? "default" : "outline"}
          className="w-full"
          onClick={onBook}
        >
          Reserver ce forfait
        </Button>
      </CardContent>
    </Card>
  );
}
