"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/components/providers/cart-provider";
import { PriceDisplay } from "@/components/ecommerce/price-display";
import { RatingStars } from "@/components/ecommerce/rating-stars";
import { useToast } from "@/components/ui/use-toast";

export interface ProductItem {
  id: string;
  name: string;
  priceCents: number;
  originalPriceCents?: number;
  currency?: string;
  rating?: number;
  reviewCount?: number;
  image?: string;
  badge?: string | null;
  inStock?: boolean;
  href?: string;
}

export interface ProductCardProps {
  product: ProductItem;
  layout?: "grid" | "list";
  onAddToCart?: (product: ProductItem) => void;
  className?: string;
}

export function ProductCard({
  product,
  layout = "grid",
  onAddToCart,
  className,
}: ProductCardProps) {
  const cartCtx = React.useContext(CartContext);
  const { toast } = useToast();
  const [added, setAdded] = React.useState(false);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;

    if (onAddToCart) {
      onAddToCart(product);
    } else if (cartCtx) {
      cartCtx.add({
        id: product.id,
        name: product.name,
        priceCents: product.priceCents,
        image: product.image,
      });
    }

    setAdded(true);
    toast.success("Produit ajoute", product.name);
    setTimeout(() => setAdded(false), 1200);
  }

  const isList = layout === "list";

  const inner = (
    <div
      className={cn(
        "group overflow-hidden border bg-background rounded-lg transition-shadow hover:shadow-md",
        isList ? "flex gap-4" : "flex flex-col",
        className
      )}
    >
      {/* Image */}
      <div
        className={cn(
          "relative overflow-hidden bg-muted",
          isList ? "h-28 w-28 shrink-0" : "aspect-square border-b"
        )}
      >
        {product.image ? (
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes={isList ? "112px" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
            />
          </motion.div>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground/30">
            <ShoppingCart className="h-8 w-8" />
          </div>
        )}

        {product.badge && (
          <Badge
            variant="destructive"
            size="sm"
            className="absolute left-2 top-2 z-10"
          >
            {product.badge}
          </Badge>
        )}

        {product.inStock === false && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/70">
            <span className="text-xs font-medium text-muted-foreground">
              Rupture de stock
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className={cn("flex min-w-0 flex-col gap-1.5", isList ? "flex-1 py-2 pr-4" : "p-4")}>
        <p className="truncate text-sm font-medium">{product.name}</p>

        {product.rating !== undefined && (
          <RatingStars
            rating={product.rating}
            reviewCount={product.reviewCount}
            size="xs"
          />
        )}

        <div className={cn("mt-auto flex items-center justify-between gap-2", isList && "mt-2")}>
          <PriceDisplay
            priceCents={product.priceCents}
            originalPriceCents={product.originalPriceCents}
            currency={product.currency}
            size="sm"
          />

          <Button
            size="xs"
            disabled={product.inStock === false}
            onClick={handleAddToCart}
            variant={added ? "secondary" : "default"}
            className="shrink-0"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            {added ? "Ajoute" : "Ajouter"}
          </Button>
        </div>
      </div>
    </div>
  );

  if (product.href) {
    return <Link href={product.href}>{inner}</Link>;
  }
  return inner;
}
