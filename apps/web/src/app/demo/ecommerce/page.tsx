import { ArrowRight, RotateCcw, Shield, ShoppingCart, Tag, Truck } from "lucide-react";

import { HeroSection } from "@/components/sections/hero-section";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { CTASection } from "@/components/sections/cta-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard, type ProductItem } from "@/components/ecommerce/product-card";
import { CheckoutSteps } from "@/components/ecommerce/checkout-steps";

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
  { icon: <Truck className="h-5 w-5" />, title: "Livraison gratuite", description: "Des 60 EUR d'achat. Livraison en 48h garantie." },
  { icon: <RotateCcw className="h-5 w-5" />, title: "Retours gratuits", description: "30 jours pour changer d'avis. Sans condition." },
  { icon: <Shield className="h-5 w-5" />, title: "Paiement securise", description: "3D Secure, Stripe. Vos donnees restent privees." },
];

export default function DemoEcommercePage() {
  return (
    <div data-theme="ecommerce-clean">
      <HeroSection
        variant="split"
        eyebrow="Collection printemps 2026"
        title="Artisanat cuir premium, livre chez vous."
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
            <p className="mt-1 text-xs text-muted-foreground">Jusqu&apos;au 31 aout — code : ETE30</p>
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

      {/* Trust signals */}
      <FeatureGrid
        features={trust}
        columns={3}
        variant="icon-left"
        className="border-y bg-muted/30"
      />

      {/* Checkout steps demo */}
      <section className="mx-auto max-w-2xl px-6 py-12">
        <h2 className="mb-6 text-center text-lg font-semibold text-muted-foreground">
          Flux de commande
        </h2>
        <CheckoutSteps currentStep={2} />
      </section>

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
