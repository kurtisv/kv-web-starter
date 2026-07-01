"use client";

import * as React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "kv-cookie-consent";

export interface CookieConsent {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  savedAt: string;
}

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CookieConsent) : null;
  } catch {
    return null;
  }
}

interface CookieBannerProps {
  className?: string;
  onAccept?: (consent: CookieConsent) => void;
}

export function CookieBanner({ className, onAccept }: CookieBannerProps) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const save = (analytics: boolean, marketing: boolean) => {
    const consent: CookieConsent = {
      necessary: true,
      analytics,
      marketing,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    setVisible(false);
    onAccept?.(consent);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-6 sm:max-w-sm",
            "border bg-background shadow-lg",
            className,
          )}
          role="dialog"
          aria-label="Gestion des cookies"
          aria-live="polite"
        >
          <button
            type="button"
            onClick={() => save(false, false)}
            className="absolute right-3 top-3 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Fermer"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="p-4 pr-8">
            <p className="mb-1 text-sm font-semibold">Cookies et confidentialite</p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Nous utilisons des cookies necessaires au fonctionnement du site, ainsi que des
              cookies analytiques (anonymes) pour ameliorer l&apos;experience.{" "}
              <a href="/privacy" className="underline hover:no-underline">
                En savoir plus
              </a>
            </p>
          </div>

          <div className="flex gap-2 border-t px-4 py-3">
            <Button size="sm" onClick={() => save(true, false)} className="flex-1">
              Accepter
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => save(false, false)}
              className="flex-1 text-xs"
            >
              Necessaires uniquement
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
