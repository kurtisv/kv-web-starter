"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/components/providers/cart-provider";
import { formatPrice } from "@/components/ecommerce/price-display";
import { QuantityStepper } from "@/components/ecommerce/quantity-stepper";

export function CartDrawer() {
  const { items, subtotalCents, drawerOpen, setDrawerOpen, remove, updateQuantity, clear } =
    useCart();

  const close = () => setDrawerOpen(false);

  React.useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerOpen]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />

          {/* Panel */}
          <motion.div
            key="cart-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Panier"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l bg-background shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b px-5 py-4">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                <span className="font-medium">Panier</span>
                {items.length > 0 && (
                  <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium">
                    {items.reduce((s, i) => s + i.quantity, 0)} article{items.length > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <button
                type="button"
                aria-label="Fermer le panier"
                onClick={close}
                className="flex h-7 w-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-16 text-center text-muted-foreground">
                  <ShoppingCart className="h-10 w-10 opacity-20" />
                  <p className="text-sm">Votre panier est vide.</p>
                </div>
              ) : (
                <ul className="divide-y">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-3 px-5 py-4">
                      {item.image && (
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden border bg-muted">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{item.name}</p>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {formatPrice(item.priceCents)}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <QuantityStepper
                            value={item.quantity}
                            onChange={(qty) => updateQuantity(item.id, qty)}
                            max={item.maxQuantity ?? 99}
                            size="sm"
                          />
                          <button
                            type="button"
                            aria-label="Retirer"
                            onClick={() => remove(item.id)}
                            className="ml-auto text-muted-foreground transition-colors hover:text-destructive"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t px-5 py-4">
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span className="font-semibold">{formatPrice(subtotalCents)}</span>
                </div>
                <p className="mb-4 text-xs text-muted-foreground">
                  Livraison et taxes calculees a la commande.
                </p>
                <div className="grid gap-2">
                  <Button className="w-full" onClick={close}>
                    Passer la commande
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-muted-foreground"
                    onClick={() => { clear(); close(); }}
                  >
                    Vider le panier
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
