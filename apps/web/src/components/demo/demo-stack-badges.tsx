import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DemoStackBadgesProps {
  items: string[];
  className?: string;
  size?: "sm" | "default";
}

export function DemoStackBadges({ items, className, size = "sm" }: DemoStackBadgesProps) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <Badge key={item} variant="outline" size={size} className="font-normal">
          {item}
        </Badge>
      ))}
    </div>
  );
}
