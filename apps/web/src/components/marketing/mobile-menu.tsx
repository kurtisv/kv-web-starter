"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

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
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />
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
              {siteConfig.nav.map((item) => (
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
