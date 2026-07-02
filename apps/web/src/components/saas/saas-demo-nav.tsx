"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SAAS_NAV_ITEMS } from "@/lib/demo-data/saas-demo-data";

export function SaasDemoNav() {
  const pathname = usePathname();

  return (
    <nav
      className="border-b bg-card"
      aria-label="Navigation LaunchPilot"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {/* Brand */}
          <span className="mr-4 shrink-0 py-3 text-sm font-semibold text-foreground">
            LaunchPilot
          </span>

          {/* Nav links */}
          {SAAS_NAV_ITEMS.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href) && !item.exact
                ? pathname === item.href || pathname.startsWith(item.href + "/")
                : false;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "shrink-0 border-b-2 px-3 py-3 text-sm font-medium transition-colors",
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

          {/* Demo badge */}
          <span className="ml-auto shrink-0 py-3 text-xs font-medium text-primary">
            Demo SaaS
          </span>
        </div>
      </div>
    </nav>
  );
}
