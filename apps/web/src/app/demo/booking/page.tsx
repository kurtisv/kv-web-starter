import Link from "next/link";
import { ArrowRight, CheckCircle2, Calendar, Users, CreditCard, Bell, Clock, Shield, BarChart2, Smartphone } from "lucide-react";

import { HeroSection } from "@/components/sections/hero-section";
import { TestimonialSection } from "@/components/sections/testimonial-section";
import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ShimmerBadge } from "@/components/ui/shimmer-badge";
import { ServicePicker } from "@/components/booking/service-picker";
import { StaffPicker } from "@/components/booking/staff-picker";
import { BookingSummaryCard } from "@/components/booking/booking-summary-card";
import { BookingDemoNav } from "@/components/booking/booking-demo-nav";
import {
  DEMO_BOOKING_PRODUCT,
  DEMO_BOOKING_STATS,
  DEMO_BOOKING_TESTIMONIALS,
  DEMO_BOOKING_FAQ,
  DEMO_BOOKING_INTEGRATIONS,
  DEMO_BOOKING_PLANS,
  DEMO_SERVICES,
  DEMO_STAFF,
} from "@/lib/demo-data/booking-demo-data";

const HERO_SERVICES = DEMO_SERVICES.slice(0, 3).map((s) => ({
  id: s.id,
  name: s.name,
  durationMin: s.durationMin,
  priceCents: s.priceCents,
  description: s.description,
}));

const HERO_STAFF = DEMO_STAFF.slice(0, 3).map((s) => ({
  id: s.id,
  name: s.name,
  role: s.role,
}));

const DEMO_SERVICE = DEMO_SERVICES[0]!;
const DEMO_STAFF_MEMBER = DEMO_STAFF[0]!;

const FEATURES = [
  { icon: <Calendar className="h-5 w-5" />,   title: "Booking en ligne 24h/7j",     desc: "Vos clients reservent depuis n importe quel appareil, a n importe quelle heure. Confirmations automatiques." },
  { icon: <Users className="h-5 w-5" />,       title: "Gestion multi-staff",          desc: "Chaque intervenant dispose de son propre calendrier, ses regles de dispo et son lien de reservation." },
  { icon: <Bell className="h-5 w-5" />,        title: "Rappels automatises",          desc: "Email et SMS automatiques avant chaque RDV. Reduction des no-shows jusqu a -60%." },
  { icon: <CreditCard className="h-5 w-5" />,  title: "Paiements & depots",           desc: "Acceptez les paiements, depots et facturez les no-shows. Tout est automatise." },
  { icon: <Clock className="h-5 w-5" />,       title: "Disponibilites en temps reel", desc: "Gestion des ressources, salles, equipements. Les plages s affichent en temps reel selon les regles." },
  { icon: <Shield className="h-5 w-5" />,      title: "Politiques d annulation",      desc: "Definissez vos propres regles : annulation gratuite, delai, frais. Appliquez-les automatiquement." },
  { icon: <BarChart2 className="h-5 w-5" />,   title: "Analytics & rapports",         desc: "Suivez vos revenus, taux de remplissage, sources de reservation et tendances d une seule vue." },
  { icon: <Users className="h-5 w-5" />,       title: "CRM client integre",           desc: "Profils clients, historique, formulaires d admission, notes, segmentation. Tout au meme endroit." },
  { icon: <Smartphone className="h-5 w-5" />,  title: "100% mobile",                  desc: "Interface optimisee pour les clients comme pour le personnel. Prise en main en moins de 5 minutes." },
];

const WORKFLOW_STEPS = [
  { step: "1", title: "Votre client choisit",   desc: "Service, intervenant, date, creneau — en 2 minutes depuis son telephone." },
  { step: "2", title: "ZenSlot confirme",        desc: "Confirmation email + rappels SMS automatiques avant le RDV." },
  { step: "3", title: "Le paiement est securise",desc: "Depot ou paiement complet a la reservation. No-show facture automatiquement." },
  { step: "4", title: "Vous gerez tout",          desc: "Tableau de bord, calendrier, clients, factures — en un seul endroit." },
];

