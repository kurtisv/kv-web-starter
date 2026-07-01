"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const MobileSidebarCtx = React.createContext<{
  open: boolean;
  setOpen: (v: boolean) => void;
} | null>(null);

interface DashboardShellProps {
  sidebar?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function DashboardShell({ sidebar, children, className }: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <MobileSidebarCtx.Provider value={{ open: mobileOpen, setOpen: setMobileOpen }}>
      <div className={cn("flex min-h-screen bg-background", className)}>
        {sidebar && (
          <aside className="hidden w-64 shrink-0 border-r bg-card lg:flex lg:flex-col">
            {sidebar}
          </aside>
        )}

        {sidebar && (
          <>
            <div
              className={cn(
                "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity lg:hidden",
                mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
              )}
              aria-hidden
              onClick={() => setMobileOpen(false)}
            />
            <aside
              className={cn(
                "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-card transition-transform lg:hidden",
                mobileOpen ? "translate-x-0" : "-translate-x-full",
              )}
            >
              <div className="flex h-14 shrink-0 items-center justify-end border-b px-3">
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                  aria-label="Fermer le menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {sidebar}
            </aside>
          </>
        )}

        <div className="flex flex-1 flex-col overflow-auto">{children}</div>
      </div>
    </MobileSidebarCtx.Provider>
  );
}

export function DashboardMobileTrigger({ className }: { className?: string }) {
  const ctx = React.useContext(MobileSidebarCtx);
  if (!ctx) return null;
  return (
    <button
      type="button"
      onClick={() => ctx.setOpen(true)}
      className={cn(
        "rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden",
        className,
      )}
      aria-label="Ouvrir le menu"
    >
      <Menu className="h-5 w-5" />
    </button>
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
