import { ArrowRight, Gauge, Zap, Calendar } from "lucide-react";
import { HeroSection } from "@/components/sections/hero-section";
import { StatsSection } from "@/components/sections/stats-section";
import { CTASection } from "@/components/sections/cta-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const cars = [
  { make: "Porsche", model: "911 GT3",        year: 2025, power: "510 ch", acceleration: "3.4s", price: "168 900 €", category: "Sport",        score: 9.4, accentColor: "#ef4444", bgFrom: "#1c1917", bgTo: "#292524" },
  { make: "BMW",     model: "M3 Competition", year: 2024, power: "510 ch", acceleration: "3.9s", price: "98 700 €",  category: "Berline sport", score: 9.1, accentColor: "#3b82f6", bgFrom: "#0f172a", bgTo: "#1e293b" },
  { make: "Ferrari", model: "296 GTB",        year: 2024, power: "830 ch", acceleration: "2.9s", price: "286 000 €", category: "Supercar",      score: 9.7, accentColor: "#ef4444", bgFrom: "#1a0a0a", bgTo: "#2d1212" },
  { make: "Audi",    model: "RS6 Avant",      year: 2025, power: "630 ch", acceleration: "3.4s", price: "134 000 €", category: "Break sport",   score: 8.9, accentColor: "#a1a1aa", bgFrom: "#18181b", bgTo: "#27272a" },
];

const articles = [
  { title: "Essai Porsche 911 GT3 2025: la perfection sur piste", date: "14 juin 2025", category: "Essai" },
  { title: "Comparatif: M3 vs C63 AMG vs RS3", date: "10 juin 2025", category: "Comparatif" },
  { title: "Electriques vs thermiques: le bilan 2025", date: "5 juin 2025", category: "Analyse" },
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

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">Fiches voitures</h2>
            <div className="flex gap-2">
              {["Sport", "Berline", "SUV", "Supercar"].map((c) => (
                <Badge key={c} variant="outline" size="sm">{c}</Badge>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {cars.map((car) => (
              <Card key={car.make + car.model} className="overflow-hidden">
                <div
                  className="relative h-44 border-b flex items-end p-4 overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${car.bgFrom}, ${car.bgTo})` }}
                >
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: car.accentColor }} />
                  {/* Make name watermark */}
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 select-none text-6xl font-black leading-none" style={{ color: "rgba(255,255,255,0.04)" }}>
                    {car.make}
                  </span>
                  {/* Gauge circle */}
                  <div className="absolute right-4 top-4 h-14 w-14 rounded-full border-2 flex flex-col items-center justify-center" style={{ borderColor: car.accentColor + "60" }}>
                    <Gauge className="h-5 w-5" style={{ color: car.accentColor }} />
                    <span className="text-[10px] font-bold mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>{car.acceleration}</span>
                  </div>
                  <Badge variant="soft" size="sm">{car.category}</Badge>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">{car.make}</p>
                      <p className="text-lg font-semibold">{car.model}</p>
                      <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Zap className="h-3.5 w-3.5" />{car.power}</span>
                        <span className="flex items-center gap-1"><Gauge className="h-3.5 w-3.5" />{car.acceleration}</span>
                        <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{car.year}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-lg font-semibold">{car.price}</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-xs text-muted-foreground">Score</span>
                        <Badge variant="soft" size="sm">{car.score}/10</Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4 w-full">
                    Lire la fiche complete <ArrowRight className="size-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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
