"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart2,
  CalendarDays,
  ChevronDown,
  Gauge,
  Globe,
  Home as HomeIcon,
  KeyRound,
  MapPin,
  ShoppingCart,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { THEME_META } from "@/design-system/tokens";
import { PROJECT_PRESETS } from "@/config/project-presets";

const DEMOS = [
  { slug: "portfolio",      label: "Portfolio",      Icon: Globe,        tagline: "Vitrine + etudes de cas" },
  { slug: "saas",           label: "SaaS",           Icon: Zap,          tagline: "Abonnements + analytics" },
  { slug: "booking",        label: "Reservations",   Icon: CalendarDays, tagline: "Agenda + paiement" },
  { slug: "api",            label: "API Portal",     Icon: KeyRound,     tagline: "Cles API + rate limit" },
  { slug: "real-estate",    label: "Immobilier",     Icon: HomeIcon,     tagline: "Annonces + rendements" },
  { slug: "local-business", label: "Commerce local", Icon: MapPin,       tagline: "Services + avis" },
  { slug: "auto-blog",      label: "Blog auto",      Icon: Gauge,        tagline: "Magazine + catalogue" },
  { slug: "ecommerce",      label: "E-commerce",     Icon: ShoppingCart, tagline: "Boutique + panier" },
  { slug: "dashboard",      label: "Dashboard",      Icon: BarChart2,    tagline: "Admin + metriques" },
] as const;

export function DemoDropdown() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 160);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => { cancelClose(); setOpen(true); }}
      onMouseLeave={scheduleClose}
    >
      {/* Trigger */}
      <button
        aria-haspopup="true"
        aria-expanded={open}
        className={cn(
          "flex items-center gap-1 text-sm transition-colors",
          open ? "text-foreground" : "text-muted-foreground hover:text-foreground",
        )}
        onClick={() => setOpen((v) => !v)}
      >
        Demos
        <ChevronDown
          className={cn("h-3 w-3 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      {/* Panel */}
      {open && (
        <div
          className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          {/* Arrow */}
          <div className="absolute left-1/2 top-[6px] h-2 w-2 -translate-x-1/2 rotate-45 border-l border-t border-border bg-popover" />

          <div className="w-[600px] overflow-hidden rounded-xl border border-border bg-popover shadow-xl">
            {/* Header */}
            <div className="border-b border-border/60 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
                9 identites visuelles
              </p>
            </div>

            {/* 3-column grid */}
            <div className="grid grid-cols-3 gap-px bg-border/30 p-px">
              {DEMOS.map((d) => {
                const preset = PROJECT_PRESETS[d.slug];
                const meta = THEME_META[preset.theme];
                return (
                  <Link
                    key={d.slug}
                    href={`/demo/${d.slug}`}
                    onClick={() => setOpen(false)}
                    className="group flex items-center gap-3 bg-popover px-3 py-3 transition-colors hover:bg-accent"
                  >
                    {/* Accent stripe */}
                    <div
                      className="h-8 w-1 shrink-0 rounded-full opacity-80 group-hover:opacity-100 transition-opacity"
                      style={{ background: meta.accent }}
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <d.Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        <span className="truncate text-sm font-medium">{d.label}</span>
                      </div>
                      <p className="truncate text-xs text-muted-foreground">{d.tagline}</p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Footer */}
            <div className="border-t border-border/60 px-4 py-2">
              <Link
                href="/demo"
                onClick={() => setOpen(false)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Voir la galerie complete <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
