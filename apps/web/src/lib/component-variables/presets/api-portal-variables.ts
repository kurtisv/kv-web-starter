import {
  createTextVariable,
  createMultiSelectVariable,
  createSelectVariable,
  createDateRangeVariable,
} from "../factories";
import type { ComponentVariable } from "../types";

export const apiPortalVariables: ComponentVariable[] = [
  createTextVariable({
    id: "search",
    label: "Recherche",
    urlKeys: "search",
    placeholder: "Rechercher une route, un parametre...",
  }),

  createMultiSelectVariable({
    id: "method",
    label: "Methode HTTP",
    urlKeys: "method",
    options: [
      { value: "GET",    label: "GET" },
      { value: "POST",   label: "POST" },
      { value: "PUT",    label: "PUT" },
      { value: "PATCH",  label: "PATCH" },
      { value: "DELETE", label: "DELETE" },
    ],
    group: "filters",
  }),

  createMultiSelectVariable({
    id: "statusCode",
    label: "Code de reponse",
    urlKeys: "statusCode",
    options: [
      { value: "200", label: "200 OK" },
      { value: "201", label: "201 Created" },
      { value: "400", label: "400 Bad Request" },
      { value: "401", label: "401 Unauthorized" },
      { value: "403", label: "403 Forbidden" },
      { value: "404", label: "404 Not Found" },
      { value: "500", label: "500 Server Error" },
    ],
    group: "filters",
  }),

  createSelectVariable({
    id: "environment",
    label: "Environnement",
    urlKeys: "env",
    options: [
      { value: "all",        label: "Tous les environnements" },
      { value: "production", label: "Production" },
      { value: "staging",    label: "Staging" },
      { value: "sandbox",    label: "Sandbox" },
    ],
    group: "filters",
  }),

  createDateRangeVariable({
    id: "dateRange",
    label: "Periode",
    urlKeys: { from: "dateFrom", to: "dateTo" },
    group: "time",
  }),
];
