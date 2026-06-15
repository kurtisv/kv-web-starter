import Image from "next/image";
import { ArrowRight, ShoppingCart, Star, Truck, Shield, RotateCcw, Tag } from "lucide-react";
import { HeroSection } from "@/components/sections/hero-section";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { CTASection } from "@/components/sections/cta-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const products = [
  { name: "Sac cuir premium",    price: "149€", originalPrice: "199€", rating: 4.8, reviews: 124, inStock: true,  badge: "-25%",    photo: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80&auto=format&fit=crop" },
  { name: "Montre minimaliste",  price: "289€", originalPrice: null,   rating: 4.9, reviews: 87,  inStock: true,  badge: "Nouveau", photo: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80&auto=format&fit=crop" },
  { name: "Portefeuille slim",   price: "79€",  originalPrice: "99€",  rating: 4.7, reviews: 203, inStock: false, badge: "-20%",    photo: "https://images.unsplash.com/photo-1614267861476-0d129972a0f4?w=600&q=80&auto=format&fit=crop" },
  { name: "Carnet cuir A5",      price: "45€",  originalPrice: null,   rating: 4.6, reviews: 56,  inStock: true,  badge: null,      photo: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&q=80&auto=format&fit=crop" },
  { name: "Porte-cles gravable", price: "29€",  originalPrice: "39€",  rating: 4.5, reviews: 341, inStock: true,  badge: "-26%",    photo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop" },
  { name: "Etui passeport",      price: "55€",  originalPrice: null,   rating: 4.8, reviews: 92,  inStock: true,  badge: null,      photo: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80&auto=format&fit=crop" },
];

const trust = [
  { icon: <Truck className="h-5 w-5" />, title: "Livraison gratuite", description: "Des 60€ d'achat. Livraison en 48h garantie." },
  { icon: <RotateCcw className="h-5 w-5" />, title: "Retours gratuits", description: "30 jours pour changer d'avis. Sans condition." },
  { icon: <Shield className="h-5 w-5" />, title: "Paiement securise", description: "3D Secure, Stripe. Vos donnees restent privees." },
];

export default function DemoEcommercePage() {
  return (
    <div data-theme="ecommerce-clean">
      <HeroSection
        variant="split"
        eyebrow="Collection printemps 2025"
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
          <div className="border rounded-lg bg-muted/30 p-6 text-center">
            <div className="text-4xl font-semibold text-primary">-30%</div>
            <p className="mt-1 text-sm text-muted-foreground">sur toute la collection sacs</p>
            <p className="text-xs text-muted-foreground mt-1">{"Jusqu'au 30 juin — code: ETE30"}</p>
            <Button size="sm" className="mt-4">{"Profiter de l'offre"}</Button>
          </div>
        }
      />

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">Nos produits</h2>
            <div className="flex gap-2">
              {["Sacs", "Montres", "Accessoires"].map((c) => (
                <Badge key={c} variant="outline" size="sm">{c}</Badge>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <Card key={p.name} className="overflow-hidden group">
                <div className="relative aspect-square border-b">
                  <Image
                    src={p.photo}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {p.badge && (
                    <Badge variant="destructive" size="sm" className="absolute top-3 left-3">
                      {p.badge}
                    </Badge>
                  )}
                  {!p.inStock && (
                    <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
                      <span className="text-sm font-medium text-muted-foreground">Rupture de stock</span>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <p className="font-medium text-sm">{p.name}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-3.5 w-3.5 text-warning fill-warning" />
                    <span className="text-xs font-medium">{p.rating}</span>
                    <span className="text-xs text-muted-foreground">({p.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-semibold">{p.price}</span>
                      {p.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">{p.originalPrice}</span>
                      )}
                    </div>
                    <Button size="xs" disabled={!p.inStock}>
                      <ShoppingCart className="h-3.5 w-3.5" /> Ajouter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <FeatureGrid features={trust} columns={3} variant="icon-left" className="border-y bg-muted/30" />

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
