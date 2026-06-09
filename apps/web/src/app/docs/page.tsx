import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Code2,
  CreditCard,
  Globe,
  KeyRound,
  LayoutDashboard,
  Lock,
  Mail,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MarketingPageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Guide",
  description:
    "Comprendre KV Web Starter : ce que c'est, pour qui, et ce que tu obtiens sans ecrire une ligne de code.",
};

// ------------------------------------------------------------------ data

const personas = [
  {
    icon: CalendarDays,
    who: "Tu geres un service avec rendez-vous",
    examples: "Coiffeur, clinique, coach, garage, notaire...",
    gets: "Un formulaire de reservation en ligne. Tes clients choisissent leur creneau, payent, et recoivent un email de confirmation automatiquement.",
    module: "Module Reservations",
    href: "/booking",
  },
  {
    icon: Zap,
    who: "Tu lances un SaaS ou une API",
    examples: "Startup tech, developpeur indie, agence...",
    gets: "Un systeme de plans payants, des cles d'acces securisees, un dashboard pour suivre l'utilisation, et une documentation integree.",
    module: "Module API + Billing",
    href: "/pricing",
  },
  {
    icon: Globe,
    who: "Tu veux un site professionnel",
    examples: "PME, agence marketing, portfolio, restaurant...",
    gets: "Toutes les pages deja construites : accueil, services, FAQ, contact, mentions legales. Optimisees pour Google et rapides sur mobile.",
    module: "Module Vitrine",
    href: "/services",
  },
  {
    icon: Users,
    who: "Tu veux tout en meme temps",
    examples: "Salon avec boutique, plateforme complete...",
    gets: "Les 4 modules s'utilisent ensemble ou separement. Active uniquement ce dont tu as besoin — le reste reste cache.",
    module: "Tout inclus",
    href: "/overview",
  },
];

const alreadyBuilt = [
  { icon: Lock, label: "Connexion securisee", desc: "Email, GitHub OAuth, ou compte demo pour les tests" },
  { icon: LayoutDashboard, label: "Dashboard admin", desc: "Interface pour gerer reservations, clients et statistiques" },
  { icon: CalendarDays, label: "Systeme de reservation", desc: "Creneaux, staff, horaires, exceptions — tout configurable" },
  { icon: CreditCard, label: "Paiements Stripe", desc: "Checkout, abonnements, factures et portail client" },
  { icon: Mail, label: "Emails automatiques", desc: "Confirmations, rappels et transactionnels via Resend" },
  { icon: KeyRound, label: "Cles API", desc: "Generer et gerer des cles d'acces securisees avec limites" },
  { icon: ShieldCheck, label: "Securite integree", desc: "Protection des pages, entetes de securite, journaux d'audit" },
  { icon: Code2, label: "Documentation API", desc: "Pages de docs interactives generees automatiquement" },
  { icon: Globe, label: "SEO complet", desc: "Sitemap, balises Open Graph, metadata par page" },
  { icon: Users, label: "Multi-roles", desc: "Proprietaire, admin, membre — acces differencies" },
  { icon: Zap, label: "Bilingue EN/FR", desc: "Toutes les pages et messages dans les deux langues" },
  { icon: CheckCircle2, label: "Tests inclus", desc: "Suite de tests automatises pour eviter les regressions" },
];

