import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/dashboard-ui/status-badge";
import { cn } from "@/lib/utils";
import { DEMO_TEAM } from "@/lib/demo-data/saas-demo-data";

const ROLE_BADGE: Record<string, "default" | "outline" | "soft"> = {
  admin:  "default",
  member: "soft",
  viewer: "outline",
};

const ROLE_LABEL: Record<string, string> = {
  admin:  "Admin",
  member: "Membre",
  viewer: "Lecteur",
};

interface TeamMembersTableProps {
  compact?: boolean;
  className?: string;
}

export function TeamMembersTable({ compact = false, className }: TeamMembersTableProps) {
  const members = compact ? DEMO_TEAM.slice(0, 4) : DEMO_TEAM;

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Membres de l&apos;equipe</CardTitle>
          <Badge variant="outline" size="sm">{DEMO_TEAM.length} membres</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {members.map((m) => (
            <div key={m.id} className="flex items-center gap-3 px-6 py-2.5">
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary"
                aria-hidden="true"
              >
                {m.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.email}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <Badge variant={(ROLE_BADGE[m.role] ?? "outline") as "default" | "outline" | "soft"} size="sm">
                  {ROLE_LABEL[m.role] ?? m.role}
                </Badge>
                <StatusBadge
                  status={m.status === "active" ? "active" : "pending"}
                  label={m.status === "active" ? "Actif" : "Invite"}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
