"use client";
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface PlayOnceVideoProps {
  src: string;
  className?: string;
  /** How much of the video must be visible to play (0-1). Default 0.6. */
  threshold?: number;
  poster?: string;
}

/**
 * Plays the video while it is in the viewport (>= threshold visible).
 * Resets to the start each time it re-enters view so the user always
 * catches the beginning. Pauses immediately when scrolled away.
 * Respects prefers-reduced-motion: jumps to last frame instead.
 */
export function PlayOnceVideo({ src, className, threshold = 0.6, poster }: PlayOnceVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      const handleCanPlay = () => {
        video.currentTime = video.duration || 999;
        video.pause();
      };
      video.addEventListener("canplay", handleCanPlay);
      return () => video.removeEventListener("canplay", handleCanPlay);
    }

    // Reset to start after playing so next entry restarts cleanly
    const handleEnded = () => {
      video.currentTime = 0;
      video.pause();
    };
    video.addEventListener("ended", handleEnded);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // If ended (currentTime at end), reset before playing
          if (video.ended) video.currentTime = 0;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.removeEventListener("ended", handleEnded);
    };
  }, [threshold]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      playsInline
      preload="none"
      className={cn("w-full", className)}
    />
  );
}
