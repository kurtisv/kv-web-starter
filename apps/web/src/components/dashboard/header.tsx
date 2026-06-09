import type { Session } from "next-auth";
import { useTranslations } from "next-intl";

import { signOutCurrentUser } from "@/app/actions/auth";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { Button } from "@/components/ui/button";

type DashboardHeaderProps = {
  session: Session | null;
};

export function DashboardHeader({ session }: DashboardHeaderProps) {
  const t = useTranslations("Dashboard");

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-3">
        <MobileNav />
        <div>
          <p className="text-sm font-medium leading-none">
            {session?.user?.name ?? t("header.admin")}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">{session?.user?.email}</p>
        </div>
      </div>
      <form action={signOutCurrentUser}>
        <Button type="submit" variant="secondary" size="sm">
          {t("header.signOut")}
        </Button>
      </form>
    </header>
  );
}
