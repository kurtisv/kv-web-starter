import Link from "next/link";
import { ArrowRight, Clock, MapPin, Phone, Star } from "lucide-react";
import { HeroSection } from "@/components/sections/hero-section";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { TestimonialSection } from "@/components/sections/testimonial-section";
import { CTASection } from "@/components/sections/cta-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BusinessHours, type DaySchedule } from "@/components/local-business/business-hours";

const services = [
  { name: "Massage suedois",          duration: "60 min", price: "75€",  description: "Detente profonde, tensions liberees." },
  { name: "Massage aux pierres chaudes", duration: "90 min", price: "110€", description: "Chaleur et relaxation totale." },
  { name: "Soin reflexologie",         duration: "45 min", price: "60€",  description: "Equilibre corps et esprit." },
  { name: "Soin visage naturel",        duration: "60 min", price: "85€",  description: "Ingredients bio et locaux." },
];

const testimonials = [
  { quote: "La meilleure massotherapeute que j'ai trouvee. Je repars a chaque fois completement regeneree.", author: "Camille D.", role: "Cliente depuis 2 ans" },
  { quote: "Ambiance zen, produits naturels. La reservation en ligne est super pratique.", author: "Laurent B.", role: "Client regulier" },
  { quote: "Les soins sont adaptes a mes besoins. Je recommande a toute ma famille.", author: "Isabelle M.", role: "Cliente depuis 1 an" },
];

const features = [
  { icon: <Star className="h-5 w-5" />,   title: "Produits 100% naturels", description: "Huiles essentielles bio, argiles, plantes locales. Rien de synthetique." },
  { icon: <Clock className="h-5 w-5" />,  title: "Flexibilite horaire",    description: "Disponible du lundi au samedi, 9h-19h. Sur rendez-vous uniquement." },
  { icon: <MapPin className="h-5 w-5" />, title: "Acces facile",           description: "Centre-ville, parking gratuit a 100m. Accessible PMR." },
];

const schedule: DaySchedule[] = [
  { day: "Lundi",    open: "9h00", close: "19h00" },
  { day: "Mardi",    open: "9h00", close: "19h00" },
  { day: "Mercredi", open: "9h00", close: "19h00" },
  { day: "Jeudi",    open: "9h00", close: "20h00" },
  { day: "Vendredi", open: "9h00", close: "20h00" },
  { day: "Samedi",   open: "10h00", close: "17h00" },
  { day: "Dimanche", closed: true },
];

export default function DemoLocalBusinessPage() {
  return (
    <div data-theme="local-business">
      <HeroSection
        variant="split"
        eyebrow="Massotherapie & bien-etre"
        title="Votre oasis de detente au coeur de la ville."
        description="Soins naturels personnalises dans un espace calme et bienveillant. Prenez soin de vous — vous le meritez."
        actions={
          <>
            <Button asChild size="lg">
              <Link href="/booking">Reserver un soin <ArrowRight className="size-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#services">Voir les soins</Link>
            </Button>
          </>
        }
        media={
          <div className="rounded-lg border bg-card p-5">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Prochains creneaux
            </p>
            <div className="grid gap-2">
              {["Aujourd'hui 14h30", "Demain 10h00", "Demain 15h00", "Jeudi 11h00"].map(
                (slot, i) => (
                  <div key={slot} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <span className="text-sm">{slot}</span>
                    <Badge variant={i === 0 ? "default" : "outline"} size="sm">
                      {i === 0 ? "1 place" : "Disponible"}
                    </Badge>
                  </div>
                )
              )}
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-sm">
              <Star className="h-4 w-4 fill-warning text-warning" />
              <span className="font-medium">4.9/5</span>
              <span className="text-muted-foreground">(87 avis)</span>
            </div>
          </div>
        }
      />

      <FeatureGrid
        features={features}
        columns={3}
        variant="icon-left"
        className="border-y bg-card"
      />

      <section id="services" className="bg-background">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-8 text-2xl font-semibold">Nos soins</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((s) => (
              <Card key={s.name}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold">{s.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Badge variant="soft" size="sm">
                          <Clock className="h-3 w-3" />
                          {s.duration}
                        </Badge>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-xl font-semibold">{s.price}</p>
                      <Button asChild size="sm" className="mt-2">
                        <Link href="/booking">Reserver</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <TestimonialSection
        eyebrow="Avis clients"
        title="Ils en parlent mieux que nous."
        testimonials={testimonials}
      />

      {/* Infos pratiques + BusinessHours */}
      <section className="border-t bg-card">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Contact info */}
            <div>
              <h3 className="mb-5 text-base font-semibold">Infos pratiques</h3>
              <div className="grid gap-4">
                {[
                  { icon: <MapPin className="h-5 w-5" />, label: "12 rue du Bien-Etre, Lyon 2e" },
                  { icon: <Phone className="h-5 w-5" />,  label: "+33 4 00 00 00 00" },
                ].map((info) => (
                  <div key={info.label} className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-card text-primary">
                      {info.icon}
                    </div>
                    <p className="text-sm">{info.label}</p>
                  </div>
                ))}
                <Button size="lg" className="mt-2 w-full sm:w-auto" asChild>
                  <a href="tel:+33400000000">
                    <Phone className="size-4" /> Appeler maintenant
                  </a>
                </Button>
              </div>
            </div>

            {/* BusinessHours */}
            <div>
              <h3 className="mb-5 text-base font-semibold">Horaires d&apos;ouverture</h3>
              <BusinessHours schedule={schedule} />
            </div>
          </div>
        </div>
      </section>

      <CTASection
        variant="default"
        title="Premiere seance ? -10%"
        description="Offre de bienvenue pour tout nouveau client. Valable sur tous les soins."
        actions={
          <Button asChild size="lg" variant="default">
            <Link href="/booking">
              En profiter <ArrowRight className="size-4" />
            </Link>
          </Button>
        }
      />
    </div>
  );
}
