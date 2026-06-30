"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight, Calendar, Gauge, Zap } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FilterBar, type FilterGroup } from "@/components/dashboard-ui/filter-bar";
import type { ComponentVariable } from "@/lib/component-variables";
import { autoVariables } from "@/lib/component-variables/presets";
import { RatingStars } from "@/components/ecommerce/rating-stars";
import { formatPrice } from "@/components/ecommerce/price-display";

const ALL_CARS = [
  { make: "Porsche", model: "911 GT3",        year: 2025, power: "510 ch", acceleration: "3.4s", priceCents: 16890000, category: "Sport",        score: 9.4, photo: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80&auto=format&fit=crop" },
  { make: "BMW",     model: "M3 Competition", year: 2024, power: "510 ch", acceleration: "3.9s", priceCents: 9870000,  category: "Berline sport", score: 9.1, photo: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80&auto=format&fit=crop" },
  { make: "Ferrari", model: "296 GTB",        year: 2024, power: "830 ch", acceleration: "2.9s", priceCents: 28600000, category: "Supercar",      score: 9.7, photo: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80&auto=format&fit=crop" },
  { make: "Audi",    model: "RS6 Avant",      year: 2025, power: "630 ch", acceleration: "3.4s", priceCents: 13400000, category: "Break sport",   score: 8.9, photo: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80&auto=format&fit=crop" },
];

const FILTERS: FilterGroup[] = [
  {
    key: "category",
    label: "Categorie",
    options: [
      { value: "Sport",        label: "Sport" },
      { value: "Berline sport",label: "Berline sport" },
      { value: "Supercar",     label: "Supercar" },
      { value: "Break sport",  label: "Break sport" },
    ],
  },
];

interface AutoBlogCarGridProps {
  /**
   * Inject ComponentVariable[] to replace hardcoded FILTERS.
   * The "category" select variable (id="category") maps to the car category filter.
   */
  variables?: ComponentVariable[];
}

export function AutoBlogCarGrid({ variables = autoVariables }: AutoBlogCarGridProps = {}) {
  const searchParams = useSearchParams();
  const search   = (searchParams.get("search") ?? "").toLowerCase();
  const category = searchParams.get("category") ?? "";

  // Extra filters when using the variable system (reads URL params written by ConfigurableFilterBar)
  const make     = variables ? (searchParams.get("make") ?? "all") : "";
  const minPrice = variables ? Number(searchParams.get("minPrice") ?? "0")       : 0;
  const maxPrice = variables ? Number(searchParams.get("maxPrice") ?? "99999999") : 99999999;

  const cars = ALL_CARS.filter((c) => {
    const matchSearch   = !search   || `${c.make} ${c.model}`.toLowerCase().includes(search);
    const matchCategory = !category || category === "all" || c.category === category;
    const matchMake     = !variables || make === "all" || c.make === make;
    const matchPrice    = !variables || (c.priceCents >= minPrice * 100 && c.priceCents <= maxPrice * 100);
    return matchSearch && matchCategory && matchMake && matchPrice;
  });

  return (
    <>
      <FilterBar
        filters={variables ? undefined : FILTERS}
        variables={variables}
        searchPlaceholder="Rechercher une marque ou un modele..."
        className="mb-6"
      />

      {cars.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">Aucun vehicule correspond a votre recherche.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {cars.map((car) => (
            <Card key={car.make + car.model} className="overflow-hidden">
              <div className="relative h-44 border-b overflow-hidden">
                <Image
                  src={car.photo}
                  alt={`${car.make} ${car.model}`}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <Badge variant="soft" size="sm">{car.category}</Badge>
                  <span className="flex items-center gap-1 text-xs text-white/80 font-medium">
                    <Gauge className="h-3 w-3" />{car.acceleration}
                  </span>
                </div>
              </div>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{car.make}</p>
                    <p className="text-lg font-semibold">{car.model}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Zap className="h-3.5 w-3.5" />{car.power}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{car.year}</span>
                    </div>
                    <div className="mt-2">
                      <RatingStars
                        rating={car.score / 2}
                        reviewCount={undefined}
                        showCount={false}
                        size="xs"
                      />
                      <span className="mt-0.5 block text-xs text-muted-foreground">{car.score}/10</span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-base font-semibold">{formatPrice(car.priceCents)}</p>
                    <p className="text-xs text-muted-foreground">prix catalogue</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  Lire la fiche complete <ArrowRight className="h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