export default function DemoBookingPage() {
  return (
    <div data-theme="local-business" className="bg-profile-soft-gradient">
      <BookingDemoNav />

      <HeroSection
        variant="split"
        eyebrow={<ShimmerBadge>Plateforme de reservation pro</ShimmerBadge>}
        title={DEMO_BOOKING_PRODUCT.tagline}
        description="ZenSlot aide les studios, cliniques, salons, coachs et professionnels de services a gerer leurs reservations, leurs clients, leurs paiements et leurs rappels depuis une seule plateforme."
        actions={
          <>
            <Button asChild size="lg">
              <Link href="/booking">
                Essayer la reservation <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/demo/booking/dashboard">
                Voir le dashboard
              </Link>
            </Button>
            <div className="flex flex-wrap gap-2 pt-1">
              {["Booking en ligne", "Rappels auto", "Paiements & depots", "Liste d attente", "CRM client"].map((b) => (
                <Badge key={b} variant="outline" size="sm" className="font-normal">{b}</Badge>
              ))}
            </div>
          </>
        }
        trustBar={
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
            {DEMO_BOOKING_STATS.map((stat) => (
              <span key={stat.label}>
                <span className="font-semibold text-foreground">{stat.value}</span>{" "}{stat.detail}
              </span>
            ))}
          </div>
        }
        media={
          <div className="card-glass rounded-2xl p-5 space-y-4">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Choisir un service
              </p>
              <ServicePicker
                services={HERO_SERVICES}
                selectedId={HERO_SERVICES[0]!.id}
                formId="hero-demo-form"
              />
            </div>
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Choisir un intervenant
              </p>
              <StaffPicker
                staff={HERO_STAFF}
                selectedId={HERO_STAFF[0]!.id}
                formId="hero-demo-form"
              />
            </div>
          </div>
        }
      />

      {/* Stats trust bar */}
      <section className="border-y bg-card">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DEMO_BOOKING_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="mt-1 text-sm font-medium">{stat.label}</p>
                <p className="text-xs text-muted-foreground">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="border-b bg-background">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">Le probleme</p>
              <h2 className="text-2xl font-bold mb-6">Trop de temps perdu sur l&apos;administratif</h2>
              <div className="space-y-3">
                {[
                  "Repondre manuellement a chaque demande de reservation",
                  "Gerer les plannings sur plusieurs outils differents",
                  "Relancer les clients pour les paiements manquants",
                  "Tracker les no-shows sans politique claire",
                  "Envoyer les rappels a la main avant chaque RDV",
                ].map((problem) => (
                  <div key={problem} className="flex items-start gap-3">
                    <span className="mt-1 h-4 w-4 shrink-0 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs dark:bg-red-900/30 dark:text-red-400">
                      &#10005;
                    </span>
                    <p className="text-sm text-muted-foreground">{problem}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">La solution ZenSlot</p>
              <h2 className="text-2xl font-bold mb-6">Automatisez tout, concentrez-vous sur vos clients</h2>
              <div className="space-y-3">
                {[
                  "Reservations automatiques avec confirmation instantanee",
                  "Calendrier centralise pour tout le personnel",
                  "Paiements et depots collectes a la reservation",
                  "Politique no-show appliquee automatiquement",
                  "Rappels email + SMS envoyes sans intervention",
                ].map((solution) => (
                  <div key={solution} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p className="text-sm">{solution}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature bento */}
      <section className="border-b bg-profile-soft-gradient">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground text-center">
            Fonctionnalites
          </p>
          <h2 className="mb-10 text-2xl font-bold text-center">Tout ce dont vous avez besoin, rien de plus.</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <SpotlightCard key={feature.title} className="flex flex-col gap-4 p-6 rounded-xl">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <div>
                  <p className="font-semibold">{feature.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow steps */}
      <section className="border-b bg-card">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground text-center">
            Comment ca marche
          </p>
          <h2 className="mb-10 text-2xl font-bold text-center">Operationnel en 15 minutes.</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WORKFLOW_STEPS.map((step) => (
              <div key={step.step} className="rounded-xl border bg-card p-5 shadow-sm">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  {step.step}
                </div>
                <p className="font-semibold">{step.title}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking preview */}
      <section className="border-b bg-background">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Portail de reservation client
          </p>
          <h2 className="mb-4 text-2xl font-bold">Le parcours de reservation, de A a Z.</h2>
          <p className="mb-10 max-w-xl text-sm text-muted-foreground">
            Vos clients reservent en ligne. Vous confirmez (ou pas). Les paiements arrivent automatiquement.
            Demo ci-dessous — cliquez sur &quot;Essayer&quot; pour tester le flux complet.
          </p>
          <div className="grid gap-6 lg:grid-cols-3">
            <div>
              <p className="mb-3 text-sm font-medium">Service &amp; intervenant</p>
              <ServicePicker
                services={DEMO_SERVICES.slice(0, 3).map((s) => ({
                  id: s.id, name: s.name, durationMin: s.durationMin, priceCents: s.priceCents, description: s.description,
                }))}
                selectedId={DEMO_SERVICES[0]!.id}
                formId="preview-form"
              />
            </div>
            <div>
              <p className="mb-3 text-sm font-medium">Choisir l&apos;intervenant</p>
              <StaffPicker
                staff={DEMO_STAFF.map((s) => ({ id: s.id, name: s.name, role: s.role }))}
                selectedId={DEMO_STAFF[0]!.id}
                formId="preview-form"
              />
            </div>
            <div>
              <p className="mb-3 text-sm font-medium">Recapitulatif</p>
              <BookingSummaryCard
                service={{ id: DEMO_SERVICE.id, name: DEMO_SERVICE.name, durationMin: DEMO_SERVICE.durationMin, priceCents: DEMO_SERVICE.priceCents, description: DEMO_SERVICE.description }}
                staff={{ id: DEMO_STAFF_MEMBER.id, name: DEMO_STAFF_MEMBER.name, role: DEMO_STAFF_MEMBER.role }}
                date="2026-07-15"
              />
              <Button asChild className="mt-3 w-full" size="sm">
                <Link href="/booking">
                  Essayer le flux complet <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="border-b bg-profile-soft-gradient">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground text-center">
            Integrations
          </p>
          <h2 className="mb-3 text-2xl font-bold text-center">Connectez vos outils existants.</h2>
          <p className="mb-10 text-center text-sm text-muted-foreground max-w-lg mx-auto">
            ZenSlot se synchronise avec votre agenda, votre fournisseur de paiement, votre outil email et votre outil video.
            Aucune migration complexe.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {DEMO_BOOKING_INTEGRATIONS.map((intg) => (
              <div key={intg.id} className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3 shadow-sm">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <span className="text-xs font-bold">{intg.name[0]}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium">{intg.name}</p>
                  <p className="text-xs text-muted-foreground">{intg.description}</p>
                </div>
                <span className={`ml-auto shrink-0 h-2 w-2 rounded-full ${intg.status === "connected" ? "bg-green-500" : "bg-muted-foreground/30"}`} />
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/demo/booking/settings" className="text-sm text-primary hover:underline">
              Voir toutes les integrations &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-b bg-background">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground text-center">
            Tarifs
          </p>
          <h2 className="mb-3 text-2xl font-bold text-center">Simple. Transparent. Sans surprise.</h2>
          <p className="mb-2 text-center text-xs text-muted-foreground">
            Demo fictive &mdash; prix indicatifs uniquement, pas de facturation reelle
          </p>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {DEMO_BOOKING_PLANS.map((plan) => (
              <div key={plan.id} className={`rounded-xl border p-6 shadow-sm ${plan.isPopular ? "border-primary ring-1 ring-primary/20" : "bg-card"}`}>
                {plan.isPopular && (
                  <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Le plus populaire
                  </span>
                )}
                <p className="font-semibold">{plan.name}</p>
                <p className="mt-1 text-3xl font-bold">
                  {(plan.priceCents / 100).toFixed(0)} EUR
                  <span className="text-sm font-normal text-muted-foreground">/{plan.period}</span>
                </p>
                <div className="mt-4 space-y-2">
                  {plan.features.map((feature) => (
                    <p key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {feature}
                    </p>
                  ))}
                </div>
                <Button asChild className="mt-6 w-full" variant={plan.isPopular ? "default" : "outline"} size="sm">
                  <Link href="/booking">{plan.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection
        eyebrow="Temoignages"
        title="Ils ont automatise leur agenda. Et ils ne reviennent pas en arriere."
        testimonials={DEMO_BOOKING_TESTIMONIALS.map((t) => ({
          quote: t.quote,
          author: t.author,
          role: t.role,
        }))}
      />

      {/* FAQ */}
      <FAQSection
        eyebrow="FAQ"
        title="Questions frequentes"
        items={DEMO_BOOKING_FAQ.map((item) => ({ question: item.q, answer: item.a }))}
      />

      {/* CTA */}
      <CTASection
        variant="muted"
        eyebrow="850 000+ reservations gerees par mois"
        title="Pret a liberer votre agenda ?"
        description="Configurez ZenSlot en 15 minutes. Sans engagement, sans carte de credit."
        actions={
          <>
            <Button asChild size="lg">
              <Link href="/booking">
                Essayer la demo <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/demo/booking/dashboard">
                Voir le dashboard
              </Link>
            </Button>
          </>
        }
      />
    </div>
  );
}
