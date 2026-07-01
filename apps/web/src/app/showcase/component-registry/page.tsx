import type { Metadata } from "next";
import { MarketingPageShell } from "@/components/marketing/page-shell";
import { ComponentRegistryClient } from "./component-registry-client";

export const metadata: Metadata = {
  title: "Component Registry | KV Web Starter",
  description:
    "Catalogue des composants reutilisables — domaines, categories, maturite et recommandations.",
};

export default function ComponentRegistryPage() {
  return (
    <MarketingPageShell>
      <ComponentRegistryClient />
    </MarketingPageShell>
  );
}
