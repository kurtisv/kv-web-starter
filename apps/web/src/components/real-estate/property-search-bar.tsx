"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, type SelectOption } from "@/components/ui/select";
import type { ComponentVariable } from "@/lib/component-variables";
import type { SliderRangeVariableConfig } from "@/lib/component-variables/factories";

const typeOptions: SelectOption[] = [
  { value: "all", label: "Tous les biens" },
  { value: "appartement", label: "Appartement" },
  { value: "maison", label: "Maison" },
  { value: "studio", label: "Studio" },
  { value: "loft", label: "Loft" },
];

const priceOptions: SelectOption[] = [
  { value: "all", label: "Sans limite" },
  { value: "200000", label: "Jusqu'a 200 000 €" },
  { value: "400000", label: "Jusqu'a 400 000 €" },
  { value: "600000", label: "Jusqu'a 600 000 €" },
  { value: "1000000", label: "Jusqu'a 1 000 000 €" },
];

const roomOptions: SelectOption[] = [
  { value: "all", label: "Toutes les pieces" },
  { value: "1", label: "1 piece" },
  { value: "2", label: "2 pieces" },
  { value: "3", label: "3 pieces" },
  { value: "4", label: "4 pieces+" },
];

export interface PropertySearchBarProps {
  onSearch?: (params: { query: string; type: string; maxPrice: string; rooms: string }) => void;
  /**
   * Override the hardcoded filter options with ComponentVariable[] from the variable system.
   * Expected ids: "propertyType" (select), "maxPrice" (select or slider), "rooms" (select), "search" (text).
   * Unrecognized ids are ignored. Missing ids fall back to the built-in defaults.
   */
  variables?: ComponentVariable[];
  className?: string;
}

function resolveSelectOptions(
  variables: ComponentVariable[] | undefined,
  id: string,
  fallback: SelectOption[],
): SelectOption[] {
  const v = variables?.find((x) => x.id === id);
  if (!v) return fallback;
  const opts = (v.metadata as { options?: SelectOption[] } | undefined)?.options;
  return opts ?? fallback;
}

export function PropertySearchBar({ onSearch, variables, className }: PropertySearchBarProps) {
  const resolvedTypeOptions   = resolveSelectOptions(variables, "propertyType", typeOptions);
  const resolvedPriceOptions  = resolveSelectOptions(variables, "maxPrice", priceOptions);
  const resolvedRoomOptions   = resolveSelectOptions(variables, "rooms", roomOptions);

  const [query, setQuery] = React.useState("");
  const [type, setType] = React.useState(resolvedTypeOptions[0]?.value ?? "all");
  const [maxPrice, setMaxPrice] = React.useState(resolvedPriceOptions[0]?.value ?? "all");
  const [rooms, setRooms] = React.useState(resolvedRoomOptions[0]?.value ?? "all");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch?.({ query, type, maxPrice, rooms });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-xl border bg-card p-4 shadow-sm${className ? ` ${className}` : ""}`}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_160px_180px_140px_auto]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Ville, quartier, code postal..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select
          value={type}
          onValueChange={setType}
          options={resolvedTypeOptions}
          placeholder="Type de bien"
        />

        <Select
          value={maxPrice}
          onValueChange={setMaxPrice}
          options={resolvedPriceOptions}
          placeholder="Budget max"
        />

        <Select
          value={rooms}
          onValueChange={setRooms}
          options={resolvedRoomOptions}
          placeholder="Pieces"
        />

        <Button type="submit" className="w-full sm:w-auto">
          <Search className="h-4 w-4" />
          Rechercher
        </Button>
      </div>
    </form>
  );
}
