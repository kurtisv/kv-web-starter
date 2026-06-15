import Link from "next/link";
import { ArrowRight, MapPin, TrendingUp, Home, Search, Star, Building2, LayoutDashboard, Columns2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { HeroSection } from "@/components/sections/hero-section";
import { CTASection } from "@/components/sections/cta-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const properties: {
  type: string; location: string; price: string; size: string;
  rooms: string; score: number; yield: string; status: string;
  Icon: LucideIcon; bg: string; iconColor: string;
}[] = [
  { type: "Appartement", location: "Paris 11e",            price: "425 000 €", size: "65 m²",  rooms: "3 pieces", score: 8.4, yield: "4.2%", status: "Disponible",     Icon: Building2,       bg: "linear-gradient(135deg,#eff6ff,#dbeafe)", iconColor: "#1d4ed8" },
  { type: "Maison",      location: "Boulogne-Billancourt", price: "890 000 €", size: "140 m²", rooms: "5 pieces", score: 9.1, yield: "3.8%", status: "Sous compromis", Icon: Home,            bg: "linear-gradient(135deg,#f0fdf4,#dcfce7)", iconColor: "#15803d" },
  { type: "Studio",      location: "Paris 5e",             price: "215 000 €", size: "28 m²",  rooms: "1 piece",  score: 7.9, yield: "5.1%", status: "Disponible",     Icon: LayoutDashboard, bg: "linear-gradient(135deg,#faf5ff,#ede9fe)", iconColor: "#7c3aed" },
  { type: "Loft",        location: "Montreuil",            price: "380 000 €", size: "90 m²",  rooms: "3 pieces", score: 8.7, yield: "4.6%", status: "Disponible",     Icon: Columns2,        bg: "linear-gradient(135deg,#fff7ed,#fed7aa)", iconColor: "#c2410c" },
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
                <div className="relative h-40 border-b flex flex-col items-center justify-center gap-2 overflow-hidden" style={{ background: p.bg }}>
                  <p.Icon className="h-16 w-16 opacity-70" style={{ color: p.iconColor }} strokeWidth={1} />
                  <div className="absolute bottom-2 left-3 flex items-center gap-1 rounded bg-white/70 px-2 py-0.5 text-xs font-medium backdrop-blur-sm" style={{ color: p.iconColor }}>
                    <MapPin className="h-3 w-3" />{p.location}
                  </div>
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
