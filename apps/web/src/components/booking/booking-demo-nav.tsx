"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { BOOKING_NAV_ITEMS } from "@/lib/demo-data/booking-demo-data";

export function BookingDemoNav() {
  const pathname = usePathname();

  function isActive(href: string, exact: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <nav
      aria-label="Navigation ZenSlot"
      className="border-b bg-card"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0">
          {/* Back to /demo */}
          <Link
            href="/demo"
            className="flex shrink-0 items-center gap-1 px-3 py-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3 w-3" />
            Demos
          </Link>

          <div className="mx-1 h-4 w-px bg-border shrink-0" />

          {/* Brand badge */}
          <span className="shrink-0 px-3 py-3 text-xs font-semibold text-primary">
            ZenSlot
          </span>

          <div className="mx-1 h-4 w-px bg-border shrink-0" />

          {/* Nav items */}
          {BOOKING_NAV_ITEMS.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "shrink-0 px-3 py-3 text-sm font-medium transition-colors border-b-2",
                  active
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="flex-1" />

          {/* Live booking CTA */}
          <Link
            href="/booking"
            className="shrink-0 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors my-auto"
          >
            Reserver
          </Link>
        </div>
      </div>
    </nav>
  );
}
