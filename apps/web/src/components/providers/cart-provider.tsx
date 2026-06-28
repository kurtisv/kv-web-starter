"use client";

import * as React from "react";

export interface CartItem {
  id: string;
  name: string;
  priceCents: number;
  quantity: number;
  image?: string;
  maxQuantity?: number;
}

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  subtotalCents: number;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  add: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  remove: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clear: () => void;
}

export const CartContext = React.createContext<CartContextValue | null>(null);

const STORAGE_KEY = "kv-cart";

function load(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch { return []; }
}

function save(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch { /* noop */ }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      setItems(load());
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (hydrated) save(items);
  }, [items, hydrated]);

  const add = React.useCallback(
    (payload: Omit<CartItem, "quantity"> & { quantity?: number }) => {
      const qty = payload.quantity ?? 1;
      setItems((prev) => {
        const existing = prev.find((i) => i.id === payload.id);
        if (existing) {
          const max = existing.maxQuantity ?? Infinity;
          return prev.map((i) =>
            i.id === payload.id
              ? { ...i, quantity: Math.min(i.quantity + qty, max) }
              : i
          );
        }
        return [...prev, { ...payload, quantity: qty }];
      });
    },
    []
  );

  const remove = React.useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = React.useCallback((id: string, qty: number) => {
    if (qty <= 0) { remove(id); return; }
    setItems((prev) =>
      prev.map((i) => {
        if (i.id !== id) return i;
        const max = i.maxQuantity ?? Infinity;
        return { ...i, quantity: Math.min(qty, max) };
      })
    );
  }, [remove]);

  const clear = React.useCallback(() => setItems([]), []);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const subtotalCents = items.reduce((s, i) => s + i.priceCents * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, totalItems, subtotalCents, drawerOpen, setDrawerOpen, add, remove, updateQuantity, clear }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
