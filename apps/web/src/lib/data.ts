export const PROJECTS = [
  {
    id: "kv-starter",
    name: "KV Web Starter",
    year: "2025",
    status: "Open source",
    tags: ["Next.js", "Prisma", "Stripe", "NextAuth", "i18n"],
    description: "Boilerplate complet pour sites avec réservations, paiements et portail API. Livrez en jours, pas en mois.",
    longDescription: "Un point de départ professionnel avec authentification JWT, dashboard admin, système de réservation avec créneaux, paiements Stripe (one-time + abonnements), portail API avec rate limiting Upstash, et bilingue FR/EN natif. Conçu pour itérer vite sur des projets client réels.",
    href: "https://github.com/kurtisv/kv-web-starter",
    external: true,
  },
  {
    id: "gasmobile",
    name: "GasMobile",
    year: "2025",
    status: "En production",
    tags: ["React Native", "Expo", "Supabase", "TypeScript", "EAS"],
    description: "Application mobile de gestion complète pour stations-service. Inventaire, analytics, multi-site.",
    longDescription: "Gestion opérationnelle complète d'une chaîne de stations-service : suivi des stocks de carburant en temps réel, rapports d'activité journaliers, gestion des équipes et tableau de bord multi-sites. Déployé sur iOS et Android via EAS Build.",
    href: "#",
    external: false,
  },
  {
    id: "reserveflow",
    name: "ReserveFlow",
    year: "2024",
    status: "En production",
    tags: ["Next.js", "PostgreSQL", "Stripe", "Resend", "Prisma"],
    description: "Système de réservation en ligne pour prestataires de services.",
    longDescription: "Plateforme SaaS permettant aux professionnels indépendants de gérer leurs créneaux en ligne, d'encaisser les paiements au moment de la réservation et d'envoyer des confirmations automatiques par email.",
    href: "#",
    external: false,
  },
  {
    id: "pleinsens",
    name: "PleinSens",
    year: "2024",
    status: "Beta",
    tags: ["Python", "FastAPI", "React", "PostgreSQL", "NumPy"],
    description: "Plateforme d'analyse et de backtesting de stratégies sur données historiques.",
    longDescription: "Outil d'analyse quantitative permettant de tester et valider des stratégies sur données historiques. Métriques de performance détaillées, visualisation des courbes d'équité, export des résultats et monitoring continu de la précision des signaux.",
    href: "#",
    external: false,
  },
] as const;

export type Project = (typeof PROJECTS)[number];

export const STACK = [
  "Next.js", "React", "TypeScript", "Node.js", "Prisma", "PostgreSQL",
  "Stripe", "React Native", "Expo", "Tailwind CSS", "Framer Motion",
  "Vercel", "Supabase", "OpenAI", "FastAPI", "Python",
] as const;

export const STATS = [
  { value: 8,  suffix: "+", label: "Projets livrés" },
  { value: 6,  suffix: "+", label: "Clients satisfaits" },
  { value: 3,  suffix: "+", label: "Années d'expérience" },
  { value: 16, suffix: "+", label: "Technologies" },
] as const;
