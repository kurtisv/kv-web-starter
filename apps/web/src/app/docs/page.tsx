import { BookOpen, Code2, KeyRound } from "lucide-react";
import Link from "next/link";

import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const endpoints = [
  {
    method: "GET",
    path: "/api/v1/demo",
    scope: "demo:read",
    description: "Endpoint de demonstration protege par cle API optionnelle.",
  },
];

export default function DocsPage() {
  return (
    <MarketingPageShell>
      <main>
        <section className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-16">
          <div className="max-w-3xl">
            <Badge>OpenAPI 3.1</Badge>
            <h1 className="mt-5 text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
              Documentation API prete pour Scalar.
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              La specification JSON est servie par le boilerplate et peut etre
              branchee a Scalar ou a un portail docs interactif.
            </p>
          </div>

          <section className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <BookOpen className="size-4" />
                  Spec
                </CardTitle>
                <CardDescription>
                  <Link href="/api/openapi" className="underline underline-offset-4">
                    /api/openapi
                  </Link>
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <KeyRound className="size-4" />
                  Auth
                </CardTitle>
                <CardDescription>Bearer token ou header x-api-key.</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Code2 className="size-4" />
                  Versioning
                </CardTitle>
                <CardDescription>Tous les endpoints publics vivent sous /api/v1.</CardDescription>
              </CardHeader>
            </Card>
          </section>

          <Card>
            <CardHeader>
              <CardTitle>Endpoints</CardTitle>
              <CardDescription>Surface de depart documentee dans OpenAPI.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {endpoints.map((endpoint) => (
                <div key={endpoint.path} className="grid gap-2 border p-4 md:grid-cols-[100px_1fr_140px]">
                  <Badge>{endpoint.method}</Badge>
                  <div>
                    <code className="text-sm">{endpoint.path}</code>
                    <p className="mt-1 text-sm text-muted-foreground">{endpoint.description}</p>
                  </div>
                  <Badge>{endpoint.scope}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>
    </MarketingPageShell>
  );
}
