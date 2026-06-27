"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Maximize2, Music, Plus, Trash2, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { FileDropzone } from "@/components/ui/file-dropzone";
import { Dialog } from "@/components/ui/dialog";

export interface MediaItem {
  id: string;
  src?: string;
  name: string;
  type: string;
  sizeMb?: number;
}

const COLS = {
  2: "grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
} as const;

function FileIcon({ type, className }: { type: string; className?: string }) {
  if (type.startsWith("video/")) return <Video className={className} />;
  if (type.startsWith("audio/")) return <Music className={className} />;
  return <FileText className={className} />;
}

export interface MediaGridProps {
  items: MediaItem[];
  onAdd?: (files: File[]) => void;
  onRemove?: (id: string) => void;
  columns?: 2 | 3 | 4;
  accept?: string;
  maxSizeMb?: number;
  className?: string;
}

export function MediaGrid({
  items,
  onAdd,
  onRemove,
  columns = 3,
  accept = "image/*",
  maxSizeMb = 10,
  className,
}: MediaGridProps) {
  const [dropzoneOpen, setDropzoneOpen] = React.useState(false);
  const [lightbox, setLightbox] = React.useState<MediaItem | null>(null);

  function handleFiles(files: File[]) {
    setDropzoneOpen(false);
    onAdd?.(files);
  }

  const isEmpty = items.length === 0;

  return (
    <div className={cn("grid gap-3", className)}>
      {dropzoneOpen && onAdd && (
        <FileDropzone
          accept={accept}
          maxSizeMb={maxSizeMb}
          multiple
          maxFiles={20}
          onFiles={handleFiles}
        />
      )}

      {isEmpty && !dropzoneOpen ? (
        <div className="flex flex-col items-center gap-3 border-2 border-dashed border-border py-14 text-center">
          <FileText className="h-8 w-8 text-muted-foreground opacity-30" aria-hidden />
          <div>
            <p className="text-sm text-muted-foreground">Aucun fichier</p>
            {onAdd && (
              <button
                type="button"
                onClick={() => setDropzoneOpen(true)}
                className="mt-1 text-xs text-primary hover:underline"
              >
                Ajouter des fichiers
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className={cn("grid gap-2", COLS[columns])}>
          <AnimatePresence>
            {items.map((item) => (
              <MediaCell
                key={item.id}
                item={item}
                onRemove={onRemove ? () => onRemove(item.id) : undefined}
                onPreview={
                  item.src && item.type.startsWith("image/")
                    ? () => setLightbox(item)
                    : undefined
                }
              />
            ))}
          </AnimatePresence>

          {onAdd && (
            <button
              type="button"
              aria-label="Ajouter des fichiers"
              onClick={() => setDropzoneOpen((v) => !v)}
              className="flex aspect-square items-center justify-center border-2 border-dashed border-border text-muted-foreground transition-colors hover:border-muted-foreground/50 hover:bg-muted/30 hover:text-foreground"
            >
              <Plus className="h-5 w-5" />
            </button>
          )}
        </div>
      )}

      {/* Lightbox */}
      {lightbox?.src && (
        <Dialog open={!!lightbox} onOpenChange={() => setLightbox(null)}>
          <div className="relative mx-auto max-h-[80vh] max-w-4xl">
            <Image
              src={lightbox.src}
              alt={lightbox.name}
              width={1200}
              height={800}
              className="h-auto max-h-[80vh] w-auto object-contain"
              unoptimized={lightbox.src.startsWith("blob:")}
            />
          </div>
        </Dialog>
      )}
    </div>
  );
}

function MediaCell({
  item,
  onRemove,
  onPreview,
}: {
  item: MediaItem;
  onRemove?: () => void;
  onPreview?: () => void;
}) {
  const isImage = item.type.startsWith("image/") && item.src;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.15 }}
      className="group relative aspect-square overflow-hidden border bg-muted"
    >
      {isImage ? (
        <Image
          src={item.src!}
          alt={item.name}
          fill
          className="object-cover"
          sizes="200px"
          unoptimized={item.src!.startsWith("blob:")}
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-1.5 p-2 text-muted-foreground">
          <FileIcon type={item.type} className="h-6 w-6" />
          <p className="line-clamp-2 text-center text-[10px] leading-tight">{item.name}</p>
          {item.sizeMb && (
            <p className="text-[9px] opacity-60">{item.sizeMb.toFixed(1)} Mo</p>
          )}
        </div>
      )}

      <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
        {onPreview && (
          <button
            type="button"
            aria-label="Voir en grand"
            onClick={onPreview}
            className="flex h-7 w-7 items-center justify-center bg-background/80 text-foreground hover:bg-background"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
        )}
        {onRemove && (
          <button
            type="button"
            aria-label="Supprimer"
            onClick={onRemove}
            className="flex h-7 w-7 items-center justify-center bg-background/80 text-foreground hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
