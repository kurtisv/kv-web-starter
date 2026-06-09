"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type NavItemProps = {
  href: string;
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
};

export function NavItem({ href, label, icon: Icon, onClick }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex h-10 items-center gap-3 px-3 text-sm transition-colors",
        isActive
          ? "bg-muted font-medium text-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      <Icon className="size-4 shrink-0" />
      {label}
    </Link>
  );
}
