import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { env } from "@/lib/env";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: env.AUTH_SECRET ?? "development-only-secret-change-before-production",
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Demo credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = z
          .object({
            email: z.string().email(),
            password: z.string().min(8),
          })
          .safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const isDemoUser =
          parsed.data.email === env.AUTH_DEMO_EMAIL &&
          parsed.data.password === env.AUTH_DEMO_PASSWORD;

        if (!isDemoUser) {
          return null;
        }

        return {
          id: "demo-admin",
          name: "Demo Admin",
          email: env.AUTH_DEMO_EMAIL,
        };
      },
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return Boolean(auth?.user);
    },
  },
});
