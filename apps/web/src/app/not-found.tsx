import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MarketingPageShell } from "@/components/marketing/page-shell";

export default function NotFound() {
  return (
    <MarketingPageShell>
      <main>
        <section className="theme-hero">
          <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
            <p className="text-sm font-medium uppercase tracking-widest opacity-40">404</p>
            <h1 className="mt-4 text-4xl font-semibold sm:text-6xl">
              Cette page n&apos;existe pas.
            </h1>
            <p className="mt-5 max-w-lg text-lg opacity-70">
              La page que tu cherches a ete deplacee, supprimee, ou n&apos;a jamais existe.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="theme-hero-btn-primary">
                <Link href="/">
                  Retour a l&apos;accueil <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-background/30 text-background hover:bg-background/10 hover:text-background">
                <Link href="/docs">Lire le guide</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-t">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <p className="text-sm text-muted-foreground">Pages disponibles :</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { href: "/", label: "Accueil" },
                { href: "/docs", label: "Guide" },
                { href: "/services", label: "Services" },
                { href: "/pricing", label: "Tarifs" },
                { href: "/booking", label: "Reservation" },
                { href: "/developers", label: "API" },
                { href: "/faq", label: "FAQ" },
                { href: "/contact", label: "Contact" },
              ].map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="border bg-muted/30 px-3 py-1.5 text-sm text-muted-foreground hover:border-foreground hover:text-foreground"
                >
                  {p.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </MarketingPageShell>
  );
}
