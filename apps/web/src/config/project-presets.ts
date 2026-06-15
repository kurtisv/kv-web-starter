import type { ThemeId } from "@/design-system/tokens";

export type ProjectType =
  | "portfolio"
  | "saas"
  | "booking"
  | "api"
  | "real-estate"
  | "local-business"
  | "auto-blog"
  | "ecommerce"
  | "dashboard";

export interface NavItem { href: string; label: string; }
export interface FooterColumn { title: string; links: NavItem[]; }

export interface ProjectPreset {
  type: ProjectType;
  name: string;
  tagline: string;
  description: string;
  cta: string;
  ctaHref: string;
  theme: ThemeId;
  nav: NavItem[];
  footerColumns: FooterColumn[];
  footerTags: string[];
  enabledModules: Array<"booking" | "billing" | "api" | "dashboard" | "blog" | "ecommerce">;
}

export const PROJECT_PRESETS: Record<ProjectType, ProjectPreset> = {
  portfolio: {
    type: "portfolio",
    name: "Mon Portfolio",
    tagline: "Developpeur Full Stack",
    description: "Projets, competences et experiences. Disponible pour missions freelance.",
    cta: "Voir mes projets",
    ctaHref: "/projects",
    theme: "corporate-classic",
    nav: [
      { href: "/projects", label: "Projets" },
      { href: "/services", label: "Services" },
      { href: "/contact", label: "Contact" },
    ],
    footerColumns: [
      { title: "Navigation", links: [{ href: "/projects", label: "Projets" }, { href: "/services", label: "Services" }] },
      { title: "Contact", links: [{ href: "/contact", label: "Formulaire" }] },
    ],
    footerTags: ["React", "Next.js", "TypeScript"],
    enabledModules: ["dashboard"],
  },
  saas: {
    type: "saas",
    name: "MonSaaS",
    tagline: "La plateforme qui simplifie tout.",
    description: "Gagnez du temps, reduisez les couts. Essayez gratuitement pendant 14 jours.",
    cta: "Essai gratuit",
    ctaHref: "/login",
    theme: "premium-saas",
    nav: [
      { href: "/services", label: "Fonctionnalites" },
      { href: "/pricing", label: "Tarifs" },
      { href: "/docs", label: "Docs" },
      { href: "/faq", label: "FAQ" },
    ],
    footerColumns: [
      { title: "Produit", links: [{ href: "/services", label: "Fonctionnalites" }, { href: "/pricing", label: "Tarifs" }] },
      { title: "Dev", links: [{ href: "/docs", label: "Documentation" }, { href: "/developers", label: "API" }] },
      { title: "Support", links: [{ href: "/faq", label: "FAQ" }, { href: "/contact", label: "Contact" }] },
    ],
    footerTags: ["SaaS", "Next.js", "Stripe"],
    enabledModules: ["billing", "dashboard", "api"],
  },
  booking: {
    type: "booking",
    name: "ReservePro",
    tagline: "Reservations en ligne simples.",
    description: "Vos clients reservent, paient et recoivent une confirmation automatique.",
    cta: "Prendre rendez-vous",
    ctaHref: "/booking",
    theme: "local-business",
    nav: [
      { href: "/services", label: "Services" },
      { href: "/booking", label: "Reservation" },
      { href: "/pricing", label: "Tarifs" },
      { href: "/contact", label: "Contact" },
    ],
    footerColumns: [
      { title: "Services", links: [{ href: "/services", label: "Nos services" }, { href: "/booking", label: "Reserver" }] },
      { title: "Info", links: [{ href: "/faq", label: "FAQ" }, { href: "/contact", label: "Contact" }] },
    ],
    footerTags: ["Reservations", "Stripe", "Emails"],
    enabledModules: ["booking", "billing"],
  },
  api: {
    type: "api",
    name: "DataAPI",
    tagline: "Votre API. Simple. Scalable.",
    description: "Acces securise via cles API. Documentation integree. Metriques en temps reel.",
    cta: "Obtenir une cle API",
    ctaHref: "/login",
    theme: "dark-tech-api",
    nav: [
      { href: "/docs", label: "Documentation" },
      { href: "/developers", label: "API Reference" },
      { href: "/pricing", label: "Plans" },
      { href: "/dashboard", label: "Console" },
    ],
    footerColumns: [
      { title: "Dev", links: [{ href: "/docs", label: "Guide" }, { href: "/developers", label: "Reference API" }] },
      { title: "Compte", links: [{ href: "/pricing", label: "Tarifs" }, { href: "/login", label: "Connexion" }] },
    ],
    footerTags: ["REST API", "JSON", "Rate limiting"],
    enabledModules: ["api", "billing", "dashboard"],
  },
  "real-estate": {
    type: "real-estate",
    name: "ImmoPlus",
    tagline: "Trouvez votre bien ideal.",
    description: "Appartements, maisons, investissements. Scores de quartier et donnees financieres.",
    cta: "Voir les biens",
    ctaHref: "/services",
    theme: "real-estate",
    nav: [
      { href: "/services", label: "Biens" },
      { href: "/booking", label: "Visite" },
      { href: "/pricing", label: "Estimation" },
      { href: "/contact", label: "Contact" },
    ],
    footerColumns: [
      { title: "Biens", links: [{ href: "/services", label: "Tous les biens" }, { href: "/booking", label: "Planifier une visite" }] },
      { title: "Agence", links: [{ href: "/overview", label: "Qui sommes-nous" }, { href: "/contact", label: "Nous contacter" }] },
    ],
    footerTags: ["Immobilier", "Stripe", "Reservations"],
    enabledModules: ["booking", "billing"],
  },
  "local-business": {
    type: "local-business",
    name: "MonService",
    tagline: "Des services proches de vous.",
    description: "Massotherapie, coiffure, restaurant. Reservez en ligne et payez facilement.",
    cta: "Reserver maintenant",
    ctaHref: "/booking",
    theme: "local-business",
    nav: [
      { href: "/services", label: "Services" },
      { href: "/booking", label: "Reserver" },
      { href: "/testimonials", label: "Avis" },
      { href: "/contact", label: "Contact" },
    ],
    footerColumns: [
      { title: "Services", links: [{ href: "/services", label: "Nos services" }, { href: "/booking", label: "Reserver" }] },
      { title: "Contact", links: [{ href: "/contact", label: "Nous joindre" }, { href: "/faq", label: "FAQ" }] },
    ],
    footerTags: ["Reservations", "Local", "Stripe"],
    enabledModules: ["booking", "billing"],
  },
  "auto-blog": {
    type: "auto-blog",
    name: "AutoZone",
    tagline: "L'actualite auto qui compte.",
    description: "Fiches voitures, comparatifs, essais. Tout pour les passionnes.",
    cta: "Lire les articles",
    ctaHref: "/services",
    theme: "luxury-auto",
    nav: [
      { href: "/services", label: "Voitures" },
      { href: "/overview", label: "Comparatifs" },
      { href: "/pricing", label: "Abonnement" },
      { href: "/contact", label: "Contact" },
    ],
    footerColumns: [
      { title: "Contenu", links: [{ href: "/services", label: "Fiches voitures" }, { href: "/overview", label: "Comparatifs" }] },
      { title: "Communaute", links: [{ href: "/contact", label: "Nous ecrire" }, { href: "/faq", label: "FAQ" }] },
    ],
    footerTags: ["Automobile", "Blog", "Fiches techniques"],
    enabledModules: ["billing"],
  },
  ecommerce: {
    type: "ecommerce",
    name: "ShopFast",
    tagline: "La boutique qui convertit.",
    description: "Produits premium, checkout rapide, livraison fiable.",
    cta: "Voir les produits",
    ctaHref: "/services",
    theme: "ecommerce-clean",
    nav: [
      { href: "/services", label: "Produits" },
      { href: "/overview", label: "Categories" },
      { href: "/pricing", label: "Promotions" },
      { href: "/contact", label: "Contact" },
    ],
    footerColumns: [
      { title: "Boutique", links: [{ href: "/services", label: "Tous les produits" }, { href: "/pricing", label: "Soldes" }] },
      { title: "Service client", links: [{ href: "/faq", label: "FAQ" }, { href: "/contact", label: "Contact" }] },
      { title: "Legal", links: [{ href: "/privacy", label: "Confidentialite" }, { href: "/terms", label: "CGV" }] },
    ],
    footerTags: ["Stripe", "Produits", "Checkout"],
    enabledModules: ["ecommerce", "billing"],
  },
  dashboard: {
    type: "dashboard",
    name: "AdminPro",
    tagline: "Votre tableau de bord central.",
    description: "Metriques, utilisateurs, facturation. Tout au meme endroit.",
    cta: "Acceder au dashboard",
    ctaHref: "/dashboard",
    theme: "premium-saas",
    nav: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/pricing", label: "Plans" },
      { href: "/developers", label: "API" },
      { href: "/docs", label: "Docs" },
    ],
    footerColumns: [
      { title: "Produit", links: [{ href: "/dashboard", label: "Dashboard" }, { href: "/pricing", label: "Plans" }] },
      { title: "Dev", links: [{ href: "/developers", label: "API" }, { href: "/docs", label: "Documentation" }] },
    ],
    footerTags: ["Dashboard", "Analytics", "Stripe"],
    enabledModules: ["billing", "api", "dashboard"],
  },
};

const envType = process.env.NEXT_PUBLIC_PROJECT_TYPE as ProjectType | undefined;

export function getProjectPreset(): ProjectPreset | null {
  if (!envType || !PROJECT_PRESETS[envType]) return null;
  return PROJECT_PRESETS[envType];
}
