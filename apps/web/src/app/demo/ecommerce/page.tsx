"use client";

import * as React from "react";
import { ArrowRight, RotateCcw, Shield, ShoppingCart, Tag, Truck } from "lucide-react";

import { HeroSection } from "@/components/sections/hero-section";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { CTASection } from "@/components/sections/cta-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductCard, type ProductItem } from "@/components/ecommerce/product-card";
import { CheckoutSteps } from "@/components/ecommerce/checkout-steps";
import { PriceDisplay } from "@/components/ecommerce/price-display";
import { RatingStars } from "@/components/ecommerce/rating-stars";
import { PromoCodeInput } from "@/components/ecommerce/promo-code-input";
import { VariantSelector } from "@/components/ecommerce/variant-selector";
import { OrderStatusTimeline, type OrderStatusStep } from "@/components/ecommerce/order-status-timeline";
import { CustomerOrderTable, type CustomerOrder } from "@/components/ecommerce/customer-order-table";

const products: ProductItem[] = [
  {
    id: "sac-cuir",
    name: "Sac cuir premium",
    priceCents: 14900,
    originalPriceCents: 19900,
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    badge: "-25%",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80&auto=format&fit=crop",
  },
  {
    id: "montre-min",
    name: "Montre minimaliste",
    priceCents: 28900,
    rating: 4.9,
    reviewCount: 87,
    inStock: true,
    badge: "Nouveau",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80&auto=format&fit=crop",
  },
  {
    id: "portefeuille",
    name: "Portefeuille slim",
    priceCents: 7900,
    originalPriceCents: 9900,
    rating: 4.7,
    reviewCount: 203,
    inStock: false,
    badge: "-20%",
    image: "https://images.unsplash.com/photo-1614267861476-0d129972a0f4?w=600&q=80&auto=format&fit=crop",
  },
  {
    id: "carnet-a5",
    name: "Carnet cuir A5",
    priceCents: 4500,
    rating: 4.6,
    reviewCount: 56,
    inStock: true,
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&q=80&auto=format&fit=crop",
  },
  {
    id: "porte-cles",
    name: "Porte-cles gravable",
    priceCents: 2900,
    originalPriceCents: 3900,
    rating: 4.5,
    reviewCount: 341,
    inStock: true,
    badge: "-26%",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop",
  },
  {
    id: "etui-passeport",
    name: "Etui passeport",
    priceCents: 5500,
    rating: 4.8,
    reviewCount: 92,
    inStock: true,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80&auto=format&fit=crop",
  },
];

const trust = [
  { icon: <Truck className="h-5 w-5" />,    title: "Livraison gratuite",  description: "Des 60 EUR d'achat. Livraison en 48h garantie." },
  { icon: <RotateCcw className="h-5 w-5" />, title: "Retours gratuits",   description: "30 jours pour changer d'avis. Sans condition." },
  { icon: <Shield className="h-5 w-5" />,    title: "Paiement securise",  description: "3D Secure, Stripe. Vos donnees restent privees." },
];

const orderSteps: OrderStatusStep[] = [
  { id: "confirmed", label: "Commande confirmee",  description: "Paiement accepte" },
  { id: "preparing", label: "En preparation",       description: "Mise en stock" },
  { id: "shipped",   label: "Expediee",             description: "Suivi en ligne disponible" },
  { id: "delivered", label: "Livree",               description: "Colis recu" },
];

const orders: CustomerOrder[] = [
  { id: "o1", number: "#1042", date: "24 juin 2026", status: "shipped",   totalCents: 22800 },
  { id: "o2", number: "#1039", date: "18 juin 2026", status: "paid",      totalCents: 7900  },
  { id: "o3", number: "#1031", date: "5 juin 2026",  status: "cancelled", totalCents: 4500  },
];

const colorOptions = [
  { value: "noir",   label: "Noir" },
  { value: "marron", label: "Marron" },
  { value: "tan",    label: "Tan", disabled: false },
  { value: "creme",  label: "Creme", disabled: true },
];

const sizeOptions = [
  { value: "s",  label: "S" },
  { value: "m",  label: "M" },
  { value: "l",  label: "L" },
  { value: "xl", label: "XL", disabled: true },
];

