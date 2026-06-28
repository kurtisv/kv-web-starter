import * as React from "react";
import Image from "next/image";
import { ArrowRight, Clock, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface FeaturedArticleCardProps {
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readMinutes: number;
  score?: number;
  photo: string;
  photoAlt: string;
  onRead?: () => void;
}

export function FeaturedArticleCard({
  category,
  title,
  excerpt,
  author,
  date,
  readMinutes,
  score,
  photo,
  photoAlt,
  onRead,
}: FeaturedArticleCardProps) {
  return (
    <div className="group relative overflow-hidden border bg-card">
      <div className="relative aspect-[16/7] w-full overflow-hidden">
        <Image
          src={photo}
          alt={photoAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute top-4 left-4 flex items-center gap-2">
          <Badge className="bg-primary text-primary-foreground">{category}</Badge>
          <Badge variant="soft" size="sm" className="bg-black/40 text-white border-white/20">
            <Clock className="h-3 w-3" />
            {readMinutes} min
          </Badge>
        </div>

        {score !== undefined && (
          <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-sm font-semibold text-white backdrop-blur-sm">
            <Star className="h-3.5 w-3.5 fill-warning text-warning" />
            {score}/10
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-white/60">
            Essai de la semaine
          </p>
          <h3 className="text-2xl font-semibold leading-snug text-white sm:text-3xl">
            {title}
          </h3>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground line-clamp-2">{excerpt}</p>
          <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-semibold uppercase">
              {author.charAt(0)}
            </span>
            <span className="font-medium text-foreground">{author}</span>
            <span>&middot;</span>
            <span>{date}</span>
          </div>
        </div>
        <Button variant="outline" size="sm" className="shrink-0" onClick={onRead}>
          Lire l&apos;essai <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
