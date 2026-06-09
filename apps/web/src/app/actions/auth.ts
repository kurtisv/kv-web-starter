"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

import { env } from "@/lib/env";
import { signIn, signOut, auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function signInWithCredentials(formData: FormData) {
  if (!env.AUTH_ENABLE_DEMO_LOGIN) {
    redirect("/login?error=CredentialsSignin");
  }

  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect("/login?error=CredentialsSignin");
    }
    throw error;
  }
}

export async function signInWithGitHub() {
  await signIn("github", { redirectTo: "/dashboard" });
}

export async function signOutCurrentUser() {
  const session = await auth();
  const userId = session?.user?.email ?? null;

  try {
    await prisma.auditLog.create({
      data: {
        actorId: userId,
        action: "auth.signout",
        target: "user",
        metadata: { email: userId },
      },
    });
  } catch {
    // Audit logging must not block sign-out.
  }

  await signOut({ redirectTo: "/" });
}
