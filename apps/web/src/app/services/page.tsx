import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Globe,
  KeyRound,
  LayoutDashboard,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MarketingPageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Ce que tu obtiens avec KV Web Starter : site vitrine, Réservations, paiements, API et dashboard admin.",
};

const services = [
  {
    icon: Globe,
    title: "Site vitrine",
    description:
      "Toutes les pages marketing dont un site professionnel a besoin, deja construites et optimisees pour Google.",
    items: [
      "Page d'accueil avec sections hero et modules",
      "Page services avec descriptions et icones",
      "Temoignages clients",
      "Page FAQ avec accordeon",
      "Formulaire de contact",
      "Mentions legales et confidentialite",
      "Sitemap.xml et robots.txt automatiques",
      "Metadata Open Graph par page",
    ],
    href: "/",
    cta: "Voir l'accueil",
  },
  {
    icon: CalendarDays,
    title: "Réservations en ligne",
    description:
      "Tes clients reservent et payent en autonomie. Tu geres tout depuis le dashboard sans jamais decrocher le telephone.",
    items: [
      "Page publique de Réservation",
      "Calendrier interactif avec créneaux disponibles",
      "Gestion des services, durees et prix",
      "Gestion du staff et de leurs horaires",
      "Exceptions et jours feries",
      "Paiement Stripe au moment de la Réservation",
      "Email de confirmation automatique",
      "Vue agenda dans le dashboard",
    ],
    href: "/booking",
    cta: "Tester la Réservation",
  },
  {
    icon: CreditCard,
    title: "Paiements et abonnements",
    description:
      "Le systeme de facturation complet : plans, checkout, webhooks, portail client. Rien a construire.",
    items: [
      "3 plans configurables (Starter, Pro, Business)",
      "Page de tarification presentable au client",
      "Checkout Stripe sécurisé",
      "Webhook synchronise en temps reel",
      "Portail client pour modifier ou annuler",
      "Periodes d'essai gererables",
      "Historique des paiements",
      "Facturation automatique mensuelle",
    ],
    href: "/pricing",
    cta: "Voir les plans",
  },
  {
    icon: KeyRound,
    title: "Portail API et Développeurs",
    description:
      "Pour les services qui veulent vendre l'Accès a leurs donnees ou fonctionnalites via une API.",
    items: [
      "Cles API générées et hashees",
      "Scopes et permissions par cle",
      "Limites d'appels par plan",
      "Compteur d'utilisation en temps reel",
      "Documentation interactive (testable en direct)",
      "Page portail développeur",
      "Endpoint de demonstration inclus",
      "Guide d'integration",
    ],
    href: "/developers",
    cta: "Explorer l'API",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard d'administration",
    description:
      "Interface complete pour gerer le site, les clients, les Réservations et les statistiques.",
    items: [
      "Vue d'ensemble avec statistiques en temps reel",
      "Gestion des Réservations (accepter, annuler)",
      "Liste des clients et abonnements",
      "Gestion des cles API",
      "Configuration des services et du staff",
      "Suivi de l'utilisation de l'API",
      "Journal d'audit des actions",
      "Parametres du compte",
    ],
    href: "/dashboard",
    cta: "Ouvrir le dashboard",
  },
  {
    icon: ShieldCheck,
    title: "Securite et fiabilité",
    description:
      "Les protections essentielles sont activees par defaut. Ton site est sécurisé sans configuration supplementaire.",
    items: [
      "Connexion securisee (email, GitHub OAuth)",
      "Protection de toutes les pages privees",
      "Entetes de securite sur chaque réponse",
      "Cles API hashees (jamais stockees en clair)",
      "Limite d'appels pour eviter les abus",
      "Journal d'audit des actions sensibles",
      "Validation des formulaires cote serveur",
      "Variables d'environnement validees au demarrage",
    ],
    href: "/overview",
    cta: "Voir l'architecture",
  },
  {
    icon: Mail,
    title: "Emails automatiques",
    description:
      "Tous les emails transactionnels sont preconfigures. Tes clients recoivent les bons messages au bon moment.",
    items: [
      "Confirmation de Réservation",
      "Rappel avant le rendez-vous",
      "Email de bienvenue a l'inscription",
      "Confirmation de paiement",
      "Alerte en cas d'echec de paiement",
      "Messages du formulaire de contact",
      "Templates personnalisables",
      "Envoi via Resend (sans serveur mail a configurer)",
    ],
    href: "/contact",
    cta: "Tester le contact",
  },
];

export default function ServicesPage() {
  return (
    <MarketingPageShell>
      <main>
        <section className="border-b theme-hero">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <Badge className="mb-5 border-background/20 bg-background/10 text-background">Ce qu&apos;on obtient</Badge>
            <h1 className="text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
              Tout ce qu&apos;un site professionnel doit avoir.<br className="hidden sm:block" />
              Deja construit.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 opacity-70">
              Chaque module est independant. Active ce dont ton projet a besoin,
              ignore le reste. Pas de code mort, pas de fonctionnalites inutiles.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="theme-hero-btn-primary">
                <Link href="/docs">
                  Lire le guide complet <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-background/30 text-background hover:bg-background/10">
                <Link href="/booking">Tester la Réservation</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <Card key={service.title} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center border bg-background">
                      <service.icon className="size-4" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="mt-1">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-4">
                  <ul className="grid gap-1.5 sm:grid-cols-2">
                    {service.items.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-foreground/50" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <Button asChild variant="secondary" size="sm">
                      <Link href={service.href}>
                        {service.cta} <ArrowRight className="size-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </MarketingPageShell>
  );
}
