import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Clock } from "lucide-react";

import { HeroSection } from "@/components/sections/hero-section";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { TestimonialSection } from "@/components/sections/testimonial-section";
import { CTASection } from "@/components/sections/cta-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ServicePicker, type ServiceOption } from "@/components/booking/service-picker";
import { StaffPicker, type StaffOption } from "@/components/booking/staff-picker";
import { BookingSummaryCard } from "@/components/booking/booking-summary-card";
import { TimeSlotGridPreview } from "./booking-preview";
import { BookingDemoActions } from "./booking-demo-actions";

const SERVICES: ServiceOption[] = [
  { id: "massage-relax",   name: "Massage relaxant",      durationMin: 60, priceCents: 7500,  description: "Decontraction musculaire profonde" },
  { id: "massage-sport",   name: "Massage therapeutique", durationMin: 90, priceCents: 11000, description: "Cible les tensions et douleurs chroniques" },
  { id: "reflexologie",    name: "Reflexologie",          durationMin: 45, priceCents: 6000,  description: "Stimulation des zones reflexes" },
  { id: "soin-visage",     name: "Soin visage",           durationMin: 60, priceCents: 8500,  description: "Hydratation et eclat de la peau" },
];

const STAFF: StaffOption[] = [
  { id: "staff-1", name: "Sophie Bertin", role: "Massotherapeute" },
  { id: "staff-2", name: "Lucie Morel",   role: "Reflexologue" },
  { id: "staff-3", name: "Pierre Duval",  role: "Massotherapeute" },
];

const testimonials = [
  { quote: "Un moment de detente parfait. Je reviens chaque mois depuis 2 ans.", author: "Marie L.", role: "Cliente reguliere" },
  { quote: "Reservation en ligne super simple et reminders automatiques.", author: "Thomas R.", role: "Nouveau client" },
  { quote: "Professionnelle et a l'ecoute. Je recommande sans hesitation.", author: "Sophie M.", role: "Cliente depuis 3 ans" },
];

const steps = [
  { icon: <CalendarDays className="h-5 w-5" />, title: "Choisissez un creneau", description: "Selectionnez le service, l'intervenant, la date et l'heure." },
  { icon: <CheckCircle2 className="h-5 w-5" />, title: "Confirmez et payez", description: "Paiement securise par Stripe. Remboursement garanti jusqu'a 24h avant." },
  { icon: <Clock className="h-5 w-5" />, title: "Recevez votre confirmation", description: "Email de confirmation + rappel 24h avant votre rendez-vous." },
];

const DEMO_SERVICE = SERVICES[0]!;
const DEMO_STAFF = STAFF[0]!;

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
          <div className="border bg-card p-5">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Choisir un service
            </p>
            <ServicePicker
              services={SERVICES.slice(0, 3)}
              selectedId="massage-relax"
              formId="hero-demo-form"
            />
          </div>
        }
      />

      <FeatureGrid
        eyebrow="Comment ca marche"
        title="Simple comme bonjour."
        features={steps}
        columns={3}
        variant="icon-left"
        className="border-y bg-card"
      />

      {/* Booking components showcase */}
      <section id="services" className="border-b bg-background">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-2 text-2xl font-semibold">Composants de reservation</h2>
          <p className="mb-10 max-w-xl text-sm text-muted-foreground">
            Tous les composants du flux sont inclus. Reliez-les a votre base de donnees et
            le formulaire fonctionne immediatement.
          </p>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* ServicePicker */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <p className="text-sm font-medium">ServicePicker</p>
                <Badge variant="outline" size="sm" className="font-mono text-[10px]">server</Badge>
              </div>
              <ServicePicker
                services={SERVICES}
                selectedId="massage-relax"
                formId="demo-form-services"
              />
            </div>

            {/* TimeSlotGrid */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <p className="text-sm font-medium">TimeSlotGrid</p>
                <Badge variant="outline" size="sm" className="font-mono text-[10px]">client</Badge>
              </div>
              <p className="mb-3 text-xs text-muted-foreground">Mardi 15 juillet 2026</p>
              <TimeSlotGridPreview />
            </div>

            {/* BookingSummaryCard */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <p className="text-sm font-medium">BookingSummaryCard</p>
                <Badge variant="outline" size="sm" className="font-mono text-[10px]">server</Badge>
              </div>
              <BookingSummaryCard
                service={DEMO_SERVICE}
                staff={DEMO_STAFF}
                date="2026-07-15"
              />
              <Button asChild className="mt-3 w-full" size="sm">
                <Link href="/booking">Essayer le flux complet <ArrowRight className="h-3.5 w-3.5" /></Link>
              </Button>
            </div>
          </div>

          {/* StaffPicker */}
          <div className="mt-8 border-t pt-8">
            <div className="mb-3 flex items-center gap-2">
              <p className="text-sm font-medium">StaffPicker</p>
              <Badge variant="outline" size="sm" className="font-mono text-[10px]">server</Badge>
            </div>
            <p className="mb-4 text-xs text-muted-foreground max-w-md">
              Affiche les intervenants disponibles avec avatar, nom et role.
              Disparait automatiquement s'il n'y a qu'un seul intervenant.
            </p>
            <StaffPicker
              staff={STAFF}
              selectedId="staff-1"
              formId="demo-staff-form"
            />
          </div>

          {/* CancelBookingDialog + RescheduleBookingDialog */}
          <div className="mt-8 border-t pt-8">
            <p className="mb-4 text-sm font-medium">Actions post-reservation</p>
            <p className="mb-6 text-xs text-muted-foreground max-w-md">
              Dialogs de gestion de reservation : annulation avec avertissement destructif,
              replanification avec selecteur de date et creneaux.
            </p>
            <BookingDemoActions serviceName={DEMO_SERVICE.name} />
          </div>
        </div>
      </section>

      {/* Static service cards */}
      <section className="border-b bg-card">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="mb-6 text-xl font-semibold">Nos services</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {SERVICES.map((s) => (
              <Card key={s.id} className="flex items-center justify-between p-5">
                <div>
                  <p className="font-semibold">{s.name}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{s.durationMin} min</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-base font-semibold">
                    {s.priceCents ? `${(s.priceCents / 100).toFixed(0)} €` : "Gratuit"}
                  </span>
                  <Button asChild size="sm">
                    <Link href="/booking">Reserver</Link>
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
