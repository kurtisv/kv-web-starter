import { DEFAULT_NUMBER_LOCALE } from "./format-number";

export const DEFAULT_CURRENCY = "CAD";

export function formatCurrency(
  cents: number | null | undefined,
  options: {
    currency?: string;
    locale?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  } = {},
): string {
  if (cents === null || cents === undefined || Number.isNaN(cents)) {
    return "";
  }

  const {
    currency = DEFAULT_CURRENCY,
    locale = DEFAULT_NUMBER_LOCALE,
    maximumFractionDigits = 2,
  } = options;
  const minimumFractionDigits =
    options.minimumFractionDigits ?? Math.min(2, maximumFractionDigits);

  return new Intl.NumberFormat(locale,
  {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(cents / 100);
}
