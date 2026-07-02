import type { Industry } from "./types";

/** Optional 3D experience suggestion for an industry.
 * Additive metadata: nothing in the engine requires it, so existing
 * manifests and presets are untouched. */
export interface IndustryThreeDRecommendation {
  /** Which /demo/3d/* pattern fits this industry. */
  demo: "product-showroom" | "immersive-landing";
  reason: string;
}

export interface IndustryMeta {
  label: string;
  demoSlug: string;
  profileId: string;
  defaultFeatures: string[];
  optionalFeatures: string[];
  defaultTagline: string;
  stats: { value: string; label: string }[];
  threeD?: IndustryThreeDRecommendation;
}

export const INDUSTRY_META: Record<Industry, IndustryMeta> = {
  saas: {
    label: "SaaS Platform",
    demoSlug: "saas",
    profileId: "premium-saas",
    defaultFeatures: [
      "Dashboard analytics",
      "Gestion abonnements",
      "API REST",
      "Collaboration equipe",
    ],
    optionalFeatures: ["SSO / SAML", "Webhooks", "White-labeling"],
    defaultTagline: "La plateforme qui simplifie votre workflow.",
    stats: [
      { value: "10k+", label: "Clients actifs" },
      { value: "99.9%", label: "Uptime SLA" },
      { value: "200ms", label: "Latence" },
      { value: "4.9/5", label: "Note" },
    ],
    threeD: {
      demo: "immersive-landing",
      reason: "Hero 3D avec cards dashboard en profondeur: credibilite produit immediate (voir /demo/3d/immersive-landing).",
    },
  },
  booking: {
    label: "Reservation / RDV",
    demoSlug: "booking",
    profileId: "warm-local",
    defaultFeatures: [
      "Prise de rendez-vous",
      "Rappels automatiques",
      "Gestion agenda",
      "Paiement en ligne",
    ],
    optionalFeatures: ["Multi-staff", "Services multiples", "Abonnements"],
    defaultTagline: "Reservez en 60 secondes. Sans telephone.",
    stats: [
      { value: "500+", label: "Professionnels" },
      { value: "50k+", label: "RDV geres" },
      { value: "4.8/5", label: "Note clients" },
    ],
  },
  ecommerce: {
    label: "E-commerce",
    demoSlug: "ecommerce",
    profileId: "commerce-clean",
    defaultFeatures: [
      "Catalogue produits",
      "Panier / Checkout",
      "Suivi commandes",
      "Avis clients",
    ],
    optionalFeatures: ["Codes promo", "Variantes produits", "Abonnements"],
    defaultTagline: "Commandez en 2 minutes. Livraison en 24h.",
    stats: [
      { value: "5k+", label: "Produits" },
      { value: "98%", label: "Satisfaction" },
      { value: "24h", label: "Livraison" },
    ],
    threeD: {
      demo: "product-showroom",
      reason: "Viewer produit 360 avec configurateur couleur/matiere et hotspots (voir /demo/3d/product-showroom).",
    },
  },
  "real-estate": {
    label: "Immobilier",
    demoSlug: "real-estate",
    profileId: "real-estate-luxe",
    defaultFeatures: [
      "Recherche proprietes",
      "Calculateur hypothecaire",
      "Profil agent",
      "Alertes nouveautes",
    ],
    optionalFeatures: ["Visite 3D", "Comparateur quartiers", "Estimation IA"],
    defaultTagline: "Trouvez votre maison ideale. Accompagnement personnalise.",
    stats: [
      { value: "2k+", label: "Proprietes" },
      { value: "150+", label: "Agents" },
      { value: "98%", label: "Satisfaction" },
    ],
    threeD: {
      demo: "product-showroom",
      reason: "Le pattern viewer + hotspots s'adapte a un modele de batiment avec pieces cliquables.",
    },
  },
  api: {
    label: "API / Dev Tools",
    demoSlug: "api",
    profileId: "dark-technical",
    defaultFeatures: [
      "Documentation API",
      "Cles API",
      "Rate limiting",
      "Webhooks",
    ],
    optionalFeatures: ["SDK multi-langages", "Sandbox", "Monitoring"],
    defaultTagline: "Une API claire. Une integration en 5 minutes.",
    stats: [
      { value: "1B+", label: "Requetes/mois" },
      { value: "99.99%", label: "Uptime" },
      { value: "50ms", label: "P99" },
    ],
  },
  dashboard: {
    label: "Dashboard / Analytics",
    demoSlug: "dashboard",
    profileId: "minimal-dashboard",
    defaultFeatures: [
      "Metriques temps reel",
      "Graphiques avances",
      "Alertes",
      "Export CSV",
    ],
    optionalFeatures: ["Rapports auto", "Multi-utilisateurs", "Integrations"],
    defaultTagline: "Vos donnees. Vos decisions.",
    stats: [
      { value: "250+", label: "Metriques" },
      { value: "1s", label: "Rafraichissement" },
      { value: "100%", label: "Donnees owned" },
    ],
  },
  portfolio: {
    label: "Portfolio / Agence",
    demoSlug: "portfolio",
    profileId: "creative-portfolio",
    defaultFeatures: [
      "Galerie projets",
      "Etudes de cas",
      "Timeline experience",
      "Formulaire contact",
    ],
    optionalFeatures: ["Blog", "Temoignages", "Stack technique"],
    defaultTagline: "Le travail parle. Les chiffres confirment.",
    stats: [
      { value: "50+", label: "Projets livres" },
      { value: "5 ans", label: "Experience" },
      { value: "100%", label: "Clients satisfaits" },
    ],
    threeD: {
      demo: "immersive-landing",
      reason: "Scene immersive scroll-reactive: identite visuelle forte pour une agence ou un portfolio.",
    },
  },
  "local-business": {
    label: "Commerce local",
    demoSlug: "local-business",
    profileId: "warm-local",
    defaultFeatures: [
      "Horaires / Carte",
      "Services et tarifs",
      "Avis Google",
      "Carte fidelite",
    ],
    optionalFeatures: ["Reservation en ligne", "Menu / Catalogue", "Offres speciales"],
    defaultTagline: "Pres de vous. Pour vous.",
    stats: [
      { value: "15 ans", label: "Experience" },
      { value: "4.9/5", label: "Avis Google" },
      { value: "2000+", label: "Clients fideles" },
    ],
  },
  "auto-blog": {
    label: "Auto / Editorial",
    demoSlug: "auto-blog",
    profileId: "auto-performance",
    defaultFeatures: [
      "Fiches vehicules",
      "Comparateur",
      "Actualites auto",
      "Essais",
    ],
    optionalFeatures: ["Calculateur LOA", "Alerte occasion", "Galerie photos"],
    defaultTagline: "L'actualite automobile sans filtre.",
    stats: [
      { value: "500+", label: "Vehicules" },
      { value: "100+", label: "Articles/mois" },
      { value: "200k+", label: "Lecteurs" },
    ],
  },
};