const modules = [
  {
    icon: Globe,
    name: "Site vitrine",
    flag: "Actif par defaut",
    flagColor: "text-green-600",
    what: "Toutes les pages qu'un site professionnel doit avoir : accueil, services, temoignages, FAQ, contact, mentions legales et politique de confidentialite.",
    why: "Au lieu de payer un developpeur pour construire ces pages une par une, elles sont deja la. Tu changes les textes, les couleurs, les photos — c'est tout.",
    includes: [
      "Page d'accueil avec sections hero, modules et CTA",
      "Page services avec cartes et descriptions",
      "Formulaire de contact envoye par email (Resend)",
      "FAQ, mentions legales, politique de confidentialite",
      "Navigation et pied de page responsive",
      "Score SEO optimise (titre, description, sitemap)",
    ],
  },
  {
    icon: CalendarDays,
    name: "Reservations",
    flag: "Activer avec FEATURE_BOOKING=true",
    flagColor: "text-blue-600",
    what: "Ton client arrive sur le site, choisit un service, voit les creneaux disponibles, reserve et paye. Toi, tu le vois dans ton dashboard.",
    why: "Plus besoin de Calendly ou de repondre aux messages un par un. Tout est centralise et automatique.",
    includes: [
      "Page publique de reservation avec calendrier",
      "Gestion des services (nom, duree, prix)",
      "Gestion du staff et de leurs horaires",
      "Exceptions et jours feries",
      "Paiement integre au moment de la reservation",
      "Email de confirmation automatique au client",
    ],
  },
  {
    icon: CreditCard,
    name: "Paiements et abonnements",
    flag: "Activer avec FEATURE_BILLING=true",
    flagColor: "text-purple-600",
    what: "Propose des plans mensuels ou annuels. Tes clients s'abonnent, leur carte est debitee automatiquement, et ils peuvent gerer leur abonnement eux-memes.",
    why: "Stripe est le systeme de paiement le plus fiable du marche. Son integration prend normalement des semaines — ici c'est deja fait.",
    includes: [
      "3 plans configurables (Starter, Pro, Business)",
      "Checkout Stripe securise",
      "Webhook pour mettre a jour l'acces en temps reel",
      "Portail client pour modifier ou annuler",
      "Historique des paiements dans le dashboard",
      "Support des periodes d'essai",
    ],
  },
  {
    icon: KeyRound,
    name: "API et portail developpeur",
    flag: "Activer avec FEATURE_API_PORTAL=true",
    flagColor: "text-orange-600",
    what: "Vends l'acces a tes donnees ou services via une API. Tes clients creent leurs cles d'acces, les utilisent dans leur code, et toi tu vois chaque appel dans le dashboard.",
    why: "Pour les startups qui veulent monetiser leurs donnees (scores, indices, previsions) sans se batir une infrastructure de zero.",
    includes: [
      "Cles API generees et securisees",
      "Limites d'utilisation par plan",
      "Compteur d'appels en temps reel",
      "Documentation interactive (tester dans le navigateur)",
      "Endpoint de demonstration inclus",
      "Gestion des permissions par cle",
    ],
  },
];

const setupSteps = [
  {
    n: "01",
    title: "Copier le boilerplate",
    plain: "Tu recuperes une copie complete du projet sur ton ordinateur. C'est comme telecharger un modele — sauf que c'est un site web complet.",
    cmd: "git clone https://github.com/ton-compte/kv-web-starter mon-projet",
  },
  {
    n: "02",
    title: "Configurer les services",
    plain: "Tu remplis un fichier avec tes cles de connexion : base de donnees, compte Stripe, compte email. Chaque cle est expliquee avec son utilite.",
    cmd: "copy .env.example .env",
  },
  {
    n: "03",
    title: "Creer la base de donnees",
    plain: "La structure de ta base de donnees est creee automatiquement. Toutes les tables (utilisateurs, reservations, paiements) sont deja definies.",
    cmd: "pnpm db:migrate && pnpm db:seed",
  },
  {
    n: "04",
    title: "Demarrer et voir le resultat",
    plain: "Lance le serveur et ouvre le site dans ton navigateur. Connecte-toi au dashboard, teste une reservation, explore les pages.",
    cmd: "pnpm dev",
  },
];

