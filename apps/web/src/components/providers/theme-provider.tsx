"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

import { THEMES, type ThemeId } from "@/design-system/tokens";

const COOKIE_NAME = "kv-theme";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
const DEFAULT_THEME: ThemeId = "premium-saas";

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
});

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}

export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme?: string;
}) {
  const resolved = (THEMES as readonly string[]).includes(initialTheme ?? "")
    ? (initialTheme as ThemeId)
    : DEFAULT_THEME;

  const [theme, setThemeState] = useState<ThemeId>(resolved);

  const setTheme = useCallback((next: ThemeId) => {
    setThemeState(next);
    document.documentElement.setAttribute("data-theme", next);
    document.cookie = `${COOKIE_NAME}=${next}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
