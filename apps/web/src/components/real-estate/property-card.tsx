import * as React from "react";
import Image from "next/image";
import { MapPin, TrendingUp, BedDouble, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export type PropertyStatus = "Disponible" | "Sous compromis" | "Vendu";

export interface PropertyItem {
  id: string;
  type: string;
  location: string;
  price: string;
  size: string;
  rooms: string;
  score?: number;
  yieldPct?: string;
  status: PropertyStatus;
  photo?: string;
  badge?: string;
}

interface PropertyCardProps {
  property: PropertyItem;
  onContact?: () => void;
  className?: string;
}

const STATUS_VARIANT: Record<PropertyStatus, "success" | "warning" | "destructive"> = {
  Disponible:     "success",
  "Sous compromis": "warning",
  Vendu:          "destructive",
};

export function PropertyCard({ property: p, onContact, className }: PropertyCardProps) {
  return (
    <Card className={cn("group overflow-hidden", className)}>
      <div className="relative h-44 overflow-hidden border-b">
        {p.photo ? (
          <Image
            src={p.photo}
            alt={`${p.type} — ${p.location}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted text-xs text-muted-foreground">
            Aucune photo
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-2 left-3 flex items-center gap-1 rounded bg-black/40 px-2 py-0.5 text-xs text-white backdrop-blur-sm">
          <MapPin className="h-3 w-3" />
          {p.location}
        </div>
        {p.badge && (
          <div className="absolute right-2 top-2">
            <Badge variant="default" size="sm">
              {p.badge}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Badge variant="soft" size="sm">
              {p.type}
            </Badge>
            <p className="mt-2 font-semibold">{p.price}</p>
            <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Maximize2 className="h-3 w-3" />
                {p.size}
              </span>
              <span className="flex items-center gap-1">
                <BedDouble className="h-3 w-3" />
                {p.rooms}
              </span>
            </div>
          </div>
          {p.yieldPct && (
            <div className="shrink-0 text-right">
              <div className="flex items-center gap-1 text-sm font-medium text-success">
                <TrendingUp className="h-3.5 w-3.5" />
                {p.yieldPct}
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground">rendement brut</div>
            </div>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between border-t pt-3">
          <div className="flex items-center gap-2">
            <Badge variant={STATUS_VARIANT[p.status]} size="sm">
              {p.status}
            </Badge>
            {p.score !== undefined && (
              <span className="text-xs font-medium text-muted-foreground">
                Score {p.score}/10
              </span>
            )}
          </div>
          <Button size="sm" variant="outline" onClick={onContact}>
            Contacter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