const beginnerFaqs = [
  {
    q: "Je ne sais pas coder. Est-ce fait pour moi ?",
    a: "Ce boilerplate est destine aux developpeurs ou aux agences qui creent des sites pour leurs clients. Si tu n'es pas developpeur, trouve quelqu'un qui l'est — il gagnera plusieurs semaines de travail grace a cette base.",
  },
  {
    q: "C'est quoi un boilerplate ?",
    a: "C'est un point de depart preconfigure. Imagine ouvrir un restaurant : au lieu de construire la salle depuis zero, tu loues un local deja amenage et tu installes ta carte. Un boilerplate c'est pareil pour un site web.",
  },
  {
    q: "Combien de temps pour livrer un site client ?",
    a: "Avec ce boilerplate, un developpeur experimente peut livrer un site vitrine en 1-2 jours, un site avec reservations et paiements en 3-5 jours. Sans boilerplate, les memes fonctionnalites prendraient 4 a 8 semaines.",
  },
  {
    q: "Peut-on l'utiliser pour plusieurs projets ?",
    a: "Oui. C'est exactement pour ca qu'il est concu. A chaque nouveau client, tu copies la base, tu actives les modules dont il a besoin, et tu personalises. Chaque projet est independant.",
  },
  {
    q: "Qu'est-ce que je dois payer en dehors ?",
    a: "Le boilerplate est gratuit. Pour mettre le site en ligne : hebergement Vercel (gratuit ou ~$20/mois), base de donnees Supabase (gratuit ou ~$25/mois), et selon les modules : Stripe (commission sur ventes), Resend (emails, gratuit jusqu'a 3000/mois).",
  },
  {
    q: "Le site fonctionne-t-il sur telephone ?",
    a: "Oui. Toutes les pages sont concues en mobile-first : elles s'adaptent automatiquement a tous les ecrans. Le dashboard aussi a une navigation mobile.",
  },
  {
    q: "Comment personaliser les couleurs et la marque ?",
    a: "Les couleurs, polices et espacements sont definis dans un seul fichier (variables CSS). Changer la couleur principale du site se fait en modifiant une ligne. Pas besoin de chercher partout dans le code.",
  },
];

// ------------------------------------------------------------------ page

