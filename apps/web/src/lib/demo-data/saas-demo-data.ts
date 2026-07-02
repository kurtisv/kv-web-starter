/**
 * Centralized mock data for the LaunchPilot SaaS demo.
 * All values are deterministic strings — no new Date() in render.
 */

// ── Product identity ──────────────────────────────────────────────────────────

export const DEMO_PRODUCT = {
  name: "LaunchPilot",
  tagline: "Votre cockpit de croissance SaaS B2B",
  description:
    "LaunchPilot centralise vos abonnements, votre usage produit et vos signaux de croissance dans un cockpit SaaS pret a scaler.",
  plan: "Growth",
  planCycle: "mensuel",
  status: "active" as const,
  renewalDate: "15 aout 2026",
  workspace: "Acme Corp",
  workspaceSlug: "acme-corp",
  demoDisclaimer: "Donnees fictives de demonstration — aucune charge reelle.",
};

// ── Top-level metrics ─────────────────────────────────────────────────────────

export const DEMO_METRICS = {
  mrr:               { value: "24 890 €",  trend: "+12%",  direction: "up"      as const },
  arr:               { value: "298 680 €", trend: "+14%",  direction: "up"      as const },
  activeUsers:       { value: "1 247",     trend: "+8%",   direction: "up"      as const },
  churnRate:         { value: "1.2%",      trend: "-0.3%", direction: "down"    as const },
  activationRate:    { value: "74%",       trend: "+4%",   direction: "up"      as const },
  nps:               { value: "62",        trend: "+5",    direction: "up"      as const },
  uptime:            { value: "99.98%",    trend: "Stable",direction: "neutral" as const },
  avgRevenuePerUser: { value: "49 €",      trend: "+2 €",  direction: "up"      as const },
};

// ── Plans ─────────────────────────────────────────────────────────────────────

export const DEMO_PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "0 €",
    period: "/mois",
    description: "Pour tester LaunchPilot gratuitement.",
    features: [
      "Jusqu'a 50 clients suivis",
      "5 000 API requests/mois",
      "1 membre d'equipe",
      "Dashboard basique",
      "Support communaute",
    ],
    cta: "Commencer gratuitement",
    ctaHref: "/login",
    recommended: false,
  },
  {
    id: "growth",
    name: "Growth",
    price: "49 €",
    period: "/mois",
    description: "Pour les equipes SaaS en phase de croissance.",
    features: [
      "Jusqu'a 500 clients suivis",
      "100 000 API requests/mois",
      "10 membres d'equipe",
      "Dashboard avance + alertes churn",
      "Integrations (Stripe, HubSpot, Slack)",
      "Support prioritaire",
      "Export CSV/JSON",
    ],
    cta: "Essai gratuit 14 jours",
    ctaHref: "/login",
    recommended: true,
    badge: "Recommande",
  },
  {
    id: "scale",
    name: "Scale",
    price: "199 €",
    period: "/mois",
    description: "Pour les SaaS etablis qui scalent.",
    features: [
      "Clients illimites",
      "1 M API requests/mois",
      "50 membres d'equipe",
      "Analytics predictifs",
      "SSO / SAML",
      "Audit logs complets",
      "SLA 99.9%",
      "Support dedie",
    ],
    cta: "Commencer",
    ctaHref: "/login",
    recommended: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Sur mesure",
    period: "",
    description: "Pour les grandes organisations avec besoins specifiques.",
    features: [
      "Volume illimite",
      "Infrastructure dedie",
      "SAML / SCIM / AD",
      "SLA garanti contractuellement",
      "Onboarding dedie",
      "Support 24/7",
      "DPA inclus",
    ],
    cta: "Contacter l'equipe",
    ctaHref: "/contact",
    recommended: false,
  },
];

// ── Plan comparison features ───────────────────────────────────────────────────

