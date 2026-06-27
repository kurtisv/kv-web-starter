import * as React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const ASPECT_CLASSES = {
  square: "aspect-square",
  video:  "aspect-video",
  photo:  "aspect-[4/3]",
  wide:   "aspect-[16/9]",
  tall:   "aspect-[3/4]",
} as const;

export interface ImagePreviewProps {
  src: string;
  alt?: string;
  aspectRatio?: keyof typeof ASPECT_CLASSES;
  onRemove?: () => void;
  label?: string;
  className?: string;
}

export function ImagePreview({
  src,
  alt = "Apercu",
  aspectRatio = "photo",
  onRemove,
  label,
  className,
}: ImagePreviewProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden border bg-muted",
        ASPECT_CLASSES[aspectRatio],
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        unoptimized={src.startsWith("blob:")}
      />

      {onRemove && (
        <button
          type="button"
          aria-label="Supprimer l'image"
          onClick={onRemove}
          className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center bg-background/80 text-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}

      {label && (
        <div className="absolute inset-x-0 bottom-0 bg-background/70 px-2 py-1 text-xs font-medium backdrop-blur-sm">
          {label}
        </div>
      )}
    </div>
  );
}
