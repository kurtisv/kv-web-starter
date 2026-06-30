import {
  createTextVariable,
  createSelectVariable,
  createSliderRangeVariable,
  createViewModeVariable,
} from "../factories";
import type { ComponentVariable } from "../types";

export const realEstateVariables: ComponentVariable[] = [
  createTextVariable({
    id: "search",
    label: "Recherche",
    urlKeys: "search",
    placeholder: "Ville, quartier, code postal...",
  }),

  createSelectVariable({
    id: "propertyType",
    label: "Type de bien",
    urlKeys: "type",
    options: [
      { value: "all",          label: "Tous les biens" },
      { value: "appartement",  label: "Appartement" },
      { value: "maison",       label: "Maison" },
      { value: "studio",       label: "Studio" },
      { value: "loft",         label: "Loft" },
    ],
  }),

  createSliderRangeVariable({
    id: "priceRange",
    label: "Budget",
    min: 0,
    max: 2000000,
    step: 10000,
    defaultValue: { min: 0, max: 1000000 },
    urlKeys: { min: "minPrice", max: "maxPrice" },
  }),

  createSelectVariable({
    id: "rooms",
    label: "Pieces",
    urlKeys: "rooms",
    options: [
      { value: "all", label: "Toutes les pieces" },
      { value: "1",   label: "1 piece" },
      { value: "2",   label: "2 pieces" },
      { value: "3",   label: "3 pieces" },
      { value: "4",   label: "4+ pieces" },
    ],
  }),

  createViewModeVariable({ urlKeys: "view", group: "display" }),
];
