"use client";
import { useRef, useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PlayOnceVideoProps {
  src: string;
  className?: string;
  /** How much of the video must be visible to play (0-1). Default 0.6. */
  threshold?: number;
  poster?: string;
  fallback?: ReactNode;
  checkAvailability?: boolean;
}

/**
 * Plays the video while it is in the viewport (>= threshold visible).
 * Resets to the start each time it re-enters view so the user always
 * catches the beginning. Pauses immediately when scrolled away.
 * Respects prefers-reduced-motion: jumps to last frame instead.
 */
export function PlayOnceVideo({
  src,
  className,
  threshold = 0.6,
  poster,
  fallback,
  checkAvailability = true,
}: PlayOnceVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [checkedSrc, setCheckedSrc] = useState<string | null>(null);
  const [checkedAvailable, setCheckedAvailable] = useState(false);
  const isAvailable = !checkAvailability || (checkedSrc === src && checkedAvailable);

  useEffect(() => {
    if (!checkAvailability) return;

    const controller = new AbortController();

    async function checkVideo() {
      try {
        const url = new URL(src, window.location.href);
        const response = await fetch(url, {
          method: "HEAD",
          cache: "no-store",
          signal: controller.signal,
        });
        setCheckedSrc(src);
        setCheckedAvailable(response.ok);
      } catch {
        if (!controller.signal.aborted) {
          setCheckedSrc(src);
          setCheckedAvailable(false);
        }
      }
    }

    void checkVideo();

    return () => controller.abort();
  }, [checkAvailability, src]);

  useEffect(() => {
    const video = ref.current;
    if (!video || !isAvailable) return;

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
          const playResult = video.play();
          if (playResult) playResult.catch(() => {});
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
  }, [isAvailable, threshold]);

  if (!isAvailable) {
    return (
      <div
        className={cn(
          "flex aspect-video w-full items-center justify-center border border-white/10 bg-[radial-gradient(circle_at_50%_20%,rgba(20,184,166,0.22),transparent_34%),linear-gradient(135deg,#07051a,#111827_55%,#2f2417)] text-center text-sm text-white/60",
          className
        )}
        data-video-fallback={src}
      >
        {fallback ?? "Video preview unavailable. Run pnpm video:render to generate this asset."}
      </div>
    );
  }

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      playsInline
      preload="none"
      className={cn("w-full", className)}
      onError={() => {
        setCheckedSrc(src);
        setCheckedAvailable(false);
      }}
    />
  );
}
