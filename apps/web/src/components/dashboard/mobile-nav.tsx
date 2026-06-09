"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BriefcaseBusiness,
  CalendarDays,
  CreditCard,
  Gauge,
  KeyRound,
  LayoutDashboard,
  Menu,
  Settings,
  UserRoundCog,
  Users,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { NavItem } from "@/components/dashboard/nav-item";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Dashboard");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const navItems = [
    { href: "/dashboard", label: t("nav.overview"), icon: LayoutDashboard },
    { href: "/dashboard/bookings", label: t("nav.bookings"), icon: CalendarDays },
    { href: "/dashboard/availability", label: t("nav.availability"), icon: CalendarDays },
    { href: "/dashboard/services", label: t("nav.services"), icon: BriefcaseBusiness },
    { href: "/dashboard/staff", label: t("nav.staff"), icon: UserRoundCog },
    { href: "/dashboard/customers", label: t("nav.customers"), icon: Users },
    { href: "/dashboard/api-keys", label: t("nav.apiKeys"), icon: KeyRound },
    { href: "/dashboard/api-usage", label: t("nav.apiUsage"), icon: Gauge },
    { href: "/dashboard/billing", label: t("nav.billing"), icon: CreditCard },
    { href: "/dashboard/settings", label: t("nav.settings"), icon: Settings },
  ];

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="lg:hidden"
        onClick={() => setOpen(true)}
        aria-label={t("nav.openMenu")}
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
      >
        <Menu className="size-5" />
      </Button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={t("nav.ariaLabel")}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r bg-background px-4 py-5 transition-transform duration-200 lg:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-semibold"
            onClick={() => setOpen(false)}
          >
            KV Web Starter
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen(false)}
            aria-label={t("nav.closeMenu")}
          >
            <X className="size-4" />
          </Button>
        </div>
        <nav className="flex flex-col gap-1" aria-label={t("nav.ariaLabel")}>
          {navItems.map((item) => (
            <NavItem key={item.href} {...item} onClick={() => setOpen(false)} />
          ))}
        </nav>
      </div>
    </>
  );
}
