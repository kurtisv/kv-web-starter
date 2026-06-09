"use client";

import Link from "next/link";
import {
  BriefcaseBusiness,
  CalendarDays,
  CreditCard,
  Gauge,
  KeyRound,
  LayoutDashboard,
  Settings,
  UserRoundCog,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { NavItem } from "@/components/dashboard/nav-item";

export function Sidebar() {
  const t = useTranslations("Dashboard");

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
    <aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-background px-4 py-5 lg:flex lg:flex-col">
      <Link href="/" className="block px-2 text-lg font-semibold hover:opacity-80">
        KV Web Starter
      </Link>
      <nav className="mt-8 flex flex-col gap-1" aria-label={t("nav.ariaLabel")}>
        {navItems.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </nav>
    </aside>
  );
}
