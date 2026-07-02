import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface Role {
  id: string;
  name: string;
  members: string[];
  permissions: string[];
}

interface RolePermissionsCardProps {
  roles: Role[];
  className?: string;
}

export function RolePermissionsCard({ roles, className }: RolePermissionsCardProps) {
  return (
    <div className={cn("rounded-xl border bg-card shadow-sm overflow-hidden", className)}>
      <div className="flex items-center gap-2 border-b px-5 py-4">
        <Shield className="h-4 w-4 text-muted-foreground" />
        <p className="text-sm font-medium">Roles &amp; permissions</p>
      </div>
      <div className="divide-y">
        {roles.map((role) => (
          <div key={role.id} className="px-5 py-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">{role.name}</p>
              <span className="text-xs text-muted-foreground">
                {role.members.length} membre{role.members.length !== 1 ? "s" : ""}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              {role.members.join(", ")}
            </p>
            <div className="flex flex-wrap gap-1">
              {role.permissions.map((perm) => (
                <span key={perm} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {perm}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
