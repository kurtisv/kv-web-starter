import { Mail, MessageSquare, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Template {
  id: string;
  name: string;
  type: "email" | "sms";
  trigger: string;
  delay: string;
  status: "active" | "inactive";
  subject?: string;
}

interface AutomationTemplateCardProps {
  templates: Template[];
  className?: string;
}

const TYPE_ICON = {
  email: <Mail className="h-3.5 w-3.5" />,
  sms:   <MessageSquare className="h-3.5 w-3.5" />,
};

export function AutomationTemplateCard({ templates, className }: AutomationTemplateCardProps) {
  return (
    <div className={cn("rounded-xl border bg-card shadow-sm overflow-hidden", className)}>
      <div className="border-b px-5 py-4">
        <p className="text-sm font-medium">Rappels &amp; automatisations</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {templates.filter((t) => t.status === "active").length} actif{templates.filter((t) => t.status === "active").length !== 1 ? "s" : ""}
        </p>
      </div>
      <div className="divide-y">
        {templates.map((tpl) => (
          <div key={tpl.id} className="flex items-start gap-3 px-5 py-3">
            <div className={cn(
              "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
              tpl.type === "email" ? "bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300" : "bg-green-100 text-green-600 dark:bg-green-950/40 dark:text-green-300"
            )}>
              {TYPE_ICON[tpl.type]}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{tpl.name}</p>
              <p className="text-xs text-muted-foreground">{tpl.trigger}</p>
              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {tpl.delay}
              </div>
            </div>
            <span className={cn(
              "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
              tpl.status === "active"
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-muted text-muted-foreground"
            )}>
              {tpl.status === "active" ? "Actif" : "Inactif"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