export const DEMO_COMPARISON_FEATURES = [
  { label: "Clients suivis",         starter: "50",          growth: "500",          scale: "Illimite",   enterprise: "Illimite" },
  { label: "API requests/mois",      starter: "5 000",       growth: "100 000",      scale: "1 000 000",  enterprise: "Illimite" },
  { label: "Membres d'equipe",       starter: "1",           growth: "10",           scale: "50",         enterprise: "Illimite" },
  { label: "Dashboard avance",       starter: false,         growth: true,           scale: true,         enterprise: true },
  { label: "Alertes churn",          starter: false,         growth: true,           scale: true,         enterprise: true },
  { label: "Integrations",           starter: false,         growth: true,           scale: true,         enterprise: true },
  { label: "Export CSV/JSON",        starter: false,         growth: true,           scale: true,         enterprise: true },
  { label: "Analytics predictifs",   starter: false,         growth: false,          scale: true,         enterprise: true },
  { label: "SSO / SAML",            starter: false,         growth: false,          scale: true,         enterprise: true },
  { label: "Audit logs",            starter: false,         growth: false,          scale: true,         enterprise: true },
  { label: "SLA garanti",           starter: false,         growth: false,          scale: "99.9%",      enterprise: "Personnalise" },
  { label: "Support",               starter: "Communaute",  growth: "Prioritaire",  scale: "Dedie",      enterprise: "24/7 dedie" },
];

// ── Usage / quotas ────────────────────────────────────────────────────────────

export const DEMO_USAGE = {
  period: "Juin 2026",
  items: [
    { id: "api",      label: "API Requests",      used: 78_420,  limit: 100_000, unit: "",   category: "core" },
    { id: "storage",  label: "Stockage",           used: 3_200,   limit: 5_000,   unit: " Mo", category: "core" },
    { id: "seats",    label: "Membres actifs",     used: 7,       limit: 10,      unit: "",   category: "team" },
    { id: "webhooks", label: "Webhooks envoyes",   used: 12_400,  limit: 50_000,  unit: "",   category: "core" },
    { id: "exports",  label: "Exports CSV",        used: 18,      limit: 50,      unit: "",   category: "data" },
    { id: "ai",       label: "Tokens IA",          used: 920_000, limit: 1_000_000, unit: "", category: "ai"   },
  ],
  forecast: {
    projectedApiRequests: "94 000",
    projectedOverage: "0 €",
    overageRisk: "faible",
  },
};

export const DEMO_METERING_EVENTS = [
  { id: "m1", ts: "2026-06-30 23:58", event: "api.request",    qty: 142, endpoint: "POST /v1/customers",   status: "success" },
  { id: "m2", ts: "2026-06-30 23:55", event: "webhook.sent",   qty: 3,   endpoint: "customer.updated",     status: "success" },
  { id: "m3", ts: "2026-06-30 23:51", event: "export.csv",     qty: 1,   endpoint: "GET /v1/exports",       status: "success" },
  { id: "m4", ts: "2026-06-30 23:44", event: "ai.completion",  qty: 1800,endpoint: "POST /v1/ai/complete",  status: "success" },
  { id: "m5", ts: "2026-06-30 23:30", event: "api.request",    qty: 89,  endpoint: "GET /v1/analytics",     status: "success" },
  { id: "m6", ts: "2026-06-30 23:12", event: "webhook.failed", qty: 1,   endpoint: "invoice.paid",          status: "error"   },
  { id: "m7", ts: "2026-06-30 22:58", event: "api.request",    qty: 204, endpoint: "GET /v1/customers",     status: "success" },
  { id: "m8", ts: "2026-06-30 22:41", event: "ai.completion",  qty: 3200,endpoint: "POST /v1/ai/analyze",   status: "success" },
];

// ── Invoices ──────────────────────────────────────────────────────────────────

