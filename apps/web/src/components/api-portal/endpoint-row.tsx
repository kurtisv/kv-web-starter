import * as React from "react";
import { cn } from "@/lib/utils";
import { HttpMethodBadge } from "./http-method-badge";

export interface EndpointDef {
  method: string;
  path: string;
  auth: boolean;
  description?: string;
  deprecated?: boolean;
}

interface EndpointRowProps extends EndpointDef {
  className?: string;
}

export function EndpointRow({ method, path, auth, description, deprecated, className }: EndpointRowProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3 border bg-background px-5 py-4",
        deprecated && "opacity-50",
        className
      )}
    >
      <HttpMethodBadge method={method} />
      <code className="flex-1 font-mono text-sm">{path}</code>
      <span
        className={cn(
          "shrink-0 border px-2 py-0.5 text-[11px] font-medium",
          auth
            ? "border-foreground/30 bg-foreground/5 text-foreground"
            : "border-border bg-muted text-muted-foreground"
        )}
      >
        {auth ? "Auth requise" : "Public"}
      </span>
      {description && (
        <span className="w-full text-sm text-muted-foreground md:w-auto md:flex-1">
          {description}
        </span>
      )}
      {deprecated && (
        <span className="w-full text-xs text-muted-foreground italic md:w-auto">
          Deprecated
        </span>
      )}
    </div>
  );
}

export function EndpointList({
  endpoints,
  className,
}: {
  endpoints: EndpointDef[];
  className?: string;
}) {
  return (
    <div className={cn("grid gap-2", className)}>
      {endpoints.map((ep) => (
        <EndpointRow key={`${ep.method}-${ep.path}`} {...ep} />
      ))}
    </div>
  );
}
