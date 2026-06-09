import Link from "next/link";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function Navbar() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-base font-semibold">
          {siteConfig.name}
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-muted-foreground hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <Button asChild size="sm">
          <Link href={siteConfig.ctaHref}>{siteConfig.cta}</Link>
        </Button>
      </div>
    </header>
  );
}
