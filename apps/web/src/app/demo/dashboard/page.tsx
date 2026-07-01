"use client";

import * as React from "react";
import { CreditCard, TrendingUp, Users, AlertCircle, UserPlus, Trash2 } from "lucide-react";

import { DashboardShell, DashboardHeader, DashboardContent, DashboardPageHeader } from "@/components/dashboard-ui/dashboard-shell";
import { MetricCard, MetricGrid } from "@/components/dashboard-ui/metric-card";
import { ActivityFeed } from "@/components/dashboard-ui/activity-feed";
import { AuditLogTimeline, type AuditLogItem } from "@/components/dashboard-ui/audit-log-timeline";
import { EmptyDashboardState } from "@/components/dashboard-ui/empty-dashboard-state";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NotificationBell } from "@/components/ui/notification-bell";
import { DashboardDemoUsersCard } from "./dashboard-demo-client";
import { DashboardDemoActions } from "./dashboard-demo-actions";

const activity = [
  { id: "a1", message: "Nouvel abonnement Pro — Alice Dupont",         timestamp: "Il y a 2h",  variant: "success"     as const },
  { id: "a2", message: "Echec de paiement — David Lopez",             timestamp: "Il y a 4h",  variant: "destructive" as const },
  { id: "a3", message: "Compte David Lopez suspendu automatiquement", timestamp: "Il y a 4h",  variant: "warning"     as const },
  { id: "a4", message: "Export CSV declenche par admin",              timestamp: "Hier 16h30", variant: "default"     as const },
  { id: "a5", message: "Mise a jour v2.4.1 deployee",                 timestamp: "Hier 10h00", variant: "success"     as const },
];

const auditLog: AuditLogItem[] = [
  { id: "al1", action: "Utilisateur supprime",   actor: "admin@app.io",   createdAt: "28 juin, 09:14", variant: "warning",  description: "Compte david@ex.com supprime apres inactivite." },
  { id: "al2", action: "Permission modifiee",    actor: "admin@app.io",   createdAt: "27 juin, 16:30", variant: "info",     description: "Role 'editor' accorde a claire@ex.com." },
  { id: "al3", action: "Export CSV declenche",   actor: "felix@ex.com",   createdAt: "27 juin, 11:45", variant: "info" },
  { id: "al4", action: "Connexion suspecte",     actor: "systeme",        createdAt: "26 juin, 23:12", variant: "warning",  description: "Tentative depuis une IP inconnue — bloquee." },
  { id: "al5", action: "Abonnement mis a jour",  actor: "alice@ex.com",   createdAt: "26 juin, 14:00", variant: "success",  description: "Passage de Starter a Pro." },
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
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-5 text-sm font-semibold tracking-tight">
        AdminPro
      </div>
      <nav className="flex-1 px-3 py-4">
        {sidebarNav.map((item) => (
          <div
            key={item.label}
            className={`mb-0.5 flex cursor-pointer items-center px-3 py-2 text-sm transition-colors ${
              item.active
                ? "bg-primary/10 font-medium text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {item.label}
          </div>
        ))}
      </nav>
      <div className="border-t p-4">
        <div className="text-xs text-muted-foreground">Connecte en tant que</div>
        <div className="mt-0.5 text-sm font-medium">admin@monsaas.io</div>
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

          {/* MetricCard loading state */}
          <div className="mb-8 border-t pt-6">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Etat de chargement
            </p>
            <MetricGrid>
              <MetricCard label="" value="" loading />
              <MetricCard label="" value="" loading />
              <MetricCard label="" value="" loading />
              <MetricCard label="" value="" loading />
            </MetricGrid>
          </div>

          {/* Users table */}
          <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
            <React.Suspense fallback={<div className="h-64 animate-pulse bg-muted" />}>
              <DashboardDemoUsersCard />
            </React.Suspense>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Activite recente</CardTitle>
              </CardHeader>
              <CardContent>
                <ActivityFeed items={activity} />
              </CardContent>
            </Card>
          </div>

          {/* ConfirmDialog + EntityDrawer showcase */}
          <div className="mt-8 border-t pt-8">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium">Dialogs et drawers</p>
              <div className="flex gap-2">
                <Badge variant="outline" size="sm" className="font-mono text-[10px]">ConfirmDialog</Badge>
                <Badge variant="outline" size="sm" className="font-mono text-[10px]">EntityDrawer</Badge>
              </div>
            </div>
            <p className="mb-4 text-xs text-muted-foreground max-w-lg">
              ConfirmDialog pour les actions destructives. EntityDrawer pour afficher et modifier le detail
              d&apos;une entite sans quitter la page.
            </p>
            <DashboardDemoActions />
          </div>

          {/* AuditLogTimeline */}
          <div className="mt-8 border-t pt-8">
            <div className="mb-4 flex items-center gap-3">
              <p className="text-sm font-medium">AuditLogTimeline</p>
              <Badge variant="outline" size="sm" className="font-mono text-[10px]">server</Badge>
            </div>
            <AuditLogTimeline items={auditLog} />
          </div>

          {/* EmptyDashboardState */}
          <div className="mt-8 border-t pt-8">
            <div className="mb-4 flex items-center gap-3">
              <p className="text-sm font-medium">EmptyDashboardState</p>
              <Badge variant="outline" size="sm" className="font-mono text-[10px]">server</Badge>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <EmptyDashboardState
                title="Aucun utilisateur"
                description="Invitez des membres pour commencer a collaborer."
                icon={UserPlus}
                actionLabel="Inviter un membre"
                onAction={() => {}}
              />
              <EmptyDashboardState
                title="Aucune commande"
                description="Les commandes apparaitront ici une fois que vos clients auront effectue un achat."
                icon={Trash2}
              />
            </div>
          </div>
        </DashboardContent>
      </DashboardShell>
    </div>
  );
}
