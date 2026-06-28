import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { THEME_META } from "@/design-system/tokens";
import { PROJECT_PRESETS } from "@/config/project-presets";

const DEMOS = [
  { slug: "portfolio",      label: "Portfolio",         description: "Developpeur — corporate-classic" },
  { slug: "saas",           label: "SaaS",              description: "Produit — premium-saas" },
  { slug: "booking",        label: "Booking",           description: "Reservations — local-business" },
  { slug: "api",            label: "API Portal",        description: "Dev — dark-tech-api" },
  { slug: "real-estate",    label: "Immobilier",        description: "Biens — real-estate" },
  { slug: "local-business", label: "Local Business",    description: "Services locaux — local-business" },
  { slug: "auto-blog",      label: "Auto Blog",         description: "Automobile — luxury-auto" },
  { slug: "ecommerce",      label: "E-commerce",        description: "Boutique — ecommerce-clean" },
  { slug: "dashboard",      label: "Dashboard",         description: "Admin — premium-saas" },
];

const COMPONENT_DEMO = {
  slug: "components",
  label: "Components",
  description: "Playground — composants metier",
  accent: "#10b981",
  themeLabel: "Component system",
};

export default function DemoIndexPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <Badge className="mb-6">Demo Gallery</Badge>
      <h1 className="text-4xl font-semibold tracking-tight">10 styles de projets</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Chaque demo montre un theme visuel distinct et une logique produit realiste.
        Un seul boilerplate, plusieurs identites.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DEMOS.map((d) => {
          const preset = PROJECT_PRESETS[d.slug as keyof typeof PROJECT_PRESETS];
          const theme = THEME_META[preset.theme];
          return (
            <Link key={d.slug} href={`/demo/${d.slug}`} className="group block">
              <Card className="h-full transition-shadow hover:shadow-md">
                <div className="h-2 w-full" style={{ background: theme.accent }} />
                <CardHeader className="pt-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{d.label}</CardTitle>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                  <CardDescription>{d.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" size="sm">{theme.label}</Badge>
                </CardContent>
              </Card>
            </Link>
          );
        })}
        <Link href={`/demo/${COMPONENT_DEMO.slug}`} className="group block">
          <Card className="h-full transition-shadow hover:shadow-md">
            <div className="h-2 w-full" style={{ background: COMPONENT_DEMO.accent }} />
            <CardHeader className="pt-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{COMPONENT_DEMO.label}</CardTitle>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <CardDescription>{COMPONENT_DEMO.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="outline" size="sm">{COMPONENT_DEMO.themeLabel}</Badge>
            </CardContent>
          </Card>
        </Link>
      </div>
    </main>
  );
}
