export const siteConfig = {
  name: "KV Web Starter",
  tagline: "Le boilerplate Next.js pour lancer vite.",
  description: "Next.js 16, Auth.js, Prisma, Stripe, reservations, API portal — tout en place. Clone, configure, deploie.",
  cta: "Dashboard",
  ctaHref: "/login",
  footerTags: ["Next.js", "Prisma", "Stripe", "Auth.js"],
  nav: [
    { href: "/demo", label: "Demo" },
    { href: "/docs", label: "Guide" },
    { href: "/services", label: "Services" },
    { href: "/pricing", label: "Pricing" },
    { href: "/booking", label: "Reservation" },
    { href: "/developers", label: "API" },
    { href: "/faq", label: "FAQ" },
  ],
  footerColumns: [
    {
      title: "Produit",
      links: [
        { href: "/docs", label: "Guide" },
        { href: "/services", label: "Services" },
        { href: "/pricing", label: "Tarifs" },
        { href: "/overview", label: "Comment ca marche" },
      ],
    },
    {
      title: "Developpeurs",
      links: [
        { href: "/developers", label: "Portail API" },
        { href: "/booking", label: "Demo reservation" },
        { href: "/faq", label: "FAQ" },
      ],
    },
    {
      title: "Legal",
      links: [
        { href: "/privacy", label: "Confidentialite" },
        { href: "/terms", label: "Conditions" },
      ],
    },
  ],
} as const;
