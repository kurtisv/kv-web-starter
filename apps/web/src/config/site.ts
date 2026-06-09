export const siteConfig = {
  name: "KV Studio",
  tagline: "Je construis les produits que vous n'avez pas le temps de construire.",
  description: "Développeur full-stack basé au Canada. Next.js, React Native, IA intégrée. Du premier commit au déploiement en jours, pas en mois.",
  location: "Canada",
  available: true,
  footerTags: ["Next.js", "React Native", "TypeScript", "IA"],
  nav: [
    { href: "/projects", label: "Projets" },
    { href: "/services", label: "Services" },
    { href: "/pricing", label: "Tarifs" },
    { href: "/overview", label: "À propos" },
    { href: "/faq", label: "FAQ" },
  ],
  footerColumns: [
    {
      title: "Studio",
      links: [
        { href: "/projects", label: "Projets" },
        { href: "/services", label: "Services" },
        { href: "/pricing", label: "Tarifs" },
        { href: "/overview", label: "À propos" },
      ],
    },
    {
      title: "Travaillons ensemble",
      links: [
        { href: "/booking", label: "Réserver un appel" },
        { href: "/contact", label: "Me contacter" },
        { href: "/faq", label: "FAQ" },
      ],
    },
    {
      title: "Légal",
      links: [
        { href: "/privacy", label: "Confidentialité" },
        { href: "/terms", label: "Conditions" },
      ],
    },
  ],
} as const;
