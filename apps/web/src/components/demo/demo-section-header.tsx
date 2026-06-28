import { cn } from "@/lib/utils";

interface DemoSectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
  className?: string;
}

export function DemoSectionHeader({
  eyebrow,
  title,
  description,
  center = false,
  className,
}: DemoSectionHeaderProps) {
  return (
    <div className={cn(center && "text-center", className)}>
      {eyebrow && (
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-balance">{title}</h2>
      {description && (
        <p className="mt-3 max-w-2xl text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
