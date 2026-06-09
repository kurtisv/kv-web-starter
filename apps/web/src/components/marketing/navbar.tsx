import Link from "next/link";

import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/projects", label: "Projets" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Tarifs" },
  { href: "/overview", label: "À propos" },
  { href: "/booking", label: "Réservation" },
  { href: "/faq", label: "FAQ" },
];

export function Navbar() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-base font-semibold">
          KV Studio
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-muted-foreground hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <Button asChild size="sm">
          <Link href="/booking">Prendre un appel</Link>
        </Button>
      </div>
    </header>
  );
}
