import {
  createTextVariable,
  createSelectVariable,
  createDateRangeVariable,
  createSortVariable,
} from "../factories";
import type { ComponentVariable } from "../types";

export const dashboardVariables: ComponentVariable[] = [
  createTextVariable({
    id: "search",
    label: "Recherche",
    urlKeys: "search",
    placeholder: "Rechercher...",
  }),

  createSelectVariable({
    id: "status",
    label: "Statut",
    urlKeys: "status",
    options: [
      { value: "all",      label: "Tous les statuts" },
      { value: "active",   label: "Actif" },
      { value: "inactive", label: "Inactif" },
      { value: "pending",  label: "En attente" },
      { value: "archived", label: "Archive" },
    ],
  }),

  createDateRangeVariable({
    id: "dateRange",
    label: "Periode",
    urlKeys: { from: "dateFrom", to: "dateTo" },
    group: "filters",
  }),

  createSortVariable({
    id: "sort",
    label: "Trier par",
    fields: [
      { value: "createdAt", label: "Date de creation" },
      { value: "updatedAt", label: "Derniere modification" },
      { value: "name",      label: "Nom" },
    ],
    urlKeys: { field: "sortField", direction: "sortDir" },
  }),
];
