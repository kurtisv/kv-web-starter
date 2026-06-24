import type { Metadata } from "next";
import { Clock, Mail, MessageCircle } from "lucide-react";

import { sendContactMessage } from "@/app/actions/contact";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez-nous pour toute question sur le boilerplate ou un projet personnalisé.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: Promise<{ success?: string; error?: string }>;
}) {
  const params = (await searchParams) ?? {};

  return (
    <MarketingPageShell>
      <main>

        {params.success === "1" && (
          <div className="mx-auto max-w-6xl px-6 pt-6">
            <Alert variant="success" title="Message envoye">
              Merci, votre message a bien ete recu. Reponse sous 24 heures ouvrables.
            </Alert>
          </div>
        )}

        {/* Hero */}
        <section className="border-b theme-hero">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <Badge className="mb-4 border-background/20 bg-background/10 text-background">Contact</Badge>
            <h1 className="text-4xl font-semibold sm:text-5xl">On se parle.</h1>
            <p className="mt-4 max-w-xl text-lg opacity-70">
              Une question sur le boilerplate, un projet a discuter, ou juste un retour ?
              Reponds sous 24 heures ouvrables.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-14">

            {/* Left: info */}
            <div className="grid content-start gap-4">
              <div className="border p-5">
                <div className="flex items-center gap-3">
                  <Mail className="size-5 shrink-0" />
                  <span className="font-medium">Email direct</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">contact@exemple.com</p>
              </div>
              <div className="border p-5">
                <div className="flex items-center gap-3">
                  <Clock className="size-5 shrink-0" />
                  <span className="font-medium">Delai de réponse</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Sous 24 heures ouvrables, du lundi au vendredi.</p>
              </div>
              <div className="border p-5">
                <div className="flex items-center gap-3">
                  <MessageCircle className="size-5 shrink-0" />
                  <span className="font-medium">Deja client</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Gere ton abonnement directement depuis le{" "}
                  <a href="/dashboard" className="font-medium text-foreground underline underline-offset-2">
                    dashboard
                  </a>
                  .
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                Ce formulaire est connecte a Resend. Sans cle API, les messages sont
                ignores proprement en dev.
              </p>
            </div>

            {/* Right: form */}
            <Card>
              <CardHeader>
                <CardTitle>Envoyer un message</CardTitle>
                <CardDescription>Tous les champs sont requis.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form action={sendContactMessage}>
                  <FormField>
                    <Label htmlFor="name">Nom complet</Label>
                    <Input id="name" name="name" placeholder="Marie Tremblay" required autoComplete="name" />
                  </FormField>
                  <FormField>
                    <Label htmlFor="email">Adresse email</Label>
                    <Input id="email" name="email" type="email" placeholder="marie@exemple.com" required autoComplete="email" />
                  </FormField>
                  <FormField>
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" name="message" placeholder="Decris ton projet ou ta question..." required rows={5} />
                  </FormField>
                  <Button type="submit" className="w-full">Envoyer le message</Button>
                </Form>
              </CardContent>
            </Card>

          </div>
        </section>

      </main>
    </MarketingPageShell>
  );
}
