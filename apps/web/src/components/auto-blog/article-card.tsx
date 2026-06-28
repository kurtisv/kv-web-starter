import * as React from "react";
import Image from "next/image";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export interface ArticleCardProps {
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readMinutes: number;
  photo: string;
  photoAlt: string;
}

export function ArticleCard({
  category,
  title,
  excerpt,
  author,
  date,
  readMinutes,
  photo,
  photoAlt,
}: ArticleCardProps) {
  return (
    <Card className="group flex flex-col overflow-hidden">
      <div className="relative aspect-[16/9] overflow-hidden border-b">
        <Image
          src={photo}
          alt={photoAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <Badge size="sm" className="bg-black/60 text-white border-white/20 backdrop-blur-sm">
            {category}
          </Badge>
        </div>
      </div>
      <CardContent className="flex flex-1 flex-col gap-2 p-4">
        <h4 className="font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h4>
        <p className="text-xs text-muted-foreground line-clamp-2 flex-1">{excerpt}</p>
        <div className="flex items-center justify-between pt-1 text-xs text-muted-foreground">
          <span>{author} &middot; {date}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {readMinutes} min
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
