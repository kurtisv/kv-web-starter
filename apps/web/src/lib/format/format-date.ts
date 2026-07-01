export const DEFAULT_DATE_LOCALE = "en-CA";
export const DEFAULT_TIME_ZONE = "UTC";

function toStableDate(value: string | Date): Date {
  if (value instanceof Date) {
    return new Date(Date.UTC(
      value.getUTCFullYear(),
      value.getUTCMonth(),
      value.getUTCDate(),
    ));
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return new Date(`${value}T00:00:00.000Z`);
  }

  return new Date(value);
}

export function formatDate(
  value: string | Date | null | undefined,
  options: Intl.DateTimeFormatOptions = {},
): string {
  if (value === null || value === undefined) {
    return "";
  }

  const date = toStableDate(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(DEFAULT_DATE_LOCALE, {
    timeZone: DEFAULT_TIME_ZONE,
    year: "numeric",
    month: "short",
    day: "2-digit",
    ...options,
  }).format(date);
}
