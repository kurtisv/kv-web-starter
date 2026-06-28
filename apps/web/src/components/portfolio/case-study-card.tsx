import * as React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface CaseStudyMetric {
  label: string;
  value: string;
  delta?: string;
}

export interface CaseStudyCardProps {
  client: string;
  title: string;
  description: string;
  outcome: string;
  metrics: CaseStudyMetric[];
  tags: string[];
  photo: string;
  photoAlt: string;
  featured?: boolean;
  link?: string;
}

export function CaseStudyCard({
  client,
  title,
  description,
  outcome,
  metrics,
  tags,
  photo,
  photoAlt,
  featured = false,
  link,
}: CaseStudyCardProps) {
  return (
    <div className={`group grid gap-0 overflow-hidden border bg-card ${featured ? "lg:grid-cols-2" : ""}`}>
      <div className={`relative overflow-hidden ${featured ? "aspect-auto min-h-64" : "aspect-video"}`}>
        <Image
          src={photo}
          alt={photoAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes={featured ? "(max-width: 640px) 100vw, 50vw" : "(max-width: 640px) 100vw, 33vw"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <Badge className="bg-black/60 text-white border-white/20 backdrop-blur-sm text-xs">
            {client}
          </Badge>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4 p-6">
        <div>
          <h3 className="text-lg font-semibold leading-snug">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>

          <div className="mt-4 grid grid-cols-3 gap-3 border-y py-4">
            {metrics.map((m) => (
              <div key={m.label}>
                <p className="text-xl font-semibold tabular-nums">{m.value}</p>
                {m.delta && (
                  <p className="text-xs font-medium text-success">{m.delta}</p>
                )}
                <p className="mt-0.5 text-[11px] text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-sm text-muted-foreground italic">&ldquo;{outcome}&rdquo;</p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <Badge key={t} variant="soft" size="sm">{t}</Badge>
            ))}
          </div>
          {link && (
            <Button variant="ghost" size="sm" asChild>
              <a href={link}>Voir <ArrowRight className="h-3.5 w-3.5" /></a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
