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
  Disponible:       "success",
  "Sous compromis": "warning",
  Vendu:            "destructive",
};

export function PropertyCard({ property: p, onContact, className }: PropertyCardProps) {
  return (
    <Card className={cn("group overflow-hidden transition-shadow hover:shadow-md", className)}>
      {/* Image */}
      <div className="relative h-48 overflow-hidden border-b">
        {p.photo ? (
          <Image
            src={p.photo}
            alt={`${p.type} a ${p.location}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted text-xs text-muted-foreground">
            Aucune photo
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Location — bottom-left overlay */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs text-white">
          <MapPin className="h-3 w-3" aria-hidden="true" />
          <span>{p.location}</span>
        </div>

        {/* Optional badge — top-right */}
        {p.badge && (
          <div className="absolute right-2 top-2">
            <Badge variant="default" size="sm">{p.badge}</Badge>
          </div>
        )}
      </div>

      <CardContent className="p-5">
        {/* Type badge */}
        <Badge variant="soft" size="sm">{p.type}</Badge>

        {/* Price — dominant */}
        <p className="mt-2 text-xl font-semibold tracking-tight">{p.price}</p>

        {/* Specs */}
        <div className="mt-1.5 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Maximize2 className="h-3 w-3" aria-hidden="true" />
            {p.size}
          </span>
          <span className="flex items-center gap-1">
            <BedDouble className="h-3 w-3" aria-hidden="true" />
            {p.rooms}
          </span>
          {p.yieldPct && (
            <span className="flex items-center gap-1 text-success font-medium ml-auto">
              <TrendingUp className="h-3 w-3" aria-hidden="true" />
              {p.yieldPct}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between border-t pt-3">
          <div className="flex items-center gap-2">
            <Badge variant={STATUS_VARIANT[p.status]} size="sm">{p.status}</Badge>
            {p.score !== undefined && (
              <span className="text-xs text-muted-foreground">
                {p.score}/10
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
