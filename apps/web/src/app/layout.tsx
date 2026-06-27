import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import { NotificationsProvider } from "@/components/providers/notifications-provider";
import { CookieBanner } from "@/components/ui/cookie-banner";
import { PageTransition } from "@/components/animations/page-transition";
import { THEMES, type ThemeId } from "@/design-system/tokens";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "KV Web Starter",
    template: "%s | KV Web Starter",
  },
  description:
    "Premium modular boilerplate for marketing, booking, and SaaS/API projects.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const jar = await cookies();
  const rawTheme = jar.get("kv-theme")?.value;
  const theme = (THEMES as readonly string[]).includes(rawTheme ?? "")
    ? (rawTheme as ThemeId)
    : "premium-saas";

  return (
    <html
      lang={locale}
      data-theme={theme}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider initialTheme={theme}>
            <NotificationsProvider>
              <PageTransition>{children}</PageTransition>
              <ToastProvider />
              <CookieBanner />
            </NotificationsProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
