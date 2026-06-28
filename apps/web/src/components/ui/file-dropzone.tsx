"use client";

import * as React from "react";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

function validate(
  raw: File[],
  accept?: string,
  maxSizeMb?: number,
  maxFiles?: number
): { valid: File[]; errors: string[] } {
  const valid: File[] = [];
  const errors: string[] = [];
  const types = accept?.split(",").map((s) => s.trim()) ?? [];

  for (const file of raw.slice(0, maxFiles ?? raw.length)) {
    if (types.length > 0) {
      const ok = types.some((t) => {
        if (t.endsWith("/*")) return file.type.startsWith(t.slice(0, -1));
        if (t.startsWith(".")) return file.name.toLowerCase().endsWith(t.toLowerCase());
        return file.type === t;
      });
      if (!ok) { errors.push(`${file.name} : type non accepte`); continue; }
    }
    if (maxSizeMb && file.size > maxSizeMb * 1024 * 1024) {
      errors.push(`${file.name} : max ${maxSizeMb} Mo`);
      continue;
    }
    valid.push(file);
  }
  return { valid, errors };
}

export interface FileDropzoneProps {
  accept?: string;
  maxSizeMb?: number;
  maxFiles?: number;
  multiple?: boolean;
  disabled?: boolean;
  onFiles: (files: File[]) => void;
  label?: string;
  hint?: string;
  className?: string;
}

export function FileDropzone({
  accept,
  maxSizeMb,
  maxFiles,
  multiple = false,
  disabled = false,
  onFiles,
  label,
  hint,
  className,
}: FileDropzoneProps) {
  const [dragOver, setDragOver] = React.useState(false);
  const [errors, setErrors] = React.useState<string[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const counter = React.useRef(0);

  function process(fileList: FileList | null) {
    if (!fileList || disabled) return;
    const { valid, errors: errs } = validate(Array.from(fileList), accept, maxSizeMb, maxFiles);
    setErrors(errs);
    if (valid.length) onFiles(valid);
  }

  const hint_ =
    hint ??
    [
      accept ? `Types : ${accept}` : null,
      maxSizeMb ? `Max ${maxSizeMb} Mo` : null,
      maxFiles ? `Max ${maxFiles} fichier${maxFiles > 1 ? "s" : ""}` : null,
    ]
      .filter(Boolean)
      .join(" — ");

  return (
    <div className={cn("grid gap-2", className)}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={label ?? "Zone de depot de fichiers"}
        aria-disabled={disabled}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => {
          if (!disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          counter.current++;
          setDragOver(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          counter.current--;
          if (counter.current === 0) setDragOver(false);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          counter.current = 0;
          setDragOver(false);
          process(e.dataTransfer.files);
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-3 border-2 border-dashed px-6 py-10 text-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          dragOver && !disabled
            ? "border-primary bg-primary/5"
            : "border-border hover:border-muted-foreground/50 hover:bg-muted/30",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <Upload className={cn("h-6 w-6", dragOver ? "text-primary" : "text-muted-foreground")} aria-hidden />
        <div>
          <p className="text-sm font-medium">
            {dragOver ? "Deposer ici" : (label ?? "Glisser-deposer ou cliquer pour parcourir")}
          </p>
          {hint_ && <p className="mt-1 text-xs text-muted-foreground">{hint_}</p>}
        </div>
      </div>

      {errors.length > 0 && (
        <ul className="grid gap-1">
          {errors.map((err) => (
            <li key={err} className="flex items-start gap-1.5 text-xs text-destructive">
              <X className="mt-0.5 h-3 w-3 shrink-0" aria-hidden />
              {err}
            </li>
          ))}
        </ul>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple || (maxFiles !== undefined && maxFiles > 1)}
        className="sr-only"
        aria-hidden
        tabIndex={-1}
        disabled={disabled}
        onChange={(e) => { process(e.target.files); e.target.value = ""; }}
      />
    </div>
  );
}
