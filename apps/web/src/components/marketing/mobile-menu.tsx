"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { THEME_META } from "@/design-system/tokens";
import { PROJECT_PRESETS } from "@/config/project-presets";

const DEMOS = [
  { slug: "portfolio",      label: "Portfolio" },
  { slug: "saas",           label: "SaaS" },
  { slug: "booking",        label: "Reservations" },
  { slug: "api",            label: "API Portal" },
  { slug: "real-estate",    label: "Immobilier" },
  { slug: "local-business", label: "Commerce local" },
  { slug: "auto-blog",      label: "Blog auto" },
  { slug: "ecommerce",      label: "E-commerce" },
  { slug: "dashboard",      label: "Dashboard" },
] as const;

const OTHER_NAV = siteConfig.nav.filter((item) => item.href !== "/demo");

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [demosOpen, setDemosOpen] = useState(false);
  const close = () => { setOpen(false); setDemosOpen(false); };

  return (
    <>
      <button
        className="md:hidden -mr-1 p-2 text-muted-foreground hover:text-foreground transition-colors"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={close} aria-hidden />
          <aside className="absolute right-0 top-0 h-full w-72 border-l bg-background shadow-xl flex flex-col">
            <div className="flex h-16 items-center justify-between border-b px-6">
              <Link href="/" className="text-base font-semibold" onClick={close}>
                {siteConfig.name}
              </Link>
              <button
                className="-mr-1 p-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={close}
                aria-label="Fermer le menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 py-4">
              {/* Demos — expandable section */}
              <div className="border-b border-border/40">
                <button
                  className="flex w-full items-center justify-between py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setDemosOpen((v) => !v)}
                >
                  Demos
                  <ChevronDown className={`h-4 w-4 transition-transform ${demosOpen ? "rotate-180" : ""}`} />
                </button>

                {demosOpen && (
                  <div className="pb-3 pl-1 space-y-0.5">
                    {DEMOS.map((d) => {
                      const preset = PROJECT_PRESETS[d.slug];
                      const meta = THEME_META[preset.theme];
                      return (
                        <Link
                          key={d.slug}
                          href={`/demo/${d.slug}`}
                          onClick={close}
                          className="flex items-center gap-2.5 rounded-md px-2 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                        >
                          <div className="h-4 w-1 shrink-0 rounded-full" style={{ background: meta.accent }} />
                          {d.label}
                        </Link>
                      );
                    })}
                    <Link
                      href="/demo"
                      onClick={close}
                      className="block px-2 pt-1 pb-1 text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                    >
                      Voir tous les demos →
                    </Link>
                  </div>
                )}
              </div>

              {/* Rest of nav */}
              {OTHER_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center border-b border-border/40 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors last:border-0"
                  onClick={close}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="border-t p-6">
              <Button asChild className="w-full">
                <Link href={siteConfig.ctaHref} onClick={close}>
                  {siteConfig.cta}
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
