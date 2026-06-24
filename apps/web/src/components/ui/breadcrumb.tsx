import * as React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

export function Breadcrumb({ items, showHome = true, className }: BreadcrumbProps) {
  const allItems = items;

  return (
    <nav
      aria-label="Fil d'Ariane"
      className={cn("flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap", className)}
    >
      {showHome && (
        <>
          <Link
            href="/"
            className="hover:text-foreground transition-colors inline-flex items-center"
          >
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only">Accueil</span>
          </Link>
          {allItems.length > 0 && (
            <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-40" aria-hidden />
          )}
        </>
      )}

      {allItems.map((item, i) => {
        const isLast = i === allItems.length - 1;

        return (
          <React.Fragment key={`${item.label}-${i}`}>
            {isLast ? (
              <span
                className="font-medium text-foreground truncate max-w-[200px]"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-foreground transition-colors truncate max-w-[160px]"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="truncate max-w-[160px]">{item.label}</span>
                )}
                <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-40" aria-hidden />
              </>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
