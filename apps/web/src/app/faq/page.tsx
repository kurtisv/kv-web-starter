import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Section } from "@/components/marketing/section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "FAQ — KV Studio",
  description: "Questions fréquentes sur le déroulement d'un projet, les délais, les paiements et le support.",
};

const faqs = [
  {
    q: "Comment se passe un projet ?",
    a: "Tout commence par un appel gratuit de 30 minutes pour comprendre votre besoin. Ensuite je vous envoie une proposition détaillée avec le périmètre, les jalons et le prix. Une fois validée, je développe par itérations rapides avec des démos régulières et un accès au repo. À la fin : déploiement, documentation et passation.",
  },
  {
    q: "Quel est ton délai de livraison ?",
    a: "Un site vitrine : 1 à 2 semaines. Un site avec réservations et paiements : 2 à 4 semaines. Une application mobile : 4 à 8 semaines. Je livre vite parce que je m'appuie sur mes propres outils et boilerplates — comme KV Web Starter — qui éliminent des semaines de mise en place.",
  },
  {
    q: "Tu travailles seul ou avec une équipe ?",
    a: "Je travaille principalement en solo, ce qui veut dire un seul interlocuteur, une communication directe et zéro friction. Pour les projets plus gros, je m'entoure de collaborateurs de confiance (design, contenu) tout en restant votre point de contact unique.",
  },
  {
    q: "Peut-on reprendre un projet existant ?",
    a: "Oui. Je peux reprendre un projet déjà commencé, corriger une base existante ou ajouter des fonctionnalités à un produit en production. Je commence toujours par un audit du code pour évaluer l'état des lieux et vous dire honnêtement ce qui vaut la peine d'être gardé.",
  },
  {
    q: "Quels sont tes modes de paiement ?",
    a: "Pour un projet à forfait : 50% au démarrage, 50% à la livraison. Pour un engagement mensuel : facturation au début de chaque mois. J'accepte les virements et les paiements par carte. Tous les montants sont en dollars (CAD/USD selon votre localisation).",
  },
  {
    q: "Que se passe-t-il après la livraison ?",
    a: "Chaque projet inclut 30 jours de support post-livraison pour corriger tout bug éventuel sans frais. Au-delà, je propose un forfait de maintenance mensuel : mises à jour, monitoring, ajout de fonctionnalités et support prioritaire. Vous n'êtes jamais laissé seul avec votre produit.",
  },
];

export default function FaqPage() {
  return (
    <MarketingPageShell>
      <main>
        <section className="border-b bg-foreground text-background">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <Badge className="mb-5 border-background/20 bg-background/10 text-background">FAQ</Badge>
            <h1 className="text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
              Les vraies questions,<br className="hidden sm:block" />
              repondues clairement.
            </h1>
            <p className="mt-5 max-w-2xl text-lg opacity-70">
              Pour les developpeurs, les agences et les clients qui veulent comprendre
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
