import Link from "next/link";
import { ArrowRight, Clock, MapPin, Phone, Star } from "lucide-react";
import { HeroSection } from "@/components/sections/hero-section";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { TestimonialSection } from "@/components/sections/testimonial-section";
import { CTASection } from "@/components/sections/cta-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  { name: "Massage suedois", duration: "60 min", price: "75€", description: "Detente profonde, tensions liberees." },
  { name: "Massage aux pierres chaudes", duration: "90 min", price: "110€", description: "Chaleur et relaxation totale." },
  { name: "Soin reflexologie", duration: "45 min", price: "60€", description: "Equilibre corps et esprit." },
  { name: "Soin visage naturel", duration: "60 min", price: "85€", description: "Ingredients bio et locaux." },
];

const testimonials = [
  { quote: "La meilleure massotherapeute que j'ai trouvee. Je repars a chaque fois completement regeneree.", author: "Camille D.", role: "Cliente depuis 2 ans" },
  { quote: "Ambiance zen, produits naturels. La Réservation en ligne est super pratique.", author: "Laurent B.", role: "Client regulier" },
  { quote: "Les soins sont adaptes a mes besoins. Je recommande a toute ma famille.", author: "Isabelle M.", role: "Cliente depuis 1 an" },
];

const features = [
  { icon: <Star className="h-5 w-5" />, title: "Produits 100% naturels", description: "Huiles essentielles bio, argiles, plantes locales. Rien de synthetique." },
  { icon: <Clock className="h-5 w-5" />, title: "flexibilité horaire", description: "Disponible du lundi au samedi, 9h-19h. Sur rendez-vous uniquement." },
  { icon: <MapPin className="h-5 w-5" />, title: "Accès facile", description: "Centre-ville, parking gratuit a 100m. Accessible PMR." },
];

export default function DemoLocalBusinessPage() {
  return (
    <div data-theme="local-business">
      <HeroSection
        variant="split"
        eyebrow="Massotherapie & bien-etre"
        title="Votre oasis de detente au coeur de la ville."
        description="Soins naturels personnalisés dans un espace calme et bienveillant. Prenez soin de vous — vous le meritez."
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
          <div className="border rounded-lg bg-card p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3">Prochains créneaux</p>
            <div className="grid gap-2">
              {["Aujourd'hui 14h30", "Demain 10h00", "Demain 15h00", "Jeudi 11h00"].map((slot, i) => (
                <div key={slot} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <span className="text-sm">{slot}</span>
                  <Badge variant={i === 0 ? "default" : "outline"} size="sm">{i === 0 ? "1 place" : "Disponible"}</Badge>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-sm">
              <Star className="h-4 w-4 text-warning fill-warning" />
              <span className="font-medium">4.9/5</span>
              <span className="text-muted-foreground">(87 avis)</span>
            </div>
          </div>
        }
      />

      <FeatureGrid features={features} columns={3} variant="icon-left" className="border-y bg-muted/30" />

      <section id="services" className="bg-background">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold mb-8">Nos soins</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((s) => (
              <Card key={s.name}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold">{s.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">{s.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="soft" size="sm"><Clock className="h-3 w-3" />{s.duration}</Badge>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xl font-semibold">{s.price}</p>
                      <Button size="sm" className="mt-2">Reserver</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <TestimonialSection eyebrow="Avis clients" title="Ils en parlent mieux que nous." testimonials={testimonials} />

      <section className="bg-muted/30 border-t">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid gap-6 sm:grid-cols-3 text-center">
            {[
              { icon: <MapPin className="h-5 w-5" />, label: "12 rue du Bien-Etre, Lyon 2e" },
              { icon: <Phone className="h-5 w-5" />, label: "+33 4 00 00 00 00" },
              { icon: <Clock className="h-5 w-5" />, label: "Lun-Sam, 9h-19h" },
            ].map((info) => (
              <div key={info.label} className="flex flex-col items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-card text-primary">
                  {info.icon}
                </div>
                <p className="text-sm">{info.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        variant="default"
        title="Premiere seance ? -10%"
        description="Offre de bienvenue pour tout nouveau client. Valable sur tous les soins."
        actions={
          <Button asChild size="lg" variant="default">
            <Link href="/booking">En profiter <ArrowRight className="size-4" /></Link>
          </Button>
        }
      />
    </div>
  );
}
