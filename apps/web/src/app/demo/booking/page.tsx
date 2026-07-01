import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Clock, History, Mail } from "lucide-react";

import { HeroSection } from "@/components/sections/hero-section";
import { TestimonialSection } from "@/components/sections/testimonial-section";
import { CTASection } from "@/components/sections/cta-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ShimmerBadge } from "@/components/ui/shimmer-badge";
import { ServicePicker, type ServiceOption } from "@/components/booking/service-picker";
import { StaffPicker, type StaffOption } from "@/components/booking/staff-picker";
import { BookingSummaryCard } from "@/components/booking/booking-summary-card";
import { BookingStatusTimeline } from "@/components/booking/booking-status-timeline";
import { ClientBookingHistory, type BookingHistoryItem } from "@/components/booking/client-booking-history";
import { BookingReminderPreview } from "@/components/booking/booking-reminder-preview";
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
  { icon: <CalendarDays className="h-6 w-6" />, title: "Choisissez un creneau", description: "Selectionnez le service, l'intervenant, la date et l'heure." },
  { icon: <CheckCircle2 className="h-6 w-6" />, title: "Confirmez et payez",    description: "Paiement securise par Stripe. Remboursement garanti jusqu'a 24h avant." },
  { icon: <Clock className="h-6 w-6" />,        title: "Recevez votre confirmation", description: "Email de confirmation + rappel 24h avant votre rendez-vous." },
];

const DEMO_SERVICE = SERVICES[0]!;
const DEMO_STAFF = STAFF[0]!;

const BOOKING_HISTORY: BookingHistoryItem[] = [
  { id: "bk-1", service: "Massage relaxant", staff: "Sophie Bertin", date: "2026-07-15", time: "14h00", priceCents: 7500, status: "upcoming" },
  { id: "bk-2", service: "Reflexologie",      staff: "Lucie Morel",   date: "2026-06-10", time: "10h30", priceCents: 6000, status: "completed" },
  { id: "bk-3", service: "Soin visage",        staff: "Sophie Bertin", date: "2026-05-22", time: "15h00", priceCents: 8500, status: "completed" },
  { id: "bk-4", service: "Massage sport",      staff: "Pierre Duval",  date: "2026-04-08", time: "11h00", priceCents: 11000, status: "cancelled" },
];

export default function DemoBookingPage() {
  return (
    <div data-theme="local-business" className="bg-profile-soft-gradient">
      <HeroSection
        variant="split"
        eyebrow={<ShimmerBadge>Bien-etre et relaxation</ShimmerBadge>}
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
            <div className="flex flex-wrap gap-2 pt-1">
              {["Booking en ligne", "Paiement Stripe-ready", "Rappels auto", "Historique client"].map((b) => (
                <Badge key={b} variant="outline" size="sm" className="font-normal">{b}</Badge>
              ))}
            </div>
          </>
        }
        trustBar={
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
            <span><span className="font-semibold text-foreground">300+</span> clients satisfaits</span>
            <span><span className="font-semibold text-foreground">4.9/5</span> note moyenne</span>
            <span><span className="font-semibold text-foreground">2 min</span> pour reserver</span>
            <span><span className="font-semibold text-foreground">-10%</span> sur la 1ere seance</span>
          </div>
        }
        media={
          <div className="card-glass rounded-2xl p-5">
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

      {/* Steps — SpotlightCard pour rendre interactif */}
      <section className="border-y bg-card">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground text-center">
            Comment ca marche
          </p>
          <h2 className="mb-10 text-2xl font-semibold text-center">Simple comme bonjour.</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {steps.map((step, i) => (
              <SpotlightCard key={step.title} className="flex flex-col gap-4 p-6 rounded-xl">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {step.icon}
                </div>
                <div>
                  <p className="text-xs font-mono text-muted-foreground mb-1">Etape {i + 1}</p>
                  <p className="font-semibold">{step.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

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
              Disparait automatiquement s&apos;il n&apos;y a qu&apos;un seul intervenant.
            </p>
            <StaffPicker
              staff={STAFF}
              selectedId="staff-1"
              formId="demo-staff-form"
            />
          </div>

          {/* Actions post-booking */}
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
      <section className="border-b bg-profile-soft-gradient">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="mb-6 text-xl font-semibold">Nos services</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {SERVICES.map((s) => (
              <div key={s.id} className="card-glass rounded-xl flex items-center justify-between p-5">
                <div>
                  <p className="font-semibold">{s.name}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{s.durationMin} min</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-base font-semibold text-primary">
                    {s.priceCents ? `${(s.priceCents / 100).toFixed(0)} €` : "Gratuit"}
                  </span>
                  <Button asChild size="sm">
                    <Link href="/booking">Reserver</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialSection eyebrow="Temoignages" title="Ce que disent nos clients." testimonials={testimonials} />

      {/* Post-booking components */}
      <section className="border-t bg-background">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-2 text-2xl font-semibold">Suivi et historique</h2>
          <p className="mb-10 max-w-xl text-sm text-muted-foreground">
            Apres la reservation : timeline de statut, historique client et rappel email — tous inclus.
          </p>

          <div className="grid gap-8 lg:grid-cols-3">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <History className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">BookingStatusTimeline</p>
                <Badge variant="outline" size="sm" className="font-mono text-[10px]">server</Badge>
              </div>
              <BookingStatusTimeline status="reminded" />
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">BookingReminderPreview</p>
                <Badge variant="outline" size="sm" className="font-mono text-[10px]">server</Badge>
              </div>
              <BookingReminderPreview
                serviceName={DEMO_SERVICE.name}
                staffName={DEMO_STAFF.name}
                date="Mardi 15 juillet 2026"
                time="14h00"
              />
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">ClientBookingHistory</p>
                <Badge variant="outline" size="sm" className="font-mono text-[10px]">server</Badge>
              </div>
              <ClientBookingHistory items={BOOKING_HISTORY} />
            </div>
          </div>
        </div>
      </section>

      {/* My bookings CTA */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold">Espace client inclus</p>
            <p className="text-sm text-muted-foreground">Vos clients gerent leurs RDV depuis /my-bookings — annulation, report, historique.</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/my-bookings">
              Voir l&apos;espace client <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      <CTASection
        variant="muted"
        eyebrow="300+ clients nous font confiance"
        title="Pret a vous faire du bien ?"
        description="Premiere seance avec 10% de reduction. Reservez en 2 minutes, annulation gratuite."
        actions={
          <Button asChild size="lg" rightIcon={<ArrowRight className="size-4" />}>
            <Link href="/booking">Prendre rendez-vous</Link>
          </Button>
        }
      />
    </div>
  );
}
