import { FileText, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface IntakeField {
  label: string;
  type: "radio" | "textarea" | "checkbox";
  options?: string[];
}

interface IntakeFormPreviewProps {
  title: string;
  fields: IntakeField[];
  answers?: Record<string, string | boolean>;
  consentAt?: string;
  className?: string;
}

export function IntakeFormPreview({ title, fields, answers = {}, consentAt, className }: IntakeFormPreviewProps) {
  return (
    <div className={cn("rounded-xl border bg-card shadow-sm overflow-hidden", className)}>
      <div className="flex items-center gap-2 border-b px-5 py-4">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <p className="text-sm font-medium">{title}</p>
        {consentAt && (
          <span className="ml-auto rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
            Signe le {consentAt}
          </span>
        )}
      </div>
      <div className="divide-y px-5">
        {fields.map((field) => {
          const answer = answers[field.label];
          return (
            <div key={field.label} className="py-3">
              <p className="text-xs font-medium text-muted-foreground mb-1">{field.label}</p>
              {field.type === "checkbox" ? (
                <div className="flex items-center gap-2 text-sm">
                  {answer ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className={cn(answer ? "text-green-700 dark:text-green-400" : "text-muted-foreground")}>
                    {answer ? "Accepte" : "Non rempli"}
                  </span>
                </div>
              ) : answer ? (
                <p className="text-sm">{String(answer)}</p>
              ) : (
                <p className="text-sm text-muted-foreground italic">Non rempli</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
