import { cn } from "@/lib/utils";

export function Marquee({ items, className }: { items: readonly string[]; className?: string }) {
  const doubled = [...items, ...items];
  return (
    <div className={cn("flex overflow-hidden select-none", className)}>
      <div className="flex animate-marquee gap-10 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="size-1 rounded-full bg-muted-foreground/40" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
