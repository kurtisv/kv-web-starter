import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// Token-aware palette — works in light and dark modes without hardcoded color values.
const palette = [
  "bg-primary/15 text-primary",
  "bg-sky-500/15 text-sky-700 dark:text-sky-400",
  "bg-violet-500/15 text-violet-700 dark:text-violet-400",
  "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  "bg-orange-500/15 text-orange-700 dark:text-orange-400",
  "bg-rose-500/15 text-rose-700 dark:text-rose-400",
  "bg-cyan-500/15 text-cyan-700 dark:text-cyan-400",
  "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  "bg-pink-500/15 text-pink-700 dark:text-pink-400",
  "bg-indigo-500/15 text-indigo-700 dark:text-indigo-400",
];

function colorFromName(name: string): string {
  const idx =
    name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % palette.length;
  return palette[idx] ?? palette[0]!;
}

const sizeClasses = {
  xs: "h-6 w-6 text-[9px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

export interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: keyof typeof sizeClasses;
  className?: string;
}

export function Avatar({ src, name = "", size = "md", className }: AvatarProps) {
  const initials = getInitials(name);
  const colorClass = colorFromName(name || "?");

  return (
    <div
      role="img"
      aria-label={name || "Avatar"}
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full",
        sizeClasses[size],
        className,
      )}
    >
      {src ? (
        <Image src={src} alt={name} fill className="object-cover" sizes="64px" />
      ) : (
        <div
          className={cn(
            "flex h-full w-full items-center justify-center font-semibold",
            colorClass,
          )}
          aria-hidden="true"
        >
          {initials || "?"}
        </div>
      )}
    </div>
  );
}

export function AvatarGroup({
  avatars,
  max = 4,
  size = "sm",
  className,
}: {
  avatars: AvatarProps[];
  max?: number;
  size?: keyof typeof sizeClasses;
  className?: string;
}) {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;

  return (
    <div className={cn("flex items-center", className)}>
      {visible.map((a, i) => (
        <div key={i} className="-ml-2 rounded-full ring-2 ring-background first:ml-0">
          <Avatar {...a} size={size} />
        </div>
      ))}
      {overflow > 0 && (
        <div
          aria-label={`${overflow} autres`}
          className={cn(
            "-ml-2 flex items-center justify-center rounded-full bg-muted font-medium text-muted-foreground ring-2 ring-background",
            sizeClasses[size],
          )}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}
