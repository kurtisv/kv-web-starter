import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { HeroSection } from "@/components/sections/hero-section";
import { CTASection } from "@/components/sections/cta-section";
import { StatsSection } from "@/components/sections/stats-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PropertyCard, type PropertyItem } from "@/components/real-estate/property-card";
import { MortgageCalculator } from "@/components/real-estate/mortgage-calculator";
import { AgentProfileCard } from "@/components/real-estate/agent-profile-card";

const properties: PropertyItem[] = [
  {
    id: "p1",
    type: "Appartement",
    location: "Paris 11e",
    price: "425 000 €",
    size: "65 m²",
    rooms: "3 pieces",
    score: 8.4,
    yieldPct: "4.2%",
    status: "Disponible",
    photo: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "p2",
    type: "Maison",
    location: "Boulogne-Billancourt",
    price: "890 000 €",
    size: "140 m²",
    rooms: "5 pieces",
    score: 9.1,
    yieldPct: "3.8%",
    status: "Sous compromis",
    photo: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "p3",
    type: "Studio",
    location: "Paris 5e",
    price: "215 000 €",
    size: "28 m²",
    rooms: "1 piece",
    score: 7.9,
    yieldPct: "5.1%",
    status: "Disponible",
    photo: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "p4",
    type: "Loft",
    location: "Montreuil",
    price: "380 000 €",
    size: "90 m²",
    rooms: "3 pieces",
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

export default function DemoRealEstatePage() {
  return (
    <div data-theme="real-estate">
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

      {/* PropertyCard grid */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Biens disponibles</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                340 resultats — tries par score de quartier
              </p>
            </div>
            <div className="flex gap-2">
              {["Appartement", "Maison", "Studio"].map((t) => (
                <Badge key={t} variant="outline">{t}</Badge>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {properties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" size="lg">
              Voir tous les biens <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* MortgageCalculator + AgentProfileCard */}
      <section className="border-y bg-muted/20">
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
