export const siteConfig = {
  name: "KV Web Starter",
  tagline: "Le boilerplate Next.js pour lancer vite.",
  description: "Next.js 16, Auth.js, Prisma, Stripe, réservations, API portal — tout en place. Clone, configure, déploie.",
  cta: "Dashboard",
  ctaHref: "/login",
  footerTags: ["Next.js", "Prisma", "Stripe", "Auth.js"],
  nav: [
    { href: "/demo",       label: "Démo" },
    { href: "/docs",       label: "Guide" },
    { href: "/services",   label: "Services" },
    { href: "/booking",    label: "Réservation" },
    { href: "/developers", label: "API" },
    { href: "/faq",        label: "FAQ" },
  ],
  footerColumns: [
    {
      title: "Produit",
      links: [
        { href: "/docs",      label: "Guide" },
        { href: "/services",  label: "Services" },
        { href: "/overview",  label: "Comment ça marche" },
      ],
    },
    {
      title: "Développeurs",
      links: [
        { href: "/developers", label: "Portail API" },
        { href: "/booking",    label: "Démo réservation" },
        { href: "/faq",        label: "FAQ" },
      ],
    },
    {
      title: "Légal",
      links: [
        { href: "/privacy", label: "Confidentialité" },
        { href: "/terms",   label: "Conditions" },
      ],
    },
  ],
} as const;