export const DEMO_INVOICES = [
  { id: "inv-1", number: "INV-2026-047", date: "1 juin 2026",      amountCents: 4900, status: "paid"     as const, plan: "Growth", dueDate: "1 juin 2026" },
  { id: "inv-2", number: "INV-2026-031", date: "1 mai 2026",       amountCents: 4900, status: "paid"     as const, plan: "Growth", dueDate: "1 mai 2026" },
  { id: "inv-3", number: "INV-2026-018", date: "1 avr. 2026",      amountCents: 4900, status: "paid"     as const, plan: "Growth", dueDate: "1 avr. 2026" },
  { id: "inv-4", number: "INV-2026-004", date: "1 mars 2026",      amountCents: 4900, status: "void"     as const, plan: "Growth", dueDate: "1 mars 2026" },
  { id: "inv-5", number: "INV-2026-059", date: "1 juil. 2026",     amountCents: 4900, status: "open"     as const, plan: "Growth", dueDate: "15 juil. 2026" },
];

// ── Customers / health ────────────────────────────────────────────────────────

export const DEMO_CUSTOMERS = [
  { id: "c1", name: "Nexgen SAS",        plan: "Scale",      health: 94, mrr: "199 €",  status: "active",   risk: "low",    daysActive: 342 },
  { id: "c2", name: "Brightloop Studio", plan: "Growth",     health: 81, mrr: "49 €",   status: "active",   risk: "low",    daysActive: 187 },
  { id: "c3", name: "DataStack Inc.",    plan: "Growth",     health: 62, mrr: "49 €",   status: "active",   risk: "medium", daysActive: 94  },
  { id: "c4", name: "CoreVault SARL",    plan: "Growth",     health: 41, mrr: "49 €",   status: "trialing", risk: "high",   daysActive: 12  },
  { id: "c5", name: "Orion Metrics",     plan: "Scale",      health: 88, mrr: "199 €",  status: "active",   risk: "low",    daysActive: 215 },
  { id: "c6", name: "PivotBase GmbH",    plan: "Growth",     health: 28, mrr: "49 €",   status: "active",   risk: "high",   daysActive: 67  },
  { id: "c7", name: "Launchform Ltd",    plan: "Starter",    health: 55, mrr: "0 €",    status: "active",   risk: "medium", daysActive: 31  },
  { id: "c8", name: "Synap Technologies",plan: "Enterprise", health: 97, mrr: "Sur mesure", status: "active",risk: "low",   daysActive: 503 },
];

// ── Churn risks ───────────────────────────────────────────────────────────────

export const DEMO_CHURN_RISKS = [
  { id: "cr1", customer: "PivotBase GmbH",    plan: "Growth",  risk: "high",   score: 72, signal: "Pas de login depuis 18 jours",       mrr: "49 €" },
  { id: "cr2", customer: "CoreVault SARL",    plan: "Growth",  risk: "high",   score: 68, signal: "Usage API < 5% du quota, trial J-3",  mrr: "49 €" },
  { id: "cr3", customer: "DataStack Inc.",    plan: "Growth",  risk: "medium", score: 41, signal: "Baisse d'activation -30% ce mois",    mrr: "49 €" },
  { id: "cr4", customer: "Launchform Ltd",    plan: "Starter", risk: "medium", score: 38, signal: "Aucune integration connectee",         mrr: "0 €"  },
];

// ── Feature adoption ──────────────────────────────────────────────────────────

export const DEMO_FEATURE_ADOPTION = [
  { id: "fa1", feature: "Dashboard",         adoptionPct: 94, activeUsers: 1170, trend: "up"     as const },
  { id: "fa2", feature: "Alertes churn",     adoptionPct: 61, activeUsers: 761,  trend: "up"     as const },
  { id: "fa3", feature: "Integrations",      adoptionPct: 48, activeUsers: 599,  trend: "up"     as const },
  { id: "fa4", feature: "Export CSV",        adoptionPct: 37, activeUsers: 461,  trend: "neutral"as const },
  { id: "fa5", feature: "Analytics avances", adoptionPct: 29, activeUsers: 362,  trend: "down"   as const },
  { id: "fa6", feature: "API directe",       adoptionPct: 22, activeUsers: 274,  trend: "neutral"as const },
];

// ── Onboarding checklist ──────────────────────────────────────────────────────

