import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { MobileMenu } from "@/components/marketing/mobile-menu";
import { DemoDropdown } from "@/components/marketing/demo-dropdown";
import { siteConfig } from "@/config/site";

// Nav items that are NOT the demos link (demos handled by DemoDropdown)
const OTHER_NAV = siteConfig.nav.filter((item) => item.href !== "/demo");

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-base font-semibold">
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {/* Demos — rich dropdown with all 9 identities */}
          <DemoDropdown />

          {OTHER_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href={siteConfig.ctaHref}>{siteConfig.cta}</Link>
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
