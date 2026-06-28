import { Badge } from "@/components/ui/badge";
import { HttpMethodBadge } from "./http-method-badge";

export interface RequestLogEntry {
  id: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  status: number;
  durationMs: number;
  createdAt: string;
}

export function RequestLogViewer({ entries }: { entries: RequestLogEntry[] }) {
  if (entries.length === 0) {
    return <p className="border bg-muted/20 p-4 text-sm text-muted-foreground">Aucune requete recente.</p>;
  }

  return (
    <div className="overflow-hidden border">
      <div className="grid grid-cols-[auto_1fr_auto_auto] gap-3 border-b bg-muted/40 px-3 py-2 text-xs font-medium text-muted-foreground">
        <span>Methode</span>
        <span>Route</span>
        <span>Statut</span>
        <span>Duree</span>
      </div>
      {entries.map((entry) => (
        <div key={entry.id} className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 border-b px-3 py-2 text-sm last:border-b-0">
          <HttpMethodBadge method={entry.method} />
          <div className="min-w-0">
            <p className="truncate font-mono text-xs">{entry.path}</p>
            <p className="text-[10px] text-muted-foreground">{entry.createdAt}</p>
          </div>
          <Badge variant={entry.status >= 400 ? "destructive" : "success"}>{entry.status}</Badge>
          <span className="text-xs text-muted-foreground">{entry.durationMs}ms</span>
        </div>
      ))}
    </div>
  );
}