export const DEMO_ONBOARDING = [
  { id: "ob1", label: "Connecter votre source de donnees",       done: true  },
  { id: "ob2", label: "Inviter votre equipe (au moins 2 membres)",done: true  },
  { id: "ob3", label: "Configurer vos alertes churn",            done: true  },
  { id: "ob4", label: "Connecter Stripe ou votre CRM",           done: false },
  { id: "ob5", label: "Configurer les webhooks",                  done: false },
  { id: "ob6", label: "Exporter votre premier rapport",           done: false },
];

// ── Activity feed ─────────────────────────────────────────────────────────────

export const DEMO_ACTIVITY = [
  { id: "a1",  message: "Nexgen SAS a passe au plan Scale",               timestamp: "Il y a 2h",    variant: "success"  as const },
  { id: "a2",  message: "Alerte churn detectee — PivotBase GmbH",         timestamp: "Il y a 3h",    variant: "warning"  as const },
  { id: "a3",  message: "Integration Slack activee par Julie M.",          timestamp: "Il y a 5h",    variant: "default"  as const },
  { id: "a4",  message: "CoreVault SARL a demarre un essai gratuit",       timestamp: "Il y a 7h",    variant: "default"  as const },
  { id: "a5",  message: "Paiement echoue — DataStack Inc.",                timestamp: "Hier 18:42",   variant: "destructive" as const },
  { id: "a6",  message: "Export CSV genere par Marc D.",                   timestamp: "Hier 15:30",   variant: "default"  as const },
  { id: "a7",  message: "Orion Metrics a renouvele — Growth",              timestamp: "Hier 10:12",   variant: "success"  as const },
  { id: "a8",  message: "Mise a jour de l'API key principale",             timestamp: "Il y a 2j",    variant: "default"  as const },
];

// ── Integrations ──────────────────────────────────────────────────────────────

export const DEMO_INTEGRATIONS = [
  { id: "stripe",    name: "Stripe",     category: "Billing",      status: "connected", description: "Abonnements et factures",   icon: "💳", lastSync: "Il y a 5 min"  },
  { id: "slack",     name: "Slack",      category: "Alertes",       status: "connected", description: "Notifications d'equipe",    icon: "💬", lastSync: "Il y a 12 min" },
  { id: "hubspot",   name: "HubSpot",    category: "CRM",           status: "connected", description: "Contacts et deals",         icon: "🔶", lastSync: "Il y a 1h"    },
  { id: "github",    name: "GitHub",     category: "Dev",           status: "connected", description: "Issues et PRs",             icon: "🐙", lastSync: "Il y a 3h"    },
  { id: "intercom",  name: "Intercom",   category: "Support",       status: "disconnected", description: "Tickets support",       icon: "💭", lastSync: "N/A"          },
  { id: "datadog",   name: "Datadog",    category: "Monitoring",    status: "disconnected", description: "Metriques infra",       icon: "📊", lastSync: "N/A"          },
  { id: "zapier",    name: "Zapier",     category: "Automatisation",status: "pending",   description: "Automatisations no-code",   icon: "⚡", lastSync: "En attente"   },
  { id: "segment",   name: "Segment",    category: "Analytics",     status: "connected", description: "Tracking produit",          icon: "🎯", lastSync: "Il y a 30 min"},
];

// ── Team members ──────────────────────────────────────────────────────────────

export const DEMO_TEAM = [
  { id: "t1", name: "Julie Martin",    email: "julie@acme-corp.io",   role: "admin",    status: "active",  lastSeen: "Il y a 5 min",  avatar: "JM" },
  { id: "t2", name: "Marc Dupont",     email: "marc@acme-corp.io",    role: "member",   status: "active",  lastSeen: "Il y a 2h",     avatar: "MD" },
  { id: "t3", name: "Sara Karim",      email: "sara@acme-corp.io",    role: "member",   status: "active",  lastSeen: "Hier",          avatar: "SK" },
  { id: "t4", name: "Thomas Berger",   email: "thomas@acme-corp.io",  role: "viewer",   status: "active",  lastSeen: "Il y a 3j",     avatar: "TB" },
  { id: "t5", name: "Lea Fontaine",    email: "lea@acme-corp.io",     role: "member",   status: "invited", lastSeen: "—",             avatar: "LF" },
  { id: "t6", name: "Alex Rousseau",   email: "alex@acme-corp.io",    role: "viewer",   status: "active",  lastSeen: "Il y a 1 sem.", avatar: "AR" },
  { id: "t7", name: "Nina Bloch",      email: "nina@acme-corp.io",    role: "admin",    status: "active",  lastSeen: "Il y a 1h",     avatar: "NB" },
];

