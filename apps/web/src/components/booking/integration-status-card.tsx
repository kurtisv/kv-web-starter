import { CheckCircle2, XCircle, Clock, Calendar, CreditCard, Mail, Video, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface Integration {
  id: string;
  name: string;
  status: "connected" | "disconnected" | "pending";
  icon: string;
  description: string;
}

interface IntegrationStatusCardProps {
  integrations: Integration[];
  className?: string;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  calendar:    <Calendar className="h-4 w-4" />,
  "credit-card": <CreditCard className="h-4 w-4" />,
  mail:        <Mail className="h-4 w-4" />,
  video:       <Video className="h-4 w-4" />,
  message:     <MessageSquare className="h-4 w-4" />,
};

const STATUS_CONFIG: Record<
  Integration["status"],
  { icon: React.ReactNode; label: string; className: string }
> = {
  connected:    { icon: <CheckCircle2 className="h-3.5 w-3.5" />, label: "Connecte",    className: "text-green-600 dark:text-green-400" },
  disconnected: { icon: <XCircle className="h-3.5 w-3.5" />,      label: "Deconnecte",  className: "text-muted-foreground" },
  pending:      { icon: <Clock className="h-3.5 w-3.5" />,         label: "En attente",  className: "text-amber-600 dark:text-amber-400" },
};

export function IntegrationStatusCard({ integrations, className }: IntegrationStatusCardProps) {
  const connected = integrations.filter((i) => i.status === "connected").length;

  return (
    <div className={cn("rounded-xl border bg-card shadow-sm overflow-hidden", className)}>
      <div className="flex items-center justify-between border-b px-5 py-4">
        <p className="text-sm font-medium">Integrations</p>
        <span className="text-xs text-muted-foreground">
          {connected}/{integrations.length} connectees
        </span>
      </div>
      <div className="divide-y">
        {integrations.map((intg) => {
          const status = STATUS_CONFIG[intg.status];
          return (
            <div key={intg.id} className="flex items-center gap-3 px-5 py-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                {ICON_MAP[intg.icon] ?? <Calendar className="h-4 w-4" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{intg.name}</p>
                <p className="text-xs text-muted-foreground">{intg.description}</p>
              </div>
              <div className={cn("flex items-center gap-1 text-xs font-medium shrink-0", status.className)}>
                {status.icon}
                {status.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
