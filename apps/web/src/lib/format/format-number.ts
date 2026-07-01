export const DEFAULT_NUMBER_LOCALE = "en-CA";

export function formatNumber(
  value: number | null | undefined,
  options: Intl.NumberFormatOptions = {},
): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "";
  }

  return new Intl.NumberFormat(DEFAULT_NUMBER_LOCALE, {
    maximumFractionDigits: 0,
    ...options,
  }).format(value);
}

export function formatRating(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "";
  }

  return new Intl.NumberFormat(DEFAULT_NUMBER_LOCALE, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
    useGrouping: false,
  }).format(value);
}
