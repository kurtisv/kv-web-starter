import * as React from "react";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/sections/hero-section";
import { StatsSection } from "@/components/sections/stats-section";
import { CTASection } from "@/components/sections/cta-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AutoBlogCarGrid } from "./auto-blog-client";

const articles = [
  { title: "Essai Porsche 911 GT3 2025 : la perfection sur piste", date: "14 juin 2026", category: "Essai" },
  { title: "Comparatif : M3 vs C63 AMG vs RS3",                   date: "10 juin 2026", category: "Comparatif" },
  { title: "Electriques vs thermiques : le bilan 2026",            date: "5 juin 2026",  category: "Analyse" },
];

const stats = [
  { value: "420+", label: "Fiches voitures" },
  { value: "1.2M", label: "Lecteurs/mois" },
  { value: "150+", label: "Essais realises" },
  { value: "8 ans", label: "D'expertise" },
];

export default function DemoAutoBlogPage() {
  return (
    <div data-theme="luxury-auto">
      <HeroSection
        variant="dark"
        videoSrc="/videos/themes/luxury-auto-bg.mp4"
        eyebrow="Passion automobile"
        title="La voiture, sans compromis."
        description="Fiches techniques exhaustives, essais exigeants, comparatifs objectifs. Pour les vrais passionnes."
        actions={
          <>
            <Button size="lg" className="bg-primary text-primary-foreground">
              Voir les fiches <ArrowRight className="size-4" />
            </Button>
            <Button size="lg" variant="glass">
              Derniers essais
            </Button>
          </>
        }
      />

      <StatsSection stats={stats} variant="dark" />

      {/* Fiches voitures — FilterBar (client) + RatingStars + formatPrice */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-semibold">Fiches voitures</h2>
              <Badge variant="outline" size="sm" className="font-mono text-[10px]">client</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              FilterBar filtre les resultats en temps reel via les params URL.
              RatingStars et formatPrice sont appliques a chaque fiche.
            </p>
          </div>

          <React.Suspense fallback={<div className="py-8 text-center text-sm text-muted-foreground">Chargement...</div>}>
            <AutoBlogCarGrid />
          </React.Suspense>
        </div>
      </section>

      {/* Derniers articles */}
      <section className="border-y bg-card">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-xl font-semibold mb-6">Derniers articles</h2>
          <div className="grid gap-4">
            {articles.map((a) => (
              <div key={a.title} className="flex items-center justify-between border-b pb-4 last:border-0">
                <div>
                  <Badge variant="outline" size="sm" className="mb-1.5">{a.category}</Badge>
                  <p className="font-medium">{a.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.date}</p>
                </div>
                <Button variant="ghost" size="icon"><ArrowRight className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        variant="dark"
        title="Ne ratez aucun essai."
        description="Newsletter hebdomadaire. 12 000 abonnes passionnes."
        actions={
          <Button size="lg" variant="outline" className="border-background/30 text-background hover:bg-background/10 hover:text-background">
            S&apos;abonner gratuitement <ArrowRight className="size-4" />
          </Button>
        }
      />
    </div>
  );
}
