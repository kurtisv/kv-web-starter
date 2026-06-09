import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { LoginForm } from "@/app/login/login-form";
import { auth } from "@/lib/auth";
import { env } from "@/lib/env";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Acces a votre espace administrateur.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  const params = await searchParams;

  return (
    <LoginForm
      authError={params.error}
      hasGitHub={!!(env.AUTH_GITHUB_ID && env.AUTH_GITHUB_SECRET)}
      hasDemoLogin={env.AUTH_ENABLE_DEMO_LOGIN}
      demoEmail={env.AUTH_DEMO_EMAIL}
      demoPassword={env.AUTH_DEMO_PASSWORD}
    />
  );
}
