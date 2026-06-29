import type { Metadata } from "next";
import { MarketingPageShell } from "@/components/marketing/page-shell";
import { ShowcaseClient } from "./showcase-client";

export const metadata: Metadata = {
  title: "Composants | KV Web Starter",
  description:
    "130+ composants production-ready — UI, Dashboard, API Portal, E-commerce, SaaS, Booking, 3D. Copiez. Collez. Livrez.",
};

export default function ShowcasePage() {
  return (
    <MarketingPageShell>
      <ShowcaseClient />
    </MarketingPageShell>
  );
}
