import * as React from "react";
import { CreditCard, TrendingUp, Users, AlertCircle } from "lucide-react";

import { DashboardShell, DashboardHeader, DashboardContent, DashboardPageHeader } from "@/components/dashboard-ui/dashboard-shell";
import { MetricCard, MetricGrid } from "@/components/dashboard-ui/metric-card";
import { ActivityFeed } from "@/components/dashboard-ui/activity-feed";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NotificationBell } from "@/components/ui/notification-bell";
import { DashboardDemoUsersCard } from "./dashboard-demo-client";

const activity = [
  { id: "a1", message: "Nouvel abonnement Pro — Alice Dupont",          timestamp: "Il y a 2h",    variant: "success"     as const },
  { id: "a2", message: "Echec de paiement — David Lopez",              timestamp: "Il y a 4h",    variant: "destructive" as const },
  { id: "a3", message: "Compte David Lopez suspendu automatiquement",  timestamp: "Il y a 4h",    variant: "warning"     as const },
  { id: "a4", message: "Export CSV declenche par admin",               timestamp: "Hier 16h30",   variant: "default"     as const },
  { id: "a5", message: "Mise a jour v2.4.1 deployee",                  timestamp: "Hier 10h00",   variant: "success"     as const },
];

const sidebarNav = [
  { label: "Vue d'ensemble", active: true },
  { label: "Utilisateurs",   active: false },
  { label: "Facturation",    active: false },
  { label: "API Keys",       active: false },
  { label: "Parametres",     active: false },
];

function Sidebar() {
  return (
    <div className="flex flex-col h-full">
      <div className="h-14 border-b flex items-center px-5 font-semibold text-sm tracking-tight">
        AdminPro
      </div>
      <nav className="flex-1 px-3 py-4">
        {sidebarNav.map((item) => (
          <div
            key={item.label}
            className={`flex items-center px-3 py-2 text-sm cursor-pointer mb-0.5 transition-colors ${
              item.active
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {item.label}
          </div>
        ))}
      </nav>
      <div className="border-t p-4">
        <div className="text-xs text-muted-foreground">Connecte en tant que</div>
        <div className="text-sm font-medium mt-0.5">admin@monsaas.io</div>
      </div>
    </div>
  );
}

export default function DemoDashboardPage() {
  return (
    <div data-theme="premium-saas">
      <DashboardShell sidebar={<Sidebar />}>
        <DashboardHeader>
          <div className="text-sm text-muted-foreground">
            Dashboard — <span className="font-medium text-foreground">Vue d&apos;ensemble</span>
          </div>
          <div className="flex items-center gap-2">
            <NotificationBell />
            <Button size="sm">+ Inviter</Button>
          </div>
        </DashboardHeader>

        <DashboardContent>
          <DashboardPageHeader
            title="Vue d'ensemble"
            description="Resume de l'activite du mois en cours."
            actions={<Button variant="outline" size="sm">Exporter CSV</Button>}
          />

          <MetricGrid className="mb-8">
            <MetricCard
              label="MRR"
              value="24 890 €"
              icon={<CreditCard className="h-4 w-4" />}
              trend={{ value: "+12% vs mois precedent", direction: "up" }}
            />
            <MetricCard
              label="Utilisateurs actifs"
              value="1 247"
              icon={<Users className="h-4 w-4" />}
              trend={{ value: "+8% cette semaine", direction: "up" }}
            />
            <MetricCard
              label="Churn rate"
              value="1.2%"
              icon={<TrendingUp className="h-4 w-4" />}
              trend={{ value: "-0.3% vs mois precedent", direction: "down" }}
            />
            <MetricCard
              label="Incidents ouverts"
              value="2"
              icon={<AlertCircle className="h-4 w-4" />}
              trend={{ value: "-4 resolus aujourd'hui", direction: "neutral" }}
            />
          </MetricGrid>

          <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
            {/* Users table — FilterBar + StatusBadge + BulkActionBar */}
            <React.Suspense fallback={<div className="h-64 animate-pulse bg-muted" />}>
              <DashboardDemoUsersCard />
            </React.Suspense>

            {/* Activity feed */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Activite recente</CardTitle>
              </CardHeader>
              <CardContent>
                <ActivityFeed items={activity} />
              </CardContent>
            </Card>
          </div>
        </DashboardContent>
      </DashboardShell>
    </div>
  );
}
