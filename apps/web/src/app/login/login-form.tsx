"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { signInWithCredentials, signInWithGitHub } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormMessage, FormBanner } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatedFormFields } from "@/components/animations/animated-form-fields";

const credentialsSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Minimum 8 caracteres"),
});

type CredentialsFormData = z.infer<typeof credentialsSchema>;

type LoginFormProps = {
  authError?: string;
  hasGitHub: boolean;
  hasDemoLogin: boolean;
  demoEmail: string;
  demoPassword?: string;
};

export function LoginForm({
  authError,
  hasGitHub,
  hasDemoLogin,
  demoEmail,
  demoPassword,
}: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CredentialsFormData>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: {
      email: demoEmail,
      password: demoPassword ?? "",
    },
  });

  const onSubmit = async (data: CredentialsFormData) => {
    const formData = new FormData();
    formData.set("email", data.email);
    formData.set("password", data.password);
    await signInWithCredentials(formData);
  };

  return (
    <main className="flex min-h-screen">

      {/* Left — dark branding panel */}
      <div className="hidden bg-foreground text-background lg:flex lg:w-1/2 lg:flex-col lg:justify-between lg:p-12">
        <Link href="/" className="text-base font-semibold hover:opacity-80">
          KV Web Starter
        </Link>
        <div>
          <p className="text-sm uppercase tracking-widest opacity-40 mb-4">Acces administrateur</p>
          <h2 className="text-3xl font-semibold tracking-tight leading-snug">
            Ton prochain projet,<br />deja a moitie fait.
          </h2>
          <p className="mt-5 text-base leading-7 opacity-60">
            Reservations, paiements, portail API et dashboard — tout est pret.
            Tu n&apos;as qu&apos;a personnaliser et livrer.
          </p>
          <ul className="mt-8 grid gap-2.5">
            {[
              "Reservations et creneaux en ligne",
              "Paiements Stripe configures",
              "Cles API avec rate limiting",
              "Dashboard complet",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm opacity-70">
                <span className="size-1.5 shrink-0 rounded-full bg-background/60" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs opacity-30">
          &copy; {new Date().getFullYear()} KV Web Starter
        </p>
      </div>

      {/* Right — form */}
      <div className="flex w-full flex-col items-center justify-center bg-background px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-sm">

          {/* Mobile back link */}
          <Link
            href="/"
            className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground lg:hidden"
          >
            <ArrowLeft className="size-4" />
            Retour au site
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-semibold">Connexion</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Acces a votre espace administrateur.
            </p>
          </div>

          <FormBanner variant="error" className="mb-5">
            {authError ? "Identifiants invalides. Verifie ton email et mot de passe." : null}
          </FormBanner>

          <div className="grid gap-4">
            {hasGitHub ? (
              <form action={signInWithGitHub}>
                <Button className="w-full" type="submit">
                  Se connecter avec GitHub
                </Button>
              </form>
            ) : null}

            {hasDemoLogin ? (
              <Form onSubmit={handleSubmit(onSubmit)} className="contents">
                {hasGitHub && (
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs text-muted-foreground">
                      <span className="bg-background px-2">ou</span>
                    </div>
                  </div>
                )}

                <AnimatedFormFields>
                  <FormField>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="admin@example.com"
                      {...register("email")}
                    />
                    <FormMessage>{errors.email?.message}</FormMessage>
                  </FormField>

                  <FormField>
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="Minimum 8 caracteres"
                      {...register("password")}
                    />
                    <FormMessage>{errors.password?.message}</FormMessage>
                  </FormField>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Connexion..." : "Se connecter"}
                  </Button>
                </AnimatedFormFields>
              </Form>
            ) : null}

            {!hasGitHub && !hasDemoLogin ? (
              <p className="text-sm text-muted-foreground">
                Aucune methode de connexion configuree. Definissez{" "}
                <code className="text-xs">AUTH_GITHUB_ID</code> ou{" "}
                <code className="text-xs">AUTH_ENABLE_DEMO_LOGIN=true</code>.
              </p>
            ) : null}
          </div>

          <Link
            href="/"
            className="mt-8 flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3" />
            Retour au site
          </Link>
        </div>
      </div>

    </main>
  );
}
