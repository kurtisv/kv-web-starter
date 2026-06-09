import Link from "next/link";

import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-[1.5fr_repeat(3,_1fr)]">
          <div>
            <p className="font-semibold text-foreground">{siteConfig.name}</p>
            <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
              {siteConfig.tagline}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {siteConfig.footerTags.map((t) => (
                <span key={t} className="border bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {siteConfig.footerColumns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
                {col.title}
              </p>
              <ul className="mt-3 grid gap-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-6 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.</p>
          <p>Conçu et développé par Kurtis V. au {siteConfig.location}.</p>
        </div>
      </div>
    </footer>
  );
}
