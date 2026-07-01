import { cn } from "@/lib/utils";

interface ShimmerBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export function ShimmerBadge({ className, children, ...props }: ShimmerBadgeProps) {
  return (
    <span
      className={cn(
        "shimmer-badge inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-primary-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
