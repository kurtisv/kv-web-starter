import * as React from "react";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/sections/hero-section";
import { StatsSection } from "@/components/sections/stats-section";
import { CTASection } from "@/components/sections/cta-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FeaturedArticleCard } from "@/components/auto-blog/featured-article-card";
import { ArticleCard } from "@/components/auto-blog/article-card";
import { CarSpecComparison, type CarSpec } from "@/components/auto-blog/car-spec-comparison";
import { AutoBlogCarGrid } from "./auto-blog-client";


const stats = [
  { value: "420+", label: "Fiches voitures" },
  { value: "1.2M", label: "Lecteurs/mois" },
  { value: "150+", label: "Essais realises" },
  { value: "8 ans", label: "D'expertise" },
];

const recentArticles = [
  {
    category: "Comparatif",
    title: "M3 vs C63 AMG vs RS3 : la berline sport ultime 2026",
    excerpt: "Trois philosophies, trois caracteres. Notre test croise de plus de 5 000 km revele la verite sur les berlines sportives.",
    author: "Thomas V.",
    date: "10 juin 2026",
    readMinutes: 12,
    photo: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80&auto=format&fit=crop",
    photoAlt: "BMW M3 Competition",
  },
  {
    category: "Analyse",
    title: "Electriques vs thermiques : bilan objectif 2026",
    excerpt: "Couts reels, infrastructure, plaisir de conduite. Les chiffres qui font mal des deux cotes.",
    author: "Sophie M.",
    date: "5 juin 2026",
    readMinutes: 8,
    photo: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80&auto=format&fit=crop",
    photoAlt: "Voiture electrique charge",
  },
  {
    category: "Guide",
    title: "Comment choisir ses pneus sport pour la piste",
    excerpt: "Michelin Pilot Sport 4S, Pirelli PZero, Continental SportContact — notre protocole de test et nos recommandations par usage.",
    author: "Remi D.",
    date: "1 juin 2026",
    readMinutes: 6,
    photo: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80&auto=format&fit=crop",
    photoAlt: "Pneus sport sur circuit",
  },
];

const comparisonCars: CarSpec[] = [
  {
    make: "Porsche",
    model: "911 GT3",
    year: 2025,
    photo: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80&auto=format&fit=crop",
    score: 9.4,
    specs: {
      moteur: "6 cyl. boxer 4.0 L",
      puissance: "510 ch",
      couple: "470 Nm",
      acceleration: "3.4 s",
      vitesse_max: "318 km/h",
      poids: "1 408 kg",
      prix: "169 000 €",
    },
  },
  {
    make: "BMW",
    model: "M4 CSL",
    year: 2025,
    photo: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&q=80&auto=format&fit=crop",
    score: 9.1,
    specs: {
      moteur: "6 cyl. en ligne 3.0 L",
      puissance: "551 ch",
      couple: "650 Nm",
      acceleration: "3.7 s",
      vitesse_max: "307 km/h",
      poids: "1 625 kg",
      prix: "142 000 €",
    },
  },
  {
    make: "Ferrari",
    model: "296 GTB",
    year: 2024,
    photo: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=400&q=80&auto=format&fit=crop",
    score: 9.7,
    specs: {
      moteur: "V6 hybride 3.0 L",
      puissance: "830 ch",
      couple: "740 Nm",
      acceleration: "2.9 s",
      vitesse_max: "330 km/h",
      poids: "1 470 kg",
      prix: "286 000 €",
    },
  },
];

const specLabels: Record<string, string> = {
  moteur: "Moteur",
  puissance: "Puissance",
  couple: "Couple",
  acceleration: "0-100 km/h",
  vitesse_max: "Vitesse max",
  poids: "Poids",
  prix: "Prix catalogue",
};

const winnerKey: Record<string, number> = {
  puissance: 2,
  acceleration: 2,
  vitesse_max: 2,
  poids: 0,
  prix: 1,
};

export default function DemoAutoBlogPage() {
  return (
    <div data-theme="luxury-auto" className="bg-profile-dark-depth">
      <HeroSection
        variant="dark"
        videoSrc="/videos/themes/luxury-auto-bg.mp4"
        eyebrow="Passion automobile"
        title={<span className="text-gradient-editorial">La voiture, sans compromis.</span>}
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

      {/* Essai en vedette */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-6 flex items-center gap-3">
            <h2 className="text-2xl font-semibold">Essai de la semaine</h2>
            <Badge variant="soft" size="sm">Exclusif</Badge>
          </div>
          <FeaturedArticleCard
            category="Essai"
            title="Porsche 911 GT3 2025 : la perfection sur piste"
            excerpt="510 chevaux atmospheriques, boite manuelle ou PDK, ailerons actifs. Apres 3 000 km dont 2 sessions circuit, notre verdict est sans appel : la GT3 reste la reference absolue des sportives routieres."
            author="Pierre L."
            date="14 juin 2026"
            readMinutes={15}
            score={9.4}
            photo="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80&auto=format&fit=crop"
            photoAlt="Porsche 911 GT3 sur circuit"
          />
        </div>
      </section>

      {/* Derniers articles */}
      <section className="border-y bg-card">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Derniers articles</h2>
            <Button variant="outline" size="sm">
              Tous les articles <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {recentArticles.map((a) => (
              <ArticleCard key={a.title} {...a} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparatif technique */}
      <section className="border-b bg-background">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Comparatif technique</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              911 GT3 vs M4 CSL vs 296 GTB — specs detaillees cote a cote.
            </p>
          </div>
          <CarSpecComparison
            cars={comparisonCars}
            specLabels={specLabels}
            winnerKey={winnerKey}
          />
        </div>
      </section>

      {/* Fiches voitures — FilterBar (client) + RatingStars + formatPrice */}
      <section className="border-b bg-card">
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
