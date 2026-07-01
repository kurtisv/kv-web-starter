import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: readonly string[];
  className?: string;
  /** Mark as true when the content is purely decorative (hides from screen readers). */
  decorative?: boolean;
}

export function Marquee({ items, className, decorative = true }: MarqueeProps) {
  const doubled = [...items, ...items];
  return (
    <div
      className={cn("flex overflow-hidden select-none", className)}
      aria-hidden={decorative || undefined}
    >
      <div className="flex animate-marquee gap-10 whitespace-nowrap hover:[animation-play-state:paused]">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="size-1 rounded-full bg-muted-foreground/40" aria-hidden="true" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
