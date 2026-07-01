import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Globe, Mail, MapPin } from "lucide-react";
import { HeroSection } from "@/components/sections/hero-section";
import { CTASection } from "@/components/sections/cta-section";
import { TestimonialSection } from "@/components/sections/testimonial-section";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { RevealSection } from "@/components/ui/reveal-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShimmerBadge } from "@/components/ui/shimmer-badge";
import { Timeline, type TimelineItem } from "@/components/portfolio/timeline";
import { TechStackCloud, type TechItem } from "@/components/portfolio/tech-stack-cloud";
import { CaseStudyCard, type CaseStudyCardProps } from "@/components/portfolio/case-study-card";
import { ProcessSteps, type ProcessStep } from "@/components/portfolio/process-steps";
import { FilterableProjects, type ProjectItem } from "@/components/portfolio/filterable-projects";
import { ContactForm } from "@/components/portfolio/contact-form";


/* ── Data ─────────────────────────────────────────── */

const caseStudies: CaseStudyCardProps[] = [
  {
    client: "StartupFinance",
    title: "Plateforme SaaS de gestion financiere",
    description: "Refonte complete de l'interface et de l'API. Migration React → Next.js 14 avec SSR, dashboard temps reel et acces role-based.",
    outcome: "L'equipe de dev a enfin une base solide. La vitesse de livraison a double en 3 mois.",
    metrics: [
      { label: "Temps de chargement", value: "-68%", delta: "1.2s → 0.4s" },
      { label: "Utilisateurs actifs", value: "40k", delta: "+120%" },
      { label: "Incidents prod", value: "0", delta: "vs 12/mois avant" },
    ],
    tags: ["Next.js", "TypeScript", "Prisma", "Stripe"],
    photo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop",
    photoAlt: "Dashboard analytique SaaS",
    featured: true,
    link: "#",
  },
  {
    client: "E-sante Lyon",
    title: "Systeme de prise de rendez-vous medical",
    description: "Application de reservation pour un reseau de 12 cliniques. Calendrier multi-praticien, rappels SMS, paiement en ligne.",
    outcome: "Le no-show a chute de 40%. Les secretaires traitent 3x plus de dossiers par jour.",
    metrics: [
      { label: "No-show", value: "-40%", delta: "vs systeme papier" },
      { label: "RDV/jour", value: "380", delta: "vs 120 avant" },
      { label: "Satisfaction", value: "4.8/5", delta: "+1.2 pts" },
    ],
    tags: ["Next.js", "Resend", "Prisma", "Twilio"],
    photo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=80&auto=format&fit=crop",
    photoAlt: "Application de prise de rendez-vous",
    featured: false,
    link: "#",
  },
];

const projects: ProjectItem[] = [
  {
    title: "E-commerce Platform",
    description: "Boutique Next.js avec panier, paiement Stripe et gestion des stocks en temps reel.",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    href: "#",
    photo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80&auto=format&fit=crop",
    photoAlt: "E-commerce platform",
  },
  {
    title: "API de geocodage",
    description: "API REST haute performance — 50k req/jour, latence sous 80ms, cache Redis.",
    tags: ["Node.js", "Redis", "Docker"],
    href: "#",
    photo: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&q=80&auto=format&fit=crop",
    photoAlt: "Geocoding API",
  },
  {
    title: "Dashboard analytique",
    description: "Tableau de bord temps reel avec graphiques interactifs et export CSV/Excel.",
    tags: ["React", "Recharts", "TypeScript"],
    href: "#",
    photo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop",
    photoAlt: "Analytics dashboard",
  },
  {
    title: "App de reservations",
    description: "Systeme de prise de rendez-vous avec confirmation email et rappels automatiques.",
    tags: ["Next.js", "Prisma", "Resend"],
    href: "#",
    photo: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&auto=format&fit=crop",
    photoAlt: "Booking app",
  },
  {
    title: "Site immobilier premium",
    description: "Listing immobilier avec filtres avances, calculateur hypothecaire et carte interactive.",
    tags: ["Next.js", "TypeScript", "Mapbox"],
    href: "#",
    photo: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&auto=format&fit=crop",
    photoAlt: "Real estate site",
  },
  {
    title: "Portal developpeur API",
    description: "Documentation interactive, gestion des cles API, logs de requetes, webhooks.",
    tags: ["Next.js", "Docker", "PostgreSQL"],
    href: "#",
    photo: "https://images.unsplash.com/photo-1555066931-4365d14431b9?w=800&q=80&auto=format&fit=crop",
    photoAlt: "Developer API portal",
  },
];

