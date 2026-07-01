export type Industry =
  | "saas"
  | "booking"
  | "ecommerce"
  | "real-estate"
  | "api"
  | "dashboard"
  | "portfolio"
  | "local-business"
  | "auto-blog";

export const INDUSTRIES: { id: Industry; label: string }[] = [
  { id: "saas", label: "SaaS / Logiciel" },
  { id: "booking", label: "Reservation / RDV" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "real-estate", label: "Immobilier" },
  { id: "api", label: "API / Dev Tools" },
  { id: "dashboard", label: "Dashboard / Analytics" },
  { id: "portfolio", label: "Portfolio / Agence" },
  { id: "local-business", label: "Commerce local" },
  { id: "auto-blog", label: "Auto / Editorial" },
];

export const VALID_INDUSTRIES = new Set<string>(INDUSTRIES.map((i) => i.id));

export function isIndustry(v: string): v is Industry {
  return VALID_INDUSTRIES.has(v);
}

export interface ClientManifest {
  name: string;
  tagline: string;
  industry: Industry;
  primaryColor: string;
  designProfile: string;
  mode: "light" | "dark";
  selectedFeatures: string[];
  recommendedDemoSlug: string;
  generatedAt: string;
}