export default function DemoEcommercePage() {
  const [selectedColor, setSelectedColor] = React.useState("marron");
  const [selectedSize, setSelectedSize] = React.useState("m");

  return (
    <div data-theme="ecommerce-clean" className="bg-profile-soft-gradient">
      <HeroSection
        variant="split"
        eyebrow="Collection printemps 2026"
        title={<span className="text-gradient-primary">Artisanat cuir premium, livre chez vous.</span>}
        description="Pieces fabriquees a la main, matieres nobles, finitions irreprochables. Garantie 2 ans incluse."
        actions={
          <>
            <Button size="lg">
              <ShoppingCart className="size-4" /> Voir la collection
            </Button>
            <Button size="lg" variant="outline">
              <Tag className="size-4" /> Offres du moment
            </Button>
          </>
        }
        media={
          <div className="border bg-muted/30 p-6 text-center">
            <div className="text-4xl font-semibold text-primary">-30%</div>
            <p className="mt-1 text-sm text-muted-foreground">sur toute la collection sacs</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Jusqu&apos;au 31 aout — code : ETE30
            </p>
            <Button size="sm" className="mt-4">Profiter de l&apos;offre</Button>
          </div>
        }
      />

      {/* Product grid */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Nos produits</h2>
            <div className="flex gap-2">
              {["Sacs", "Montres", "Accessoires"].map((c) => (
                <Badge key={c} variant="outline" size="sm">{c}</Badge>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* List layout */}
      <section className="border-y bg-card">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-6 flex items-center gap-3">
            <h2 className="text-xl font-semibold">Vue liste</h2>
            <Badge variant="outline" size="sm" className="font-mono">layout=&quot;list&quot;</Badge>
          </div>
          <div className="grid max-w-2xl gap-3">
            {products.slice(0, 3).map((p) => (
              <ProductCard key={p.id} product={p} layout="list" />
            ))}
          </div>
        </div>
      </section>

      {/* Variant + Promo composants */}
      <section className="border-b bg-background">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="mb-8 text-xl font-semibold">Composants produit</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* VariantSelector */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  VariantSelector
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <VariantSelector
                  label="Couleur"
                  value={selectedColor}
                  options={colorOptions}
                  onChange={setSelectedColor}
                />
                <VariantSelector
                  label="Taille"
                  value={selectedSize}
                  options={sizeOptions}
                  onChange={setSelectedSize}
                />
              </CardContent>
            </Card>

            {/* PriceDisplay */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  PriceDisplay
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {(["sm", "md", "lg"] as const).map((size) => (
                  <div key={size} className="flex items-center gap-3 border p-2">
                    <span className="w-10 text-xs text-muted-foreground font-mono">{size}</span>
                    <PriceDisplay priceCents={14900} originalPriceCents={19900} size={size} />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* RatingStars */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  RatingStars
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {[5, 4.5, 4.2, 3.5, 2].map((r) => (
                  <div key={r} className="flex items-center gap-3 border p-2">
                    <span className="w-8 text-xs text-muted-foreground">{r}</span>
                    <RatingStars rating={r} reviewCount={Math.round(r * 27)} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* PromoCodeInput */}
      <section className="border-b bg-card">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-medium">PromoCodeInput</p>
              <p className="mb-4 text-xs text-muted-foreground">
                Essayez avec le code <code className="font-mono bg-muted px-1">ETE30</code> (simulation).
              </p>
              <PromoCodeInput
                onApply={(code) => {
                  return code.toUpperCase() === "ETE30";
                }}
              />
            </div>
            <div>
              <p className="mb-3 text-sm font-medium">CheckoutSteps</p>
              <div className="grid gap-4">
                {([0, 2, 4] as const).map((step) => (
                  <div key={step}>
                    <p className="mb-1.5 text-xs font-mono text-muted-foreground">step {step}</p>
                    <CheckoutSteps currentStep={step} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OrderStatusTimeline + CustomerOrderTable */}
      <section className="border-b bg-background">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="mb-8 text-xl font-semibold">Suivi et historique</h2>
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-medium">OrderStatusTimeline</p>
              <OrderStatusTimeline steps={orderSteps} currentStep="shipped" />
            </div>
            <div>
              <p className="mb-3 text-sm font-medium">CustomerOrderTable</p>
              <CustomerOrderTable orders={orders} />
            </div>
          </div>
        </div>
      </section>

      <FeatureGrid
        features={trust}
        columns={3}
        variant="icon-left"
        className="border-y bg-card"
      />

      <CTASection
        variant="muted"
        title="Satisfait ou rembourse."
        description="30 jours pour changer d'avis. Retours gratuits, sans question posee."
        actions={
          <Button size="lg">
            Decouvrir la boutique <ArrowRight className="size-4" />
          </Button>
        }
      />
    </div>
  );
}
