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

const palette = [
  "bg-blue-500",
  "bg-violet-500",
  "bg-emerald-500",
  "bg-orange-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-amber-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
];

function colorFromName(name: string): string {
  const idx =
    name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % palette.length;
  return palette[idx];
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
  const bg = colorFromName(name || "?");

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full",
        sizeClasses[size],
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          fill
          className="object-cover"
          sizes="64px"
        />
      ) : (
        <div
          className={cn(
            "flex h-full w-full items-center justify-center font-semibold text-white",
            bg
          )}
          aria-label={name}
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
        <div key={i} className="-ml-2 first:ml-0 ring-2 ring-background rounded-full">
          <Avatar {...a} size={size} />
        </div>
      ))}
      {overflow > 0 && (
        <div
          className={cn(
            "-ml-2 ring-2 ring-background rounded-full flex items-center justify-center bg-muted font-medium text-muted-foreground",
            sizeClasses[size]
          )}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}