// ── Audit logs (security) ──────────────────────────────────────────────────────

export const DEMO_AUDIT_LOGS = [
  { id: "al1",  action: "Connexion reussie",          actor: "julie@acme-corp.io",  createdAt: "30 juin 2026, 23:42", description: "IP 192.168.1.1 — Paris, FR",          variant: "success"  as const },
  { id: "al2",  action: "Cle API regeneree",           actor: "marc@acme-corp.io",   createdAt: "30 juin 2026, 18:15", description: "Cle lp_live_xxxx1234 revoquee",        variant: "warning"  as const },
  { id: "al3",  action: "Membre invite",               actor: "julie@acme-corp.io",  createdAt: "30 juin 2026, 14:30", description: "lea@acme-corp.io — role: member",      variant: "info"     as const },
  { id: "al4",  action: "Integration Stripe connectee",actor: "nina@acme-corp.io",   createdAt: "29 juin 2026, 11:05", description: "Compte Stripe acme-corp active",      variant: "success"  as const },
  { id: "al5",  action: "Tentative de connexion echouee",actor: "inconnu",           createdAt: "29 juin 2026, 09:18", description: "IP 45.33.32.156 — bloc automatique",  variant: "warning"  as const },
  { id: "al6",  action: "Export de donnees",           actor: "marc@acme-corp.io",   createdAt: "28 juin 2026, 16:44", description: "Export clients — 1 247 lignes",        variant: "info"     as const },
  { id: "al7",  action: "Parametres SSO modifies",     actor: "julie@acme-corp.io",  createdAt: "28 juin 2026, 10:22", description: "SAML IDP mis a jour",                 variant: "info"     as const },
  { id: "al8",  action: "Suppression de donnees",      actor: "nina@acme-corp.io",   createdAt: "27 juin 2026, 15:00", description: "Client CoreTest supprime (RGPD)",     variant: "warning"  as const },
];

// ── API keys ──────────────────────────────────────────────────────────────────

export const DEMO_API_KEYS = [
  { id: "k1", name: "Production",      key: "lp_live_•••••••••••••••••••••1234", created: "1 janv. 2026",  lastUsed: "Il y a 5 min", status: "active"   },
  { id: "k2", name: "Staging",         key: "lp_test_•••••••••••••••••••••5678", created: "15 mars 2026", lastUsed: "Il y a 2j",    status: "active"   },
  { id: "k3", name: "CI/CD Pipeline",  key: "lp_live_•••••••••••••••••••••9012", created: "20 avr. 2026", lastUsed: "Il y a 1h",    status: "active"   },
  { id: "k4", name: "Ancienne cle",    key: "lp_live_•••••••••••••••••••••3456", created: "1 oct. 2025",  lastUsed: "Il y a 45j",   status: "revoked"  },
];

// ── Security posture ──────────────────────────────────────────────────────────