export default function DocsPage() {
  return (
    <MarketingPageShell>
      <main>

        {/* Hero */}
        <section className="border-b bg-foreground text-background">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <Badge className="mb-5 border-background/20 bg-background/10 text-background">Guide complet</Badge>
            <h1 className="text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
              Comprendre KV Web Starter<br className="hidden sm:block" />
              sans jargon technique.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 opacity-70">
              Ce guide explique ce qu&apos;est ce boilerplate, ce qu&apos;on peut en faire,
              et pourquoi ca change vraiment quelque chose pour livrer des sites rapidement.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="bg-background text-foreground hover:bg-background/90">
                <Link href="/overview">
                  Voir l&apos;architecture <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-background/30 text-background hover:bg-background/10">
                <Link href="/docs/api">
                  <Code2 className="size-4" />
                  Reference API
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Analogie + chiffres */}
        <section className="mx-auto max-w-6xl px-6 py-14">
          <Badge>C&apos;est quoi ?</Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal">
            Une maison deja construite.<br className="hidden sm:block" />
            Tu n&apos;as qu&apos;a installer les meubles.
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <p className="leading-7 text-muted-foreground">
              Creer un site web professionnel de zero prend des mois : connexion utilisateur,
              paiements, emails, securite, base de donnees, dashboard... Chaque fonctionnalite
              demande des semaines de travail.
            </p>
            <p className="leading-7 text-muted-foreground">
              KV Web Starter, c&apos;est tout ca deja fait. Tu arrives avec ton projet client,
              tu actives les modules dont tu as besoin, tu personalises les textes et les
              couleurs — et tu livres en jours, pas en mois.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { before: "4-8 semaines", after: "2-5 jours", label: "Site avec reservations" },
              { before: "6-10 semaines", after: "3-7 jours", label: "SaaS avec paiements" },
              { before: "2-3 semaines", after: "1-2 jours", label: "Site vitrine" },
              { before: "8-12 semaines", after: "5-10 jours", label: "Portail API complet" },
            ].map((item) => (
              <div key={item.label} className="border bg-background p-4">
                <div className="text-xs text-muted-foreground line-through">{item.before}</div>
                <div className="mt-1 text-xl font-semibold">{item.after}</div>
                <div className="mt-1 text-xs text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Pour qui */}
        <section className="border-y bg-muted/40">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <Badge>Pour qui ?</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal">
              Reconnais-toi dans un de ces cas.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {personas.map((p) => (
                <Card key={p.who} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center border bg-background">
                        <p.icon className="size-4" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{p.who}</CardTitle>
                        <CardDescription className="mt-0.5 text-xs">{p.examples}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col gap-4">
                    <p className="text-sm text-muted-foreground">{p.gets}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <Badge className="text-xs">{p.module}</Badge>
                      <Button asChild variant="secondary" size="sm">
                        <Link href={p.href}>
                          Voir <ArrowRight className="size-3" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Deja fait */}
        <section className="mx-auto max-w-6xl px-6 py-14">
          <Badge>Deja construit</Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal">
            Tu n&apos;as pas a inventer ca.
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Voici ce qui est deja dans le boilerplate et qui fonctionne le jour ou tu clones le projet.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {alreadyBuilt.map((item) => (
              <div key={item.label} className="flex gap-3 border bg-background px-4 py-3">
                <item.icon className="mt-0.5 size-4 shrink-0 text-foreground/70" />
                <div>
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Les 4 modules */}
        <section className="border-y bg-secondary/30">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <Badge>Les 4 modules</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal">
              Active ce dont tu as besoin. Cache le reste.
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Chaque module est independant. Un salon de coiffure n&apos;a pas besoin du portail API.
              Une startup tech n&apos;a pas besoin du module de reservations. Tu choisis.
            </p>
            <div className="mt-8 grid gap-6">
              {modules.map((mod) => (
                <Card key={mod.name}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center border bg-background">
                        <mod.icon className="size-4" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{mod.name}</CardTitle>
                        <p className={`text-xs font-medium ${mod.flagColor}`}>{mod.flag}</p>
                      </div>
                    </div>
                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Ce que ca fait
                        </p>
                        <p className="mt-1 text-sm">{mod.what}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Pourquoi c&apos;est utile
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">{mod.why}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
                      {mod.includes.map((item) => (
                        <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-foreground/50" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Setup */}
        <section className="mx-auto max-w-6xl px-6 py-14">
          <Badge>Demarrage</Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal">
            4 etapes pour avoir le site en local.
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Pour les developpeurs qui veulent voir le site tourner sur leur machine.
          </p>
          <div className="mt-8 grid gap-4">
            {setupSteps.map((step) => (
              <div
                key={step.n}
                className="grid gap-4 border bg-background p-6 md:grid-cols-[auto_1fr_1fr]"
              >
                <div className="text-3xl font-semibold text-muted-foreground/30">{step.n}</div>
                <div>
                  <div className="font-medium">{step.title}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{step.plain}</p>
                </div>
                <pre className="self-center overflow-x-auto border bg-muted/50 p-3 text-xs">
                  <code>{step.cmd}</code>
                </pre>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="border-y bg-muted/40">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <Badge>Questions frequentes</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal">
              Les vraies questions, repondues clairement.
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {beginnerFaqs.map((faq) => (
                <div key={faq.q} className="border bg-background p-5">
                  <div className="font-medium">{faq.q}</div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h2 className="text-3xl font-semibold tracking-normal">
            Pret a voir ce que ca donne ?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Tous les modules sont visibles en demo dans ce site. Pas besoin de s&apos;inscrire pour explorer.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/booking">
                Essayer la reservation <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/pricing">Voir les plans</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/developers">Explorer l&apos;API</Link>
            </Button>
          </div>
        </section>

      </main>
    </MarketingPageShell>
  );
}
