"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import { HeroSection } from "@/components/sections/hero-section";
import { CTASection } from "@/components/sections/cta-section";
import { StatsSection } from "@/components/sections/stats-section";
import { Button } from "@/components/ui/button";
import { PropertyCard, type PropertyItem } from "@/components/real-estate/property-card";
import { MortgageCalculator } from "@/components/real-estate/mortgage-calculator";
import { AgentProfileCard } from "@/components/real-estate/agent-profile-card";
import { NeighborhoodScoreCard, type NeighborhoodScoreCardProps } from "@/components/real-estate/neighborhood-score-card";
import { ConfigurableFilterBar } from "@/components/component-variables";
import { realEstateVariables } from "@/lib/component-variables/presets";

// ── Property data with filterable fields ─────────────────────────────────────
interface EnrichedProperty extends PropertyItem {
  priceValue: number;
  roomCount: number;
  typeKey: string;
}

const ALL_PROPERTIES: EnrichedProperty[] = [
  {
    id: "p1",
    type: "Appartement", typeKey: "appartement",
    location: "Paris 11e",
    price: "425 000 €",    priceValue: 425000,
    size: "65 m²",
    rooms: "3 pieces",     roomCount: 3,
    score: 8.4,
    yieldPct: "4.2%",
    status: "Disponible",
    photo: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "p2",
    type: "Maison", typeKey: "maison",
    location: "Boulogne-Billancourt",
    price: "890 000 €",    priceValue: 890000,
    size: "140 m²",
    rooms: "5 pieces",     roomCount: 5,
    score: 9.1,
    yieldPct: "3.8%",
    status: "Sous compromis",
    photo: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "p3",
    type: "Studio", typeKey: "studio",
    location: "Paris 5e",
    price: "215 000 €",    priceValue: 215000,
    size: "28 m²",
    rooms: "1 piece",      roomCount: 1,
    score: 7.9,
    yieldPct: "5.1%",
    status: "Disponible",
    photo: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "p4",
    type: "Loft", typeKey: "loft",
    location: "Montreuil",
    price: "380 000 €",    priceValue: 380000,
    size: "90 m²",
    rooms: "3 pieces",     roomCount: 3,
    score: 8.7,
    yieldPct: "4.6%",
    status: "Disponible",
    photo: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80&auto=format&fit=crop",
  },
];

const agents = [
  {
    name: "Sophie Lefort",
    role: "Conseillere immobiliere senior",
    rating: 4.9,
    reviewCount: 87,
    deals: 124,
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&q=80&auto=format&fit=crop&crop=face",
  },
  {
    name: "Marc Dubois",
    role: "Specialiste investissement locatif",
    rating: 4.7,
    reviewCount: 52,
    deals: 78,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&q=80&auto=format&fit=crop&crop=face",
  },
];

const stats = [
  { value: "340+", label: "Biens disponibles" },
  { value: "4.6%", label: "Rendement moyen" },
  { value: "18j",  label: "Delai de vente moyen" },
  { value: "98%",  label: "Clients satisfaits" },
];

const neighborhoods: NeighborhoodScoreCardProps[] = [
  {
    name: "Marais — Bastille",
    district: "Paris 3e / 11e",
    overallScore: 9.2,
    avgPricePerSqm: "12 400 €/m²",
    criteria: [
      { label: "Transports", score: 9.5 },
      { label: "Commerces & restaurants", score: 9.8 },
      { label: "Ecoles", score: 8.4 },
      { label: "Parcs & espaces verts", score: 6.2 },
      { label: "Securite", score: 8.1 },
    ],
  },
  {
    name: "Nation — Vincennes",
    district: "Paris 12e / Val-de-Marne",
    overallScore: 8.4,
    avgPricePerSqm: "8 200 €/m²",
    criteria: [
      { label: "Transports", score: 8.8 },
      { label: "Commerces & restaurants", score: 7.9 },
      { label: "Ecoles", score: 8.6 },
      { label: "Parcs & espaces verts", score: 9.1 },
      { label: "Securite", score: 8.5 },
    ],
  },
  {
    name: "Montrouge — Malakoff",
    district: "Hauts-de-Seine",
    overallScore: 7.8,
    avgPricePerSqm: "6 800 €/m²",
    criteria: [
      { label: "Transports", score: 7.4 },
      { label: "Commerces & restaurants", score: 7.6 },
      { label: "Ecoles", score: 8.2 },
      { label: "Parcs & espaces verts", score: 7.9 },
      { label: "Securite", score: 8.8 },
    ],
  },
];