const techStack: TechItem[] = [
  { name: "Next.js", level: 3, category: "Frontend" },
  { name: "React", level: 3, category: "Frontend" },
  { name: "TypeScript", level: 3, category: "Frontend" },
  { name: "Tailwind CSS", level: 3, category: "Frontend" },
  { name: "Framer Motion", level: 2, category: "Frontend" },
  { name: "Node.js", level: 3, category: "Backend" },
  { name: "PostgreSQL", level: 3, category: "Backend" },
  { name: "Prisma", level: 3, category: "Backend" },
  { name: "REST / GraphQL", level: 2, category: "Backend" },
  { name: "Redis", level: 2, category: "Backend" },
  { name: "Docker", level: 2, category: "Infra & Outils" },
  { name: "Vercel / CI-CD", level: 3, category: "Infra & Outils" },
  { name: "GitHub Actions", level: 2, category: "Infra & Outils" },
  { name: "Figma", level: 2, category: "Infra & Outils" },
  { name: "Playwright", level: 2, category: "Infra & Outils" },
];

const experience: TimelineItem[] = [
  {
    period: "2024 — present",
    title: "Developpeur Full Stack senior",
    company: "Freelance — Paris",
    description: "Missions SaaS et e-commerce pour des startups et ETI. Stack Next.js / Supabase / Stripe.",
    tags: ["Next.js", "Supabase", "Stripe"],
    current: true,
  },
  {
    period: "2022 — 2024",
    title: "Lead Frontend",
    company: "TechCo SAS — Lyon",
    description: "Architecture d'une plateforme B2B en React + TypeScript. 40k utilisateurs actifs.",
    tags: ["React", "TypeScript", "GraphQL"],
  },
  {
    period: "2020 — 2022",
    title: "Developpeur Full Stack",
    company: "Agence Numerique — Bordeaux",
    description: "Developpement de sites e-commerce et d'applications web sur mesure.",
    tags: ["Vue.js", "Laravel", "MySQL"],
  },
];

const processSteps: ProcessStep[] = [
  { number: "01", title: "Decouverte", description: "Atelier cadrage : objectifs, contraintes techniques, utilisateurs cibles, perimetre." },
  { number: "02", title: "Architecture", description: "Choix de stack, modele de donnees, wireframes et plan d'API avant la premiere ligne de code." },
  { number: "03", title: "Developpement", description: "Sprints de 2 semaines, code review, tests, demo et feedback continu." },
  { number: "04", title: "Livraison", description: "Documentation, deploiement, formation equipe, suivi 30 jours et passation complete." },
];

const testimonials = [
  {
    quote: "Alex a transforme une spec vague en produit solide en 6 semaines. Livraison a l'heure, code propre, zero compromis sur la qualite.",
    author: "Caroline M.",
    role: "CEO, StartupFinance",
  },
  {
    quote: "Notre systeme de RDV a completement change notre organisation. Les patients adorent, les medecins aussi. ROI en moins de 3 mois.",
    author: "Dr. Jean-Pierre L.",
    role: "Directeur medical, E-sante Lyon",
  },
  {
    quote: "Tres bon niveau technique et excellent communicant. Je le recommande sans hesiter pour tout projet Next.js complexe.",
    author: "Thomas R.",
    role: "CTO, Plateforme B2B",
  },
];

/* ── Page ─────────────────────────────────────────── */

