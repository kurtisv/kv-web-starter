"use client";

import * as React from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";
import { cn } from "@/lib/utils";

export interface CartButtonProps {
  className?: string;
}

export function CartButton({ className }: CartButtonProps) {
  const { totalItems, setDrawerOpen } = useCart();

  return (
    <button
      type="button"
      aria-label={
        totalItems > 0
          ? `Panier — ${totalItems} article${totalItems > 1 ? "s" : ""}`
          : "Panier"
      }
      onClick={() => setDrawerOpen(true)}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        className
      )}
    >
      <ShoppingCart className="h-4 w-4" />
      {totalItems > 0 && (
        <span
          aria-hidden
          className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold leading-none text-primary-foreground"
        >
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </button>
  );
}
