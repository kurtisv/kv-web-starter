import {
  createTextVariable,
  createSelectVariable,
  createSliderRangeVariable,
  createViewModeVariable,
} from "../factories";
import type { ComponentVariable } from "../types";

export const autoVariables: ComponentVariable[] = [
  createTextVariable({
    id: "search",
    label: "Recherche",
    urlKeys: "search",
    placeholder: "Rechercher une marque ou un modele...",
  }),

  createSelectVariable({
    id: "category",
    label: "Categorie",
    urlKeys: "category",
    options: [
      { value: "all",             label: "Toutes les categories" },
      { value: "Sport",           label: "Sport" },
      { value: "Berline sport",   label: "Berline sport" },
      { value: "Supercar",        label: "Supercar" },
      { value: "Break sport",     label: "Break sport" },
      { value: "SUV",             label: "SUV" },
      { value: "Electrique",      label: "Electrique" },
    ],
  }),

  createSelectVariable({
    id: "make",
    label: "Marque",
    urlKeys: "make",
    options: [
      { value: "all",         label: "Toutes les marques" },
      { value: "BMW",         label: "BMW" },
      { value: "Porsche",     label: "Porsche" },
      { value: "Lamborghini", label: "Lamborghini" },
      { value: "Audi",        label: "Audi" },
      { value: "Ferrari",     label: "Ferrari" },
      { value: "Mercedes",    label: "Mercedes" },
    ],
  }),

  createSliderRangeVariable({
    id: "priceRange",
    label: "Prix",
    min: 0,
    max: 1000000,
    step: 5000,
    defaultValue: { min: 0, max: 500000 },
    urlKeys: { min: "minPrice", max: "maxPrice" },
  }),

  createViewModeVariable({ urlKeys: "view", group: "display" }),
];
