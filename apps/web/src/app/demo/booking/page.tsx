import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, Star, CheckCircle2 } from "lucide-react";
import { HeroSection } from "@/components/sections/hero-section";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { TestimonialSection } from "@/components/sections/testimonial-section";
import { CTASection } from "@/components/sections/cta-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const services = [
  { name: "Massage relaxant", duration: "60 min", price: "75€", available: true },
  { name: "Massage therapeutique", duration: "90 min", price: "110€", available: true },
  { name: "Reflexologie", duration: "45 min", price: "60€", available: false },
  { name: "Soin visage", duration: "60 min", price: "85€", available: true },
];

const testimonials = [
  { quote: "Un moment de detente parfait. Je reviens chaque mois depuis 2 ans.", author: "Marie L.", role: "Cliente reguliere" },
  { quote: "Reservation en ligne super simple et reminders automatiques. Excellent service.", author: "Thomas R.", role: "Nouveau client" },
  { quote: "Professionnelle et a l'ecoute. Je recommande sans hesitation.", author: "Sophie M.", role: "Cliente depuis 3 ans" },
];

const steps = [
  { icon: <CalendarDays className="h-5 w-5" />, title: "Choisissez un creneau", description: "Selectionnez le service, la date et l'heure qui vous conviennent." },
  { icon: <CheckCircle2 className="h-5 w-5" />, title: "Confirmez et payez", description: "Paiement securise par Stripe. Remboursement garanti jusqu'a 24h avant." },
  { icon: <Clock className="h-5 w-5" />, title: "Recevez votre confirmation", description: "Email de confirmation + rappel 24h avant votre rendez-vous." },
];

export default function DemoBookingPage() {
  return (
    <div data-theme="local-business">
      <HeroSection
        variant="split"
        eyebrow="Bien-etre et relaxation"
        title="Prenez soin de vous. On s'occupe du reste."
        description="Massages, soins du visage et reflexologie. Reservez en ligne en 2 minutes. Paiement securise."
        actions={
          <>
            <Button asChild size="lg">
              <Link href="/booking">Reserver maintenant <ArrowRight className="size-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#services">Voir les services</Link>
            </Button>
          </>
        }
        media={
          <div className="border bg-card p-5 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-4 w-4 text-warning fill-warning" />
              <span className="text-sm font-medium">4.9/5 — 124 avis</span>
            </div>
            <div className="grid gap-2">
              {["Lun", "Mar", "Mer", "Jeu", "Ven"].map((d) => (
                <div key={d} className="flex items-center justify-between text-sm border-b pb-2 last:border-0">
                  <span className="text-muted-foreground">{d}</span>
                  <div className="flex gap-1">
                    {["9h", "11h", "14h", "16h"].map((h, i) => (
                      <Badge key={h} variant={i === 1 ? "default" : "outline"} size="sm">{h}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
      />

      <FeatureGrid
        eyebrow="Comment ca marche"
        title="Simple comme bonjour."
        features={steps}
        columns={3}
        variant="icon-left"
        className="border-y bg-muted/30"
      />

      <section id="services" className="bg-background">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold mb-8">Nos services</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((s) => (
              <Card key={s.name} className="flex items-center justify-between p-5">
                <div>
                  <p className="font-semibold">{s.name}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{s.duration}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold">{s.price}</span>
                  <Button size="sm" variant={s.available ? "default" : "ghost"} disabled={!s.available}>
                    {s.available ? "Reserver" : "Complet"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <TestimonialSection eyebrow="Temoignages" title="Ce que disent nos clients." testimonials={testimonials} />

      <CTASection
        variant="muted"
        title="Pret a vous faire du bien ?"
        description="Plus de 300 clients nous font confiance. Premiere seance avec 10% de reduction."
        actions={
          <Button asChild size="lg">
            <Link href="/booking">Prendre rendez-vous <ArrowRight className="size-4" /></Link>
          </Button>
        }
      />
    </div>
  );
}
