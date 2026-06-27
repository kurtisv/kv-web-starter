"use client";

import * as React from "react";
import { Download, Mail, Trash2, UserX } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTableShell } from "@/components/dashboard-ui/data-table-shell";
import { StatusBadge } from "@/components/dashboard-ui/status-badge";
import { FilterBar, type FilterGroup } from "@/components/dashboard-ui/filter-bar";
import { BulkActionBar, type BulkAction } from "@/components/dashboard-ui/bulk-action-bar";

const ALL_USERS = [
  { id: "1", name: "Alice Dupont",  email: "alice@ex.com",  plan: "Pro",      status: "active",    joined: "14 juin 2026" },
  { id: "2", name: "Bob Martin",    email: "bob@ex.com",    plan: "Starter",  status: "trialing",  joined: "12 juin 2026" },
  { id: "3", name: "Claire Petit",  email: "claire@ex.com", plan: "Business", status: "active",    joined: "10 juin 2026" },
  { id: "4", name: "David Lopez",   email: "david@ex.com",  plan: "Pro",      status: "suspended", joined: "8 juin 2026" },
  { id: "5", name: "Emma Richard",  email: "emma@ex.com",   plan: "Starter",  status: "pending",   joined: "5 juin 2026" },
  { id: "6", name: "Felix Bernard", email: "felix@ex.com",  plan: "Business", status: "active",    joined: "1 juin 2026" },
];

const STATUS_LABEL: Record<string, string> = {
  active: "Actif", trialing: "Essai", suspended: "Suspendu", pending: "En attente",
};

const FILTERS: FilterGroup[] = [
  {
    key: "plan",
    label: "Plan",
    options: [
      { value: "Starter",  label: "Starter" },
      { value: "Pro",      label: "Pro" },
      { value: "Business", label: "Business" },
    ],
  },
  {
    key: "status",
    label: "Statut",
    options: [
      { value: "active",    label: "Actif" },
      { value: "trialing",  label: "Essai" },
      { value: "suspended", label: "Suspendu" },
      { value: "pending",   label: "En attente" },
    ],
  },
];

export function DashboardDemoUsersCard() {
  const [selected, setSelected] = React.useState<Set<string>>(new Set());

  function toggleAll(users: typeof ALL_USERS) {
    if (selected.size === users.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(users.map((u) => u.id)));
    }
  }

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const bulkActions: BulkAction[] = [
    { label: "Email",    icon: <Mail className="h-3.5 w-3.5" />,   onClick: () => setSelected(new Set()), variant: "default" },
    { label: "Exporter", icon: <Download className="h-3.5 w-3.5" />, onClick: () => setSelected(new Set()), variant: "secondary" },
    { label: "Suspendre",icon: <UserX className="h-3.5 w-3.5" />,  onClick: () => setSelected(new Set()), variant: "ghost" },
    { label: "Supprimer",icon: <Trash2 className="h-3.5 w-3.5" />, onClick: () => setSelected(new Set()), variant: "destructive" },
  ];

  return (
    <>
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Utilisateurs</CardTitle>
            <Badge variant="outline" size="sm">{ALL_USERS.length} au total</Badge>
          </div>
          <FilterBar
            filters={FILTERS}
            searchPlaceholder="Rechercher un utilisateur..."
            className="mt-3"
          />
        </CardHeader>
        <CardContent className="p-0">
          <DataTableShell
            data={ALL_USERS}
            keyField="id"
            columns={[
              {
                key: "select",
                header: (
                  <input
                    type="checkbox"
                    checked={selected.size === ALL_USERS.length}
                    onChange={() => toggleAll(ALL_USERS)}
                    className="h-3.5 w-3.5 accent-primary"
                    aria-label="Tout selectionner"
                  />
                ),
                cell: (r) => (
                  <input
                    type="checkbox"
                    checked={selected.has(r.id)}
                    onChange={() => toggleRow(r.id)}
                    className="h-3.5 w-3.5 accent-primary"
                    aria-label={`Selectionner ${r.name}`}
                  />
                ),
              },
              {
                key: "name",
                header: "Nom",
                cell: (r) => (
                  <div>
                    <p className="font-medium text-sm">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.email}</p>
                  </div>
                ),
              },
              { key: "plan",   header: "Plan",   cell: (r) => <Badge variant="outline" size="sm">{r.plan}</Badge> },
              {
                key: "status",
                header: "Statut",
                cell: (r) => (
                  <StatusBadge
                    status={r.status}
                    label={STATUS_LABEL[r.status] ?? r.status}
                    dot
                  />
                ),
              },
              { key: "joined", header: "Inscrit le", cell: (r) => <span className="text-xs text-muted-foreground">{r.joined}</span> },
            ]}
          />
        </CardContent>
      </Card>

      <BulkActionBar
        selectedCount={selected.size}
        actions={bulkActions}
        onClear={() => setSelected(new Set())}
        entityLabel="utilisateur"
      />
    </>
  );
}
