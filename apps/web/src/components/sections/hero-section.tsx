import * as React from "react";
import { cn } from "@/lib/utils";

type HeroSize = "compact" | "default" | "large";

interface HeroSectionProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  media?: React.ReactNode;
  /** Slot for trust signals below actions: LogoCloud, StatsSection, avatar stack, etc. */
  trustBar?: React.ReactNode;
  variant?: "centered" | "split" | "dark" | "minimal";
  size?: HeroSize;
  // Optional: path to a text-free looping Remotion render used as a subtle backdrop.
  // Only used in the "dark" variant. Must be muted and loop-safe.
  videoSrc?: string;
  className?: string;
}

const paddingBySize: Record<HeroSize, { section: string; text?: string }> = {
  compact: { section: "py-12 sm:py-16" },
  default: { section: "py-20 sm:py-28" },
  large:   { section: "py-28 sm:py-36" },
};

export function HeroSection({
  eyebrow,
  title,
  description,
  actions,
  media,
  trustBar,
  variant = "centered",
  size = "default",
  videoSrc,
  className,
}: HeroSectionProps) {
  const pad = paddingBySize[size];

  if (variant === "dark") {
    return (
      <section className={cn("theme-hero", videoSrc ? "relative overflow-hidden" : "", className)}>
        {/* Text-free decorative background video — seamless loop, no audio, aria-hidden */}
        {videoSrc && (
          <video
            src={videoSrc}
            autoPlay muted loop playsInline preload="metadata" aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: 0.18, mixBlendMode: "soft-light" }}
          />
        )}
        <div className={cn("mx-auto max-w-6xl px-6", pad.section, videoSrc ? "relative z-10" : "")}>
          {eyebrow && (
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.18em] opacity-50">
              {eyebrow}
            </p>
          )}
          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-lg leading-8 opacity-70">{description}</p>
          )}
          {actions && <div className="mt-9 flex flex-wrap gap-3">{actions}</div>}
          {trustBar && <div className="mt-10 border-t border-white/10 pt-8">{trustBar}</div>}
          {media && <div className="mt-14">{media}</div>}
        </div>
      </section>
    );
  }

  if (variant === "split") {
    return (
      <section className={cn("border-b bg-background", className)}>
        <div className={cn("mx-auto grid max-w-6xl items-center gap-12 px-6", pad.section, "lg:grid-cols-2")}>
          <div>
            {eyebrow && (
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {eyebrow}
              </p>
            )}
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              {title}
            </h1>
            {description && (
              <p className="mt-5 text-lg leading-8 text-muted-foreground">{description}</p>
            )}
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
            {trustBar && <div className="mt-8 border-t pt-6">{trustBar}</div>}
          </div>
          {media && <div className="relative">{media}</div>}
        </div>
      </section>
    );
  }

  if (variant === "minimal") {
    return (
      <section className={cn("border-b bg-background", className)}>
        <div className={cn("mx-auto max-w-6xl px-6", pad.section)}>
          {eyebrow && (
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {eyebrow}
            </p>
          )}
          <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
          {description && (
            <p className="mt-4 max-w-2xl text-base text-muted-foreground">{description}</p>
          )}
          {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
          {trustBar && <div className="mt-6 border-t pt-5">{trustBar}</div>}
        </div>
      </section>
    );
  }

  // centered (default)
  return (
    <section className={cn("border-b bg-background text-center", className)}>
      <div className={cn("mx-auto max-w-4xl px-6", pad.section)}>
        {eyebrow && (
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {eyebrow}
          </p>
        )}
        <h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-7xl">{title}</h1>
        {description && (
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            {description}
          </p>
        )}
        {actions && <div className="mt-9 flex flex-wrap justify-center gap-3">{actions}</div>}
        {trustBar && <div className="mt-10 border-t pt-8">{trustBar}</div>}
        {media && <div className="mt-14">{media}</div>}
      </div>
    </section>
  );
}
