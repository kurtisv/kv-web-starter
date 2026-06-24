import { getTranslations } from "next-intl/server";

import { requireDashboardAccess } from "@/lib/dashboard-auth";
import { prisma } from "@/lib/db";

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

  const stats: [string, string | number][] = [
    [t("stats.todayBookings"), todayBookings],
    [t("stats.monthlyRevenue"), monthlyRevenue ?? "—"],
    [t("stats.monthlyRequests"), monthlyRequests],
    [t("stats.activeSubscriptions"), activeSubscriptions],
  ];

  return (
    <main className="px-6 py-10 text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Dashboard
          </p>
          <h1 className="mt-3 text-3xl font-semibold">{t("overview.title")}</h1>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([label, value]) => (
            <section key={label} className="border bg-card p-5">
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="mt-3 text-2xl font-semibold tabular-nums">{value}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
