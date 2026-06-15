import Link from "next/link";
import { ArrowRight, MapPin, TrendingUp, Home, Search, Star } from "lucide-react";
import { HeroSection } from "@/components/sections/hero-section";
import { CTASection } from "@/components/sections/cta-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const properties = [
  {
    type: "Appartement",
    location: "Paris 11e",
    price: "425 000 €",
    size: "65 m²",
    rooms: "3 pieces",
    score: 8.4,
    yield: "4.2%",
    status: "Disponible",
  },
  {
    type: "Maison",
    location: "Boulogne-Billancourt",
    price: "890 000 €",
    size: "140 m²",
    rooms: "5 pieces",
    score: 9.1,
    yield: "3.8%",
    status: "Sous compromis",
  },
  {
    type: "Studio",
    location: "Paris 5e",
    price: "215 000 €",
    size: "28 m²",
    rooms: "1 piece",
    score: 7.9,
    yield: "5.1%",
    status: "Disponible",
  },
  {
    type: "Loft",
    location: "Montreuil",
    price: "380 000 €",
    size: "90 m²",
    rooms: "3 pieces",
    score: 8.7,
    yield: "4.6%",
    status: "Disponible",
  },
];

const stats = [
  { value: "340+", label: "Biens disponibles" },
  { value: "4.6%", label: "Rendement moyen" },
  { value: "18j", label: "Delai de vente moyen" },
  { value: "98%", label: "Clients satisfaits" },
];

export default function DemoRealEstatePage() {
  return (
    <div data-theme="real-estate">
      <HeroSection
        variant="dark"
        eyebrow="Immobilier premium"
        title="Investissez au bon endroit."
        description="Biens selectionnes, scores de quartier, rendements calcules. L'immobilier rendu simple."
        actions={
          <>
            <Button size="lg" className="bg-background text-foreground hover:bg-background/90">
              <Search className="size-4" /> Rechercher un bien
            </Button>
            <Button size="lg" variant="glass">
              Estimer mon bien
            </Button>
          </>
        }
        media={
          <div className="grid grid-cols-2 gap-px bg-background/10 border border-background/10">
            {stats.map((s) => (
              <div key={s.label} className="bg-foreground px-5 py-4">
                <div className="text-2xl font-semibold">{s.value}</div>
                <div className="text-xs opacity-50 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        }
      />

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold">Biens disponibles</h2>
              <p className="text-sm text-muted-foreground mt-1">340 resultats — tries par score de quartier</p>
            </div>
            <div className="flex gap-2">
              {["Appartement", "Maison", "Studio"].map((t) => (
                <Badge key={t} variant="outline">{t}</Badge>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {properties.map((p) => (
              <Card key={p.location + p.type} className="overflow-hidden">
                <div className="h-40 bg-muted flex items-center justify-center border-b">
                  <Home className="h-12 w-12 text-muted-foreground/30" />
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Badge variant="soft" size="sm">{p.type}</Badge>
                      <p className="font-semibold mt-2">{p.price}</p>
                      <div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        {p.location}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1 text-success text-sm font-medium">
                        <TrendingUp className="h-3.5 w-3.5" />
                        {p.yield}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">rendement brut</div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t pt-3">
                    <div className="flex gap-3 text-xs text-muted-foreground">
                      <span>{p.size}</span>
                      <span>{p.rooms}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Badge variant={p.status === "Disponible" ? "success" : "warning"} size="sm">
                        {p.status}
                      </Badge>
                      <div className="flex items-center gap-0.5 text-xs font-medium">
                        <Star className="h-3 w-3 text-warning fill-warning" />
                        {p.score}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" size="lg">Voir tous les biens <ArrowRight className="size-4" /></Button>
          </div>
        </div>
      </section>

      <CTASection
        variant="muted"
        title="Planifiez une visite."
        description="Nos conseillers sont disponibles 7j/7 pour vous accompagner dans votre projet."
        actions={
          <Button asChild size="lg">
            <Link href="/booking">Prendre rendez-vous <ArrowRight className="size-4" /></Link>
          </Button>
        }
      />
    </div>
  );
}