export const DEMO_SECURITY = {
  score: 82,
  checks: [
    { id: "sc1",  label: "MFA active pour tous les admins",      status: "pass"    as const },
    { id: "sc2",  label: "SSO / SAML configure",                 status: "pass"    as const },
    { id: "sc3",  label: "Audit logs actives",                   status: "pass"    as const },
    { id: "sc4",  label: "Rotation des cles API < 90 jours",     status: "pass"    as const },
    { id: "sc5",  label: "MFA active pour tous les membres",     status: "warning" as const },
    { id: "sc6",  label: "Restriction IP configuree",            status: "warning" as const },
    { id: "sc7",  label: "SCIM provisioning active",             status: "fail"    as const },
    { id: "sc8",  label: "Session timeout < 8h configure",       status: "pass"    as const },
  ],
  complianceReadiness: [
    { id: "cr1", label: "Chiffrement en transit (TLS 1.3)",            ready: true  },
    { id: "cr2", label: "Chiffrement au repos (AES-256)",               ready: true  },
    { id: "cr3", label: "Journalisation des acces",                     ready: true  },
    { id: "cr4", label: "Politique de retention des donnees",           ready: true  },
    { id: "cr5", label: "DPA (Data Processing Agreement) disponible",   ready: true  },
    { id: "cr6", label: "Hebergement EU (RGPD)",                        ready: true  },
    { id: "cr7", label: "Penetration test < 12 mois",                   ready: false },
    { id: "cr8", label: "Programme bug bounty actif",                   ready: false },
  ],
};

// ── Stats (landing) ───────────────────────────────────────────────────────────

export const DEMO_STATS = [
  { value: "3 400+",  label: "Equipes actives" },
  { value: "99.98%",  label: "Uptime SLA" },
  { value: "47 M €",  label: "MRR suivi" },
  { value: "4.8/5",   label: "Note clients" },
];

// ── Testimonials ──────────────────────────────────────────────────────────────

export const DEMO_TESTIMONIALS = [
  { quote: "LaunchPilot nous a permis de detecter 3 churns a risque avant qu'ils ne resilient. Essentiel.", author: "Julie M.", role: "Head of Growth, Nexgen SAS" },
  { quote: "On a branche Stripe et HubSpot en 10 minutes. Le dashboard etait pret pour le board le lendemain.", author: "Marc D.", role: "Fondateur, DataStack Inc." },
  { quote: "La vue usage par client nous a aide a redesigner notre pricing. ROI immediat.", author: "Sara K.", role: "Product Lead, Orion Metrics" },
];

// ── FAQ ───────────────────────────────────────────────────────────────────────

export const DEMO_FAQ = [
  {
    q: "Les donnees sont-elles reelles ?",
    a: "Non. Toutes les donnees presentees ici sont fictives et generees pour la demonstration. Aucune charge reelle n'est effectuee.",
  },
  {
    q: "Comment connecter mon compte Stripe ?",
    a: "Dans Settings > Integrations, cliquez sur Stripe et entrez votre cle API restreinte. LaunchPilot synchronise vos abonnements en temps reel.",
  },
  {
    q: "LaunchPilot supporte-t-il plusieurs workspaces ?",
    a: "Oui. Chaque workspace a ses propres membres, integrations et donnees. Vous pouvez basculer entre workspaces depuis le menu principal.",
  },
  {
    q: "Puis-je exporter mes donnees ?",
    a: "Oui. Export CSV et JSON disponibles sur tous les plans Growth et superieur. API disponible pour integrations personnalisees.",
  },
  {
    q: "Qu'est-ce qu'un signal de churn ?",
    a: "LaunchPilot detecte automatiquement les patterns d'usage qui precedent un churn: baisse d'activation, absence de login, usage API chute, etc.",
  },
  {
    q: "Le plan Starter est-il vraiment gratuit ?",
    a: "Oui, sans carte de credit. Limite a 50 clients suivis et 5 000 requetes/mois. Passez a Growth pour lever les limites.",
  },
];

// ── Nav items for SaaS demo shell ─────────────────────────────────────────────

export const SAAS_NAV_ITEMS = [
  { href: "/demo/saas",           label: "Landing",    exact: true  },
  { href: "/demo/saas/dashboard", label: "Dashboard",  exact: false },
  { href: "/demo/saas/billing",   label: "Billing",    exact: false },
  { href: "/demo/saas/usage",     label: "Usage",      exact: false },
  { href: "/demo/saas/security",  label: "Security",   exact: false },
  { href: "/demo/saas/settings",  label: "Settings",   exact: false },
];
