"use client";
import React from "react";
import { COMPONENT_REGISTRY, recommendComponents } from "@/lib/component-registry";
import type {
  ComponentDomain,
  ComponentCategory,
  ComponentCapability,
} from "@/lib/component-registry";
import { cn } from "@/lib/utils";

const DOMAINS: { value: ComponentDomain | "all"; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "general", label: "General" },
  { value: "saas", label: "SaaS" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "real-estate", label: "Immobilier" },
  { value: "auto-blog", label: "Auto Blog" },
  { value: "booking", label: "Booking" },
  { value: "dashboard", label: "Dashboard" },
  { value: "api", label: "API Portal" },
  { value: "portfolio", label: "Portfolio" },
];

const MATURITY_COLORS: Record<string, string> = {
  stable: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  beta: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  experimental: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  "demo-only": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
};

function ComponentCard({ cap }: { cap: ComponentCapability }) {
  return (
    <div className="flex flex-col gap-2 border border-border bg-background p-4 text-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-mono font-semibold text-foreground">{cap.name}</p>
          <p className="text-xs text-muted-foreground">{cap.importPath}</p>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-sm px-2 py-0.5 text-xs font-medium",
            MATURITY_COLORS[cap.maturity] ?? "bg-muted text-muted-foreground"
          )}
        >
          {cap.maturity}
        </span>
      </div>
      <p className="text-muted-foreground">{cap.description}</p>
      <div className="flex flex-wrap gap-1">
        {cap.domains.map((d) => (
          <span key={d} className="rounded-sm bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
            {d}
          </span>
        ))}
        <span className="rounded-sm border border-border px-1.5 py-0.5 text-xs text-muted-foreground">
          {cap.category}
        </span>
      </div>
      {cap.limitations.length > 0 && (
        <ul className="mt-1 list-inside list-disc text-xs text-muted-foreground">
          {cap.limitations.map((l, i) => (
            <li key={i}>{l}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ComponentRegistryClient() {
  const [domain, setDomain] = React.useState<ComponentDomain | "all">("all");
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    if (!query && domain === "all") return COMPONENT_REGISTRY;
    if (query) {
      return recommendComponents({
        domain: domain !== "all" ? domain : undefined,
        query: query || undefined,
        limit: 50,
        minMaturity: "demo-only",
      }).map((r) => r.component);
    }
    return COMPONENT_REGISTRY.filter((c) => c.domains.includes(domain as ComponentDomain));
  }, [domain, query]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-10">
        <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Registre
        </p>
        <h1 className="text-3xl font-bold">Component Capability Registry</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Catalogue structure de tous les composants reutilisables du starter.
          Filtrez par domaine ou cherchez par mot-cle pour trouver le bon composant.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          type="search"
          placeholder="Rechercher (booking, filter, table...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-10 w-full max-w-xs border border-border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground sm:w-72"
        />
        <div className="flex flex-wrap gap-2">
          {DOMAINS.map((d) => (
            <button
              key={d.value}
              onClick={() => setDomain(d.value)}
              className={cn(
                "rounded-sm border px-3 py-1.5 text-xs font-medium transition-colors",
                domain === d.value
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground"
              )}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-4 text-xs text-muted-foreground">
        {filtered.length} composant{filtered.length !== 1 ? "s" : ""}
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((cap) => (
          <ComponentCard key={cap.id} cap={cap} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-muted-foreground">
          Aucun composant trouve pour cette recherche.
        </div>
      )}
    </main>
  );
}
