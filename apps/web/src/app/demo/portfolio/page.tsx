import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Globe, Mail } from "lucide-react";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectShowcase } from "@/components/sections/project-showcase";
import { StatsSection } from "@/components/sections/stats-section";
import { CTASection } from "@/components/sections/cta-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "E-commerce Platform",
    description: "Boutique Next.js avec paiement Stripe et gestion des stocks en temps reel.",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    href: "#",
    image: (
      <div className="relative h-full w-full">
        <Image src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80&auto=format&fit=crop" alt="E-commerce platform" fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
      </div>
    ),
  },
  {
    title: "SaaS Dashboard",
    description: "Tableau de bord analytique avec graphiques temps reel et export CSV.",
    tags: ["React", "Recharts", "API REST"],
    href: "#",
    image: (
      <div className="relative h-full w-full">
        <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop" alt="SaaS dashboard" fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
      </div>
    ),
  },
  {
    title: "API de geocodage",
    description: "API REST haute performance — 50k requetes/jour, latence sous 80ms.",
    tags: ["Node.js", "Redis", "Docker"],
    href: "#",
    image: (
      <div className="relative h-full w-full">
        <Image src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&q=80&auto=format&fit=crop" alt="Geocoding API" fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
      </div>
    ),
  },
  {
    title: "App de Réservations",
    description: "Systeme de prise de rendez-vous avec confirmation email et calendrier.",
    tags: ["Next.js", "Prisma", "Resend"],
    href: "#",
    image: (
      <div className="relative h-full w-full">
        <Image src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&auto=format&fit=crop" alt="Booking app" fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
      </div>
    ),
  },
];

const stats = [
  { value: "12+", label: "Projets livres" },
  { value: "4 ans", label: "Experience" },
  { value: "8/10", label: "Clients satisfaits" },
  { value: "100%", label: "Remote" },
];

export default function DemoPortfolioPage() {
  return (
    <div data-theme="corporate-classic">
      <HeroSection
        variant="split"
        eyebrow="Développeur Full Stack"
        title="Je construis des produits qui fonctionnent."
        description="Spécialisé Next.js, TypeScript et APIs. Je livre des applications rapides, accessibles et maintenables. Disponible pour missions freelance."
        actions={
          <>
            <Button asChild size="lg">
              <Link href="#projets">Voir mes projets <ArrowRight className="size-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#contact"><Mail className="size-4" /> Me contacter</Link>
            </Button>
          </>
        }
        media={
          <div className="flex flex-col gap-4 border bg-muted/40 p-6">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-border">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&q=80&auto=format&fit=crop&crop=face"
                  alt="Alex Morin"
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div>
                <p className="font-semibold">Alex Morin</p>
                <p className="text-sm text-muted-foreground">Développeur Full Stack · Paris</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono text-xs">alexmorin.dev</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono text-xs">github.com/alexmorin</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "TypeScript", "Prisma", "Tailwind"].map((t) => (
                <Badge key={t} variant="outline" size="sm">{t}</Badge>
              ))}
            </div>
          </div>
        }
      />

      <StatsSection stats={stats} variant="strip" />

      <div id="projets">
        <ProjectShowcase
          eyebrow="Projets"
          title="Ce que j'ai construit"
          items={projects}
          columns={2}
        />
      </div>

      <CTASection
        variant="border"
        title="Interessé par une collaboration ?"
        description="Je suis disponible pour des missions freelance de 1 à 6 mois. Prenons 30 minutes pour discuter de votre projet."
        actions={
          <Button asChild size="lg">
            <Link href="mailto:hello@kurtisv.dev">Envoyer un email <ArrowRight className="size-4" /></Link>
          </Button>
        }
      />
    </div>
  );
}
