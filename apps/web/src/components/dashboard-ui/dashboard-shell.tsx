import * as React from "react";
import { cn } from "@/lib/utils";

interface DashboardShellProps {
  sidebar?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function DashboardShell({ sidebar, children, className }: DashboardShellProps) {
  return (
    <div className={cn("flex min-h-screen bg-background", className)}>
      {sidebar && (
        <aside className="hidden w-64 shrink-0 border-r bg-card lg:flex lg:flex-col">
          {sidebar}
        </aside>
      )}
      <div className="flex flex-1 flex-col overflow-auto">
        {children}
      </div>
    </div>
  );
}

export function DashboardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <header
      className={cn(
        "flex h-14 shrink-0 items-center justify-between border-b bg-background px-6",
        className,
      )}
      {...props}
    />
  );
}

export function DashboardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <main className={cn("flex-1 px-6 py-8", className)} {...props} />;
}

export function DashboardPageHeader({
  title,
  description,
  actions,
  className,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-6 flex flex-wrap items-start justify-between gap-4", className)}>
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
