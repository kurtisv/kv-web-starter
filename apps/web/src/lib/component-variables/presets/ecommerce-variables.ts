import {
  createTextVariable,
  createSelectVariable,
  createBooleanVariable,
  createSliderRangeVariable,
  createSortVariable,
  createViewModeVariable,
} from "../factories";
import type { ComponentVariable } from "../types";

export const ecommerceVariables: ComponentVariable[] = [
  createTextVariable({
    id: "search",
    label: "Recherche",
    urlKeys: "search",
    placeholder: "Rechercher un produit...",
  }),

  createSelectVariable({
    id: "category",
    label: "Categorie",
    urlKeys: "category",
    options: [
      { value: "all",          label: "Toutes les categories" },
      { value: "electronique", label: "Electronique" },
      { value: "vetements",    label: "Vetements" },
      { value: "maison",       label: "Maison" },
      { value: "sport",        label: "Sport" },
      { value: "beaute",       label: "Beaute" },
    ],
  }),

  createSliderRangeVariable({
    id: "priceRange",
    label: "Prix",
    min: 0,
    max: 5000,
    step: 10,
    defaultValue: { min: 0, max: 5000 },
    urlKeys: { min: "minPrice", max: "maxPrice" },
  }),

  createBooleanVariable({
    id: "inStock",
    label: "En stock uniquement",
    urlKeys: "inStock",
    group: "filters",
  }),

  createSortVariable({
    id: "sort",
    label: "Trier par",
    fields: [
      { value: "relevance", label: "Pertinence" },
      { value: "price",     label: "Prix" },
      { value: "rating",    label: "Note" },
      { value: "newest",    label: "Nouveautes" },
    ],
    urlKeys: { field: "sortField", direction: "sortDir" },
  }),

  createViewModeVariable({ urlKeys: "view", group: "display" }),
];
