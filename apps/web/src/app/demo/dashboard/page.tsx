import { Users, CreditCard, TrendingUp, AlertCircle, Bell } from "lucide-react";
import { DashboardShell, DashboardHeader, DashboardContent, DashboardPageHeader } from "@/components/dashboard-ui/dashboard-shell";
import { MetricCard, MetricGrid } from "@/components/dashboard-ui/metric-card";
import { ActivityFeed } from "@/components/dashboard-ui/activity-feed";
import { DataTableShell } from "@/components/dashboard-ui/data-table-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const recentUsers = [
  { id: "1", name: "Alice Dupont", email: "alice@ex.com", plan: "Pro", status: "active", joined: "14 juin 2025" },
  { id: "2", name: "Bob Martin", email: "bob@ex.com", plan: "Starter", status: "active", joined: "12 juin 2025" },
  { id: "3", name: "Claire Petit", email: "claire@ex.com", plan: "Business", status: "active", joined: "10 juin 2025" },
  { id: "4", name: "David Lopez", email: "david@ex.com", plan: "Pro", status: "suspended", joined: "8 juin 2025" },
];

const activity = [
  { id: "a1", message: "Nouvel abonnement Pro — Alice Dupont", timestamp: "Il y a 2h", variant: "success" as const },
  { id: "a2", message: "Echec de paiement — David Lopez", timestamp: "Il y a 4h", variant: "destructive" as const },
  { id: "a3", message: "Compte David Lopez suspendu automatiquement", timestamp: "Il y a 4h", variant: "warning" as const },
  { id: "a4", message: "Export CSV declenche par admin", timestamp: "Hier 16h30", variant: "default" as const },
  { id: "a5", message: "Mise a jour v2.4.1 deployee", timestamp: "Hier 10h00", variant: "success" as const },
];

const sidebarNav = [
  { label: "Vue d'ensemble", active: true },
  { label: "Utilisateurs", active: false },
  { label: "Facturation", active: false },
  { label: "API Keys", active: false },
  { label: "Parametres", active: false },
];

function Sidebar() {
  return (
    <div className="flex flex-col h-full">
      <div className="h-14 border-b flex items-center px-5 font-semibold text-sm">AdminPro</div>
      <nav className="flex-1 px-3 py-4">
        {sidebarNav.map((item) => (
          <div
            key={item.label}
            className={`flex items-center px-3 py-2 rounded text-sm cursor-pointer mb-0.5 ${
              item.active
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-muted"
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
      <DashboardShell
        sidebar={<Sidebar />}
      >
        <DashboardHeader>
          <div className="text-sm text-muted-foreground">
            Dashboard — <span className="font-medium text-foreground">Vue d&apos;ensemble</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon"><Bell className="h-4 w-4" /></Button>
            <Button size="sm">+ Inviter un membre</Button>
          </div>
        </DashboardHeader>

        <DashboardContent>
          <DashboardPageHeader
            title="Vue d'ensemble"
            description="Resume de l'activite du mois en cours."
            actions={
              <Button variant="outline" size="sm">Exporter CSV</Button>
            }
          />

          <MetricGrid className="mb-8">
            <MetricCard label="MRR" value="€24,890" icon={<CreditCard className="h-4 w-4" />} trend={{ value: "+12% vs mois precedent", direction: "up" }} />
            <MetricCard label="Utilisateurs actifs" value="1,247" icon={<Users className="h-4 w-4" />} trend={{ value: "+8% cette semaine", direction: "up" }} />
            <MetricCard label="Churn rate" value="1.2%" icon={<TrendingUp className="h-4 w-4" />} trend={{ value: "-0.3% vs mois precedent", direction: "down" }} />
            <MetricCard label="Incidents ouverts" value="2" icon={<AlertCircle className="h-4 w-4" />} trend={{ value: "-4 resolus aujourd'hui", direction: "neutral" }} />
          </MetricGrid>

          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Derniers utilisateurs</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <DataTableShell
                  data={recentUsers}
                  keyField="id"
                  columns={[
                    { key: "name", header: "Nom", cell: (r) => <span className="font-medium">{r.name}</span> },
                    { key: "email", header: "Email", cell: (r) => <span className="text-muted-foreground">{r.email}</span> },
                    { key: "plan", header: "Plan", cell: (r) => <Badge variant="outline" size="sm">{r.plan}</Badge> },
                    { key: "status", header: "Statut", cell: (r) => (
                      <Badge variant={r.status === "active" ? "success" : "destructive"} size="sm">
                        {r.status === "active" ? "Actif" : "Suspendu"}
                      </Badge>
                    )},
                    { key: "joined", header: "Inscription", cell: (r) => <span className="text-muted-foreground text-xs">{r.joined}</span> },
                  ]}
                />
              </CardContent>
            </Card>

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