export default function DemoPortfolioPage() {
  return (
    <div data-theme="corporate-classic" className="bg-profile-noise">
      {/* Hero */}
      <HeroSection
        variant="split"
        eyebrow={<ShimmerBadge>Developpeur Full Stack — Paris</ShimmerBadge>}
        title={<span className="text-gradient-editorial">Je construis des produits qui fonctionnent.</span>}
        description="Specialise Next.js, TypeScript et APIs. Je livre des applications rapides, accessibles et maintenables. Disponible pour missions freelance."
        actions={
          <>
            <Button asChild size="lg">
              <Link href="#etudes">Voir mes projets <ArrowRight className="size-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#contact"><Mail className="size-4" /> Me contacter</Link>
            </Button>
          </>
        }
        media={
          <div className="card-gradient-border rounded-2xl p-px">
            <div className="flex flex-col gap-5 rounded-2xl bg-card p-6">
              {/* Avatar + info */}
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-primary/30">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&q=80&auto=format&fit=crop&crop=face"
                    alt="Alex Morin"
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div>
                  <p className="font-semibold">Alex Morin</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" /> Paris, France
                  </div>
                </div>
                <Badge variant="success" size="sm" className="ml-auto">
                  Disponible
                </Badge>
              </div>

              {/* Animated stats */}
              <div className="grid grid-cols-3 gap-3 border-y py-4 text-center">
                {[
                  { value: 12, suffix: "+", label: "Projets" },
                  { value: 4, suffix: " ans", label: "Experience" },
                  { value: 100, suffix: "%", label: "Remote" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-xl font-semibold text-gradient-editorial">
                      <AnimatedCounter value={s.value} suffix={s.suffix} />
                    </p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Links */}
              <div className="grid gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="font-mono text-xs">alexmorin.dev</span>
                </div>
                <div className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  <span className="font-mono text-xs">github.com/alexmorin</span>
                </div>
              </div>

              {/* Stack badges */}
              <div className="flex flex-wrap gap-1.5">
                {["Next.js", "TypeScript", "Prisma", "Tailwind", "Docker"].map((t) => (
                  <Badge key={t} variant="outline" size="sm">{t}</Badge>
                ))}
              </div>
            </div>
          </div>
        }
      />

      {/* 3D Visual */}
      <section className="border-b bg-card">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">3D & Animation</p>
              <h2 className="text-2xl font-semibold text-gradient-editorial">Front-end haute fidelite.</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Scenes Three.js integrees directement dans Next.js App Router. Rendu adaptatif :
                haute fidelite sur desktop, mode performance sur mobile. Aucune bibliotheque externe lourde
                cote serveur.
              </p>
              <ul className="mt-5 grid gap-2 text-sm">
                {[
                  "React Three Fiber + Drei",
                  "Degradation automatique mobile (DPR, antialiasing, particules)",
                  "Reduced-motion respecte",
                  "Lazy-loaded via React.Suspense",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Etudes de cas */}
      <section id="etudes" className="border-b bg-background">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <RevealSection>
            <div className="mb-10">
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">Etudes de cas</p>
              <h2 className="text-2xl font-semibold text-gradient-editorial">Projets en vedette</h2>
            </div>
          </RevealSection>
          <RevealSection delay={0.1}>
            <div className="grid gap-5 lg:grid-cols-2">
              {caseStudies.map((cs) => (
                <div key={cs.title} className="card-gradient-border rounded-2xl p-px">
                  <div className="rounded-2xl bg-card h-full">
                    <CaseStudyCard {...cs} />
                  </div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Tous les projets */}
      <section className="border-b bg-card">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-6">
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">Portfolio</p>
            <h2 className="text-xl font-semibold text-gradient-editorial">Tous les projets</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Filtrez par technologie pour trouver ce qui vous interesse.
            </p>
          </div>
          <FilterableProjects items={projects} />
        </div>
      </section>

      {/* Stack technique */}
      <section className="border-b bg-background">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <RevealSection>
            <div className="mb-8">
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">Stack</p>
              <h2 className="text-xl font-semibold text-gradient-editorial">Competences techniques</h2>
            </div>
          </RevealSection>
          <RevealSection delay={0.1}>
            <TechStackCloud items={techStack} />
          </RevealSection>
        </div>
      </section>

      {/* Parcours */}
      <section className="border-b bg-card">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">Parcours</p>
          <h2 className="mb-10 text-xl font-semibold text-gradient-editorial">Experience</h2>
          <Timeline items={experience} />
        </div>
      </section>

      {/* Processus */}
      <section className="border-b bg-background">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <RevealSection>
            <div className="mb-10">
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">Methode</p>
              <h2 className="text-xl font-semibold text-gradient-editorial">Comment je travaille</h2>
            </div>
          </RevealSection>
          <RevealSection delay={0.1}>
            <ProcessSteps steps={processSteps} />
          </RevealSection>
        </div>
      </section>

      {/* Temoignages */}
      <TestimonialSection
        eyebrow="Clients"
        title="Ce qu'ils disent."
        testimonials={testimonials}
        className="border-b"
      />

      {/* Contact */}
      <section id="contact" className="border-b bg-background">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <RevealSection>
              <div>
                <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">Contact</p>
                <h2 className="text-2xl font-semibold text-gradient-editorial">Parlons de votre projet.</h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  Je suis disponible pour des missions freelance de 1 a 6 mois, en remote.
                  Repondez generalement sous 48 h.
                </p>
                <ul className="mt-6 grid gap-3 text-sm">
                  {[
                    "Projets Next.js / TypeScript",
                    "APIs et microservices",
                    "Refonte et migration d'applications",
                    "Audits de performance et accessibilite",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealSection>
            <RevealSection delay={0.1}>
              <div className="card-glass rounded-2xl p-6">
                <ContactForm />
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      <CTASection
        variant="border"
        title={<span className="text-gradient-editorial">Interesse par une collaboration ?</span>}
        description="30 minutes d'echange pour cadrer votre projet — sans engagement."
        actions={
          <Button asChild size="lg">
            <Link href="mailto:hello@alexmorin.dev">
              Envoyer un email <ArrowRight className="size-4" />
            </Link>
          </Button>
        }
      />
    </div>
  );
}
