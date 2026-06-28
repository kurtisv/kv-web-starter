import type { Metadata } from "next";

import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Badge } from "@/components/ui/badge";
import { ComponentsDemoClient } from "./components-demo-client";

export const metadata: Metadata = {
  title: "Demo composants",
  description: "Playground des composants metier reutilisables de KV Web Starter.",
};

export default function ComponentsDemoPage() {
  return (
    <MarketingPageShell>
      <main>
        <section className="border-b theme-hero">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <Badge className="mb-5 border-background/20 bg-background/10 text-background">
              Component Playground
            </Badge>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
              Les composants metier du boilerplate.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 opacity-70">
              Dashboard, API portal et e-commerce: les blocs reutilisables sont visibles au meme endroit.
            </p>
          </div>
        </section>

        <ComponentsDemoClient />
      </main>
    </MarketingPageShell>
  );
}
