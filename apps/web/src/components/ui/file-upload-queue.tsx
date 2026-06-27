"use client";

import * as React from "react";
import {
  CheckCircle2,
  FileText,
  ImageIcon,
  Loader2,
  Music,
  Video,
  X,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface UploadResult {
  url: string;
}

export type UploadStatus = "pending" | "uploading" | "done" | "error";

export interface QueueItem {
  file: File;
  status: UploadStatus;
  progress: number;
  url?: string;
  error?: string;
}

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`;
  return `${(bytes / 1024 / 1024).toFixed(1)} Mo`;
}

function FileTypeIcon({ type }: { type: string }) {
  if (type.startsWith("image/")) return <ImageIcon className="h-4 w-4" />;
  if (type.startsWith("video/")) return <Video className="h-4 w-4" />;
  if (type.startsWith("audio/")) return <Music className="h-4 w-4" />;
  return <FileText className="h-4 w-4" />;
}

// Hook — manages the upload queue state
export function useUploadQueue(onUpload?: (file: File) => Promise<UploadResult>) {
  const [items, setItems] = React.useState<QueueItem[]>([]);

  function addFiles(files: File[]) {
    setItems((prev) => {
      const existingNames = new Set(prev.map((i) => i.file.name));
      const next = files
        .filter((f) => !existingNames.has(f.name))
        .map((file): QueueItem => ({ file, status: "pending", progress: 0 }));
      return [...prev, ...next];
    });
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function clearDone() {
    setItems((prev) => prev.filter((i) => i.status !== "done"));
  }

  async function uploadItem(index: number) {
    if (!onUpload) return;
    setItems((prev) =>
      prev.map((it, i) => (i === index ? { ...it, status: "uploading", progress: 5 } : it))
    );

    const tick = setInterval(() => {
      setItems((prev) =>
        prev.map((it, i) =>
          i === index && it.status === "uploading" && it.progress < 80
            ? { ...it, progress: Math.min(it.progress + 10, 80) }
            : it
        )
      );
    }, 100);

    try {
      const result = await onUpload(items[index].file);
      clearInterval(tick);
      setItems((prev) =>
        prev.map((it, i) =>
          i === index ? { ...it, status: "done", progress: 100, url: result.url } : it
        )
      );
    } catch (err) {
      clearInterval(tick);
      setItems((prev) =>
        prev.map((it, i) =>
          i === index
            ? {
                ...it,
                status: "error",
                progress: 0,
                error: err instanceof Error ? err.message : "Erreur d'envoi",
              }
            : it
        )
      );
    }
  }

  async function uploadAll() {
    for (let i = 0; i < items.length; i++) {
      if (items[i].status === "pending") await uploadItem(i);
    }
  }

  const pendingCount = items.filter((i) => i.status === "pending").length;
  const doneCount = items.filter((i) => i.status === "done").length;
  const errorCount = items.filter((i) => i.status === "error").length;

  return { items, addFiles, removeItem, clearDone, uploadItem, uploadAll, pendingCount, doneCount, errorCount };
}

// Display component — pure rendering
export interface FileUploadQueueProps {
  items: QueueItem[];
  onRemove?: (index: number) => void;
  onUpload?: (index: number) => void;
  className?: string;
}

export function FileUploadQueue({ items, onRemove, onUpload, className }: FileUploadQueueProps) {
  if (items.length === 0) return null;

  return (
    <ul className={cn("grid gap-2", className)} role="list">
      {items.map((item, idx) => (
        <li
          key={`${item.file.name}-${idx}`}
          className="flex items-center gap-3 border bg-background px-3 py-2.5"
        >
          <span className="shrink-0 text-muted-foreground">
            <FileTypeIcon type={item.file.type} />
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-sm font-medium">{item.file.name}</p>
              <span className="shrink-0 text-xs text-muted-foreground">
                {formatSize(item.file.size)}
              </span>
            </div>
            {item.status === "uploading" && (
              <div className="mt-1.5 h-1 overflow-hidden bg-muted">
                <div
                  className="h-full bg-primary transition-all duration-100"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            )}
            {item.status === "error" && (
              <p className="mt-0.5 text-xs text-destructive">{item.error}</p>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            {item.status === "pending" && onUpload && (
              <button
                type="button"
                onClick={() => onUpload(idx)}
                className="text-xs text-primary hover:underline"
              >
                Envoyer
              </button>
            )}
            {item.status === "uploading" && (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            )}
            {item.status === "done" && <CheckCircle2 className="h-4 w-4 text-success" />}
            {item.status === "error" && <XCircle className="h-4 w-4 text-destructive" />}
            {(item.status === "pending" || item.status === "error") && onRemove && (
              <button
                type="button"
                aria-label="Retirer"
                onClick={() => onRemove(idx)}
                className="text-muted-foreground transition-colors hover:text-destructive"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
