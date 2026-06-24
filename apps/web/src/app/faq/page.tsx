import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Section } from "@/components/marketing/section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Questions frequentes sur le boilerplate, ses fonctionnalites, ses couts et son utilisation.",
};

const faqs = [
  {
    q: "C'est quoi un boilerplate ?",
    a: "C'est un point de depart preconfigure. Au lieu de construire un site de zero — connexion, paiements, emails, securite — tout ca est deja fait. Tu arrives avec ton projet client, tu personalises, et tu livres en jours.",
  },
  {
    q: "Je ne sais pas coder. Est-ce fait pour moi ?",
    a: "Ce projet est destine aux Développeurs ou aux agences qui creent des sites pour leurs clients. Si tu n'es pas développeur, trouve quelqu'un qui l'est — il ou elle gagnera plusieurs semaines de travail grace a cette base.",
  },
  {
    q: "Combien de temps pour livrer un site avec ce boilerplate ?",
    a: "Un site vitrine : 1-2 jours. Un site avec Réservations et paiements : 3-5 jours. Un portail API complet : 5-10 jours. Sans boilerplate, les memes fonctionnalites prendraient 4 a 12 semaines.",
  },
  {
    q: "Peut-on l'utiliser pour plusieurs projets clients ?",
    a: "Oui. C'est exactement pour ca qu'il est concu. A chaque nouveau client, tu copies la base, tu actives les modules dont il a besoin, et tu personalises les textes, les couleurs et le contenu.",
  },
  {
    q: "Qu'est-ce que ca coute en dehors du developpement ?",
    a: "Le boilerplate est gratuit. Pour mettre le site en ligne, tu as besoin : d'un hebergement (Vercel, gratuit ou environ 20$/mois), d'une base de donnees (Supabase, gratuit ou environ 25$/mois). Selon les modules actives : Stripe prend une commission sur les ventes, Resend est gratuit jusqu'a 3000 emails/mois, Sentry est gratuit jusqu'a 5000 erreurs/mois.",
  },
  {
    q: "Peut-on cacher un module qu'on n'utilise pas ?",
    a: "Oui. Chaque module (Réservations, paiements, API, CMS) est controle par une variable d'environnement. Si tu n'actives pas FEATURE_BOOKING, la page de Réservation et toutes les fonctions associees restent invisibles. Aucun code mort n'est expose.",
  },
  {
    q: "Le site fonctionne-t-il sur telephone ?",
    a: "Oui. Toutes les pages sont concues en mobile-first : elles s'adaptent automatiquement aux ecrans de toutes tailles. Le dashboard a aussi une navigation mobile avec menu hamburger.",
  },
  {
    q: "Comment personaliser les couleurs et la marque du client ?",
    a: "Les couleurs, polices et espacements sont definis dans un fichier de variables CSS. Changer la couleur principale du site se fait en modifiant une ligne. Les composants utilisent automatiquement ces variables — pas besoin de chercher partout dans le code.",
  },
  {
    q: "Est-ce que le site est optimise pour Google ?",
    a: "Oui. Chaque page a ses propres titre, description et balises Open Graph. Le sitemap.xml et le robots.txt sont générés automatiquement. Les pages se chargent rapidement grace au rendu cote serveur (Server Components).",
  },
  {
    q: "Sanity CMS est-il nécessaire ?",
    a: "Non. Sanity est une option pour les clients qui veulent modifier eux-memes les textes et images du site sans toucher au code. Si ton client n'en a pas besoin, tu n'actives pas cette fonctionnalite.",
  },
  {
    q: "Est-ce que les paiements Stripe fonctionnent vraiment ?",
    a: "Oui, le module billing est complet : checkout sécurisé, webhooks pour mettre a jour les Accès en temps reel, portail client pour gerer l'abonnement, et support des periodes d'essai. Il faut ton propre compte Stripe — les cles sont renseignees dans le fichier de configuration.",
  },
  {
    q: "Comment tester le site avant de le livrer ?",
    a: "Le boilerplate inclut une suite de tests automatises (tests unitaires et tests end-to-end dans un vrai navigateur). Une checklist de 60 points couvre la securite, le SEO, les paiements, les emails et les parcours critiques. Un compte demo est disponible pour tester le dashboard sans base de donnees configuree.",
  },
];

export default function FaqPage() {
  return (
    <MarketingPageShell>
      <main>
        <section className="border-b theme-hero">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <Badge className="mb-5 border-background/20 bg-background/10 text-background">FAQ</Badge>
            <h1 className="text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
              Les vraies questions,<br className="hidden sm:block" />
              repondues clairement.
            </h1>
            <p className="mt-5 max-w-2xl text-lg opacity-70">
              Pour les Développeurs, les agences et les clients qui veulent comprendre
              ce qu&apos;ils obtiennent avant de commencer.
            </p>
          </div>
        </section>

        <Section>
          <Accordion className="mt-0">
            {faqs.map(({ q, a }) => (
              <AccordionItem key={q}>
                <AccordionTrigger>{q}</AccordionTrigger>
                <AccordionContent>{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/docs">
                Lire le guide complet <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/contact">Poser une question</Link>
            </Button>
          </div>
        </Section>
      </main>
    </MarketingPageShell>
  );
}
