"use client";

import * as React from "react";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";

const OVERLAY_SIZE: Record<string, string> = {
  xs: "h-6 w-6",
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
};

export interface AvatarUploadProps {
  src?: string | null;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  maxSizeMb?: number;
  disabled?: boolean;
  onChange?: (file: File) => void;
  className?: string;
}

export function AvatarUpload({
  src,
  name = "",
  size = "lg",
  maxSizeMb = 5,
  disabled = false,
  onChange,
  className,
}: AvatarUploadProps) {
  const [preview, setPreview] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    return () => { if (preview) URL.revokeObjectURL(preview); };
  }, [preview]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (maxSizeMb && file.size > maxSizeMb * 1024 * 1024) {
      alert(`Taille max : ${maxSizeMb} Mo`);
      return;
    }
    if (preview) URL.revokeObjectURL(preview);
    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange?.(file);
    e.target.value = "";
  }

  return (
    <div className={cn("relative inline-block", className)}>
      <Avatar src={preview ?? src} name={name} size={size} />

      {!disabled && (
        <button
          type="button"
          aria-label="Changer la photo de profil"
          onClick={() => inputRef.current?.click()}
          className={cn(
            "absolute inset-0 flex items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none",
            OVERLAY_SIZE[size]
          )}
        >
          <Camera className="h-4 w-4" />
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        aria-hidden
        tabIndex={-1}
        onChange={handleChange}
      />
    </div>
  );
}
