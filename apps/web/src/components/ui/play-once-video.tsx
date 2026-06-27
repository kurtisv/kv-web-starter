"use client";
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface PlayOnceVideoProps {
  src: string;
  className?: string;
  // How much of the video must be visible before it plays (0–1)
  threshold?: number;
  // Poster image (first frame) to show before playback
  poster?: string;
}

// Plays the video once when scrolled into view, then freezes on the last frame.
// Never loops. Respects prefers-reduced-motion.
export function PlayOnceVideo({ src, className, threshold = 0.2, poster }: PlayOnceVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const playedRef = useRef(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Freeze on last frame when animation completes
    const handleEnded = () => {
      video.pause();
      // currentTime stays at end — browser shows the last rendered frame
    };
    video.addEventListener("ended", handleEnded);

    if (prefersReduced) {
      // Skip animation, jump to end when loaded
      const handleCanPlay = () => {
        video.currentTime = video.duration || 999;
        video.pause();
      };
      video.addEventListener("canplay", handleCanPlay);
      return () => {
        video.removeEventListener("ended", handleEnded);
        video.removeEventListener("canplay", handleCanPlay);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !playedRef.current) {
          playedRef.current = true;
          video.play().catch(() => {});
          observer.disconnect();
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
      preload="auto"
      className={cn("w-full", className)}
    />
  );
}