// ── Filtered property grid (reads URL params written by ConfigurableFilterBar) ─
function PropertyGrid() {
  const searchParams = useSearchParams();

  const search       = (searchParams.get("search") ?? "").toLowerCase();
  const propertyType = searchParams.get("type") ?? "all";
  const minPrice     = Number(searchParams.get("minPrice") ?? "0");
  const maxPrice     = Number(searchParams.get("maxPrice") ?? "2000000");
  const rooms        = searchParams.get("rooms") ?? "all";

  const filtered = ALL_PROPERTIES.filter((p) => {
    const matchSearch   = !search   || p.location.toLowerCase().includes(search) || p.type.toLowerCase().includes(search);
    const matchType     = propertyType === "all" || p.typeKey === propertyType;
    const matchPrice    = p.priceValue >= minPrice && p.priceValue <= maxPrice;
    const matchRooms    = rooms === "all" || (rooms === "4" ? p.roomCount >= 4 : p.roomCount === Number(rooms));
    return matchSearch && matchType && matchPrice && matchRooms;
  });

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Biens disponibles</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {filtered.length} resultat{filtered.length !== 1 ? "s" : ""} — tries par score de quartier
            </p>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-muted-foreground">Aucun bien ne correspond a votre recherche.</p>
            <p className="mt-1 text-xs text-muted-foreground">Essayez d&apos;elargir les criteres de filtre.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {filtered.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}

        {filtered.length > 0 && (
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg">
              Voir tous les biens <ArrowRight className="size-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function DemoRealEstatePage() {
  return (
    <div data-theme="real-estate" className="bg-profile-soft-gradient">
      <HeroSection
        variant="dark"
        videoSrc="/videos/themes/real-estate-bg.mp4"
        eyebrow="Immobilier premium"
        title="Investissez au bon endroit."
        description="Biens selectionnes, scores de quartier, rendements calcules. L'immobilier rendu simple."
        actions={
          <>
            <Button size="lg" className="theme-hero-btn-primary">
              <Search className="size-4" /> Rechercher un bien
            </Button>
            <Button size="lg" variant="glass">
              Estimer mon bien
            </Button>
          </>
        }
        media={
          <div className="grid grid-cols-2 gap-px border border-background/10 bg-background/10">
            {stats.map((s) => (
              <div key={s.label} className="bg-foreground px-5 py-4">
                <div className="text-2xl font-semibold">{s.value}</div>
                <div className="mt-0.5 text-xs opacity-50">{s.label}</div>
              </div>
            ))}
          </div>
        }
      />

      <StatsSection stats={stats} variant="strip" />

      {/* Variable-driven search bar — replaces static PropertySearchBar */}
      <section className="border-b bg-background">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <Suspense>
            <ConfigurableFilterBar variables={realEstateVariables} />
          </Suspense>
        </div>
      </section>

      {/* Filtered property grid */}
      <Suspense
        fallback={
          <section className="bg-background">
            <div className="mx-auto max-w-6xl px-6 py-12">
              <div className="grid gap-4 sm:grid-cols-2">
                {ALL_PROPERTIES.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </div>
          </section>
        }
      >
        <PropertyGrid />
      </Suspense>

      {/* Scores de quartier */}
      <section className="border-y bg-card">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Scores de quartier</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Transports, commerces, ecoles, parcs et securite — notes sur 10 par secteur.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {neighborhoods.map((n) => (
              <NeighborhoodScoreCard key={n.name} {...n} />
            ))}
          </div>
        </div>
      </section>

      {/* MortgageCalculator + AgentProfileCard */}
      <section className="border-y bg-card">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="mb-8 text-xl font-semibold">Outils et conseillers</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <MortgageCalculator defaultPrice={425000} />

            <div>
              <p className="mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Nos conseillers
              </p>
              <div className="grid gap-3">
                {agents.map((agent) => (
                  <AgentProfileCard
                    key={agent.name}
                    agent={agent}
                    onContact={() => {}}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        variant="muted"
        title="Planifiez une visite."
        description="Nos conseillers sont disponibles 7j/7 pour vous accompagner dans votre projet."
        actions={
          <Button asChild size="lg">
            <Link href="/booking">
              Prendre rendez-vous <ArrowRight className="size-4" />
            </Link>
          </Button>
        }
      />
    </div>
  );
}
