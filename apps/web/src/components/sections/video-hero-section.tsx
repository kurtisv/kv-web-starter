"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { PlayOnceVideo } from "@/components/ui/play-once-video";

// --- background variant ---
// The video MUST be a text-free decorative composition (e.g. HeroBackground).
// Text, CTAs, and all readable content live in HTML on top of the overlay.
// The video loops silently as a living backdrop.

// --- split variant ---
// Video plays on the right as content (product demo, walkthrough).
// Triggered on scroll, plays once, freezes on last frame.

interface VideoHeroSectionProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  videoSrc: string;
  posterSrc?: string;
  variant?: "background" | "split";
  // Overlay opacity for background variant (0–1). Default 0.5.
  overlayOpacity?: number;
  className?: string;
}

export function VideoHeroSection({
  title,
  description,
  actions,
  children,
  videoSrc,
  posterSrc,
  variant = "background",
  overlayOpacity = 0.5,
  className,
}: VideoHeroSectionProps) {
  if (variant === "split") {
    return (
      <section className={cn("border-b bg-background overflow-hidden", className)}>
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 sm:py-24 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              {title}
            </h1>
            {description && (
              <p className="mt-5 text-lg leading-8 text-muted-foreground">{description}</p>
            )}
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
            {children}
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl shadow-2xl ring-1 ring-border">
            <PlayOnceVideo
              src={videoSrc}
              poster={posterSrc}
              className="h-full w-full object-cover"
              threshold={0.3}
            />
          </div>
        </div>
      </section>
    );
  }

  // background variant — video is purely decorative, must be text-free
  return (
    <section className={cn("relative overflow-hidden", className)}>
      <video
        src={videoSrc}
        poster={posterSrc}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: `rgba(0,0,0,${overlayOpacity})` }}
      />
      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28 text-white">
        <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-balance sm:text-7xl drop-shadow-md">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg leading-8 opacity-85 drop-shadow">
            {description}
          </p>
        )}
        {actions && <div className="mt-9 flex flex-wrap gap-3">{actions}</div>}
        {children}
      </div>
    </section>
  );
}
