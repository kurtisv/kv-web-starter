import type { NextAuthConfig } from "next-auth";

// Edge-compatible config — no Node-specific imports.
// Used by middleware.ts for JWT verification without touching the database.
// Full config with PrismaAdapter lives in auth.ts.
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      if (nextUrl.pathname.startsWith("/dashboard")) {
        return isLoggedIn;
      }
      return true;
    },
  },
  providers: [],
};
