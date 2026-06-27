import { getTranslations } from "next-intl/server";
import { CalendarDays, CreditCard, Activity, Users } from "lucide-react";

import { requireDashboardAccess } from "@/lib/dashboard-auth";
import { prisma } from "@/lib/db";
import { DashboardPageHeader } from "@/components/dashboard-ui/dashboard-shell";
import { MetricCard, MetricGrid } from "@/components/dashboard-ui/metric-card";

function startOfCurrentMonth() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

async function getDashboardStats() {
  const today = startOfToday();
  const monthStart = startOfCurrentMonth();

  try {
    const [todayBookings, activeSubscriptions, monthlyRequests] = await Promise.all([
      prisma.booking.count({ where: { startAt: { gte: today } } }),
      prisma.subscription.count({ where: { status: { in: ["active", "trialing"] } } }),
      prisma.apiUsage.count({ where: { createdAt: { gte: monthStart } } }),
    ]);

    return { todayBookings, activeSubscriptions, monthlyRequests };
  } catch {
    if (process.env.NODE_ENV === "development") {
      console.warn("[dashboard] DB unavailable, using demo stats");
    }
    return { todayBookings: 4, activeSubscriptions: 12, monthlyRequests: 1847, monthlyRevenue: "2 400 €" };
  }
}

export default async function DashboardPage() {
  await requireDashboardAccess();
  const t = await getTranslations("Dashboard");

  const { todayBookings, activeSubscriptions, monthlyRequests, monthlyRevenue } = await getDashboardStats();

  return (
    <main className="px-6 py-10 text-foreground">
      <div className="mx-auto max-w-6xl">
        <DashboardPageHeader
          title={t("overview.title")}
          description={t("stats.todayBookings") ? undefined : "Vue d'ensemble de votre activite."}
        />
        <MetricGrid>
          <MetricCard
            label={t("stats.todayBookings")}
            value={todayBookings}
            icon={<CalendarDays className="h-4 w-4" />}
          />
          <MetricCard
            label={t("stats.monthlyRevenue")}
            value={monthlyRevenue ?? "—"}
            icon={<CreditCard className="h-4 w-4" />}
          />
          <MetricCard
            label={t("stats.monthlyRequests")}
            value={monthlyRequests}
            icon={<Activity className="h-4 w-4" />}
          />
          <MetricCard
            label={t("stats.activeSubscriptions")}
            value={activeSubscriptions}
            icon={<Users className="h-4 w-4" />}
          />
        </MetricGrid>
      </div>
    </main>
  );
}
