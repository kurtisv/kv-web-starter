import { z } from "zod";

export const serviceFormSchema = z.object({
  name: z.string().trim().min(2, "Service name is required"),
  slug: z.string().trim().optional(),
  description: z.string().trim().optional(),
  durationMin: z.coerce.number().int().min(5).max(480),
  priceCents: z.coerce.number().int().min(0).optional(),
});

export const staffFormSchema = z.object({
  name: z.string().trim().min(2, "Staff name is required"),
  email: z.string().trim().email().optional().or(z.literal("")),
});

export type ServiceFormInput = z.infer<typeof serviceFormSchema>;
export type StaffFormInput = z.infer<typeof staffFormSchema>;

export function slugifyServiceName(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function parseServiceFormData(formData: FormData) {
  const parsed = serviceFormSchema.parse({
    name: formData.get("name"),
    slug: formData.get("slug") || undefined,
    description: formData.get("description") || undefined,
    durationMin: formData.get("durationMin"),
    priceCents: formData.get("priceCents") || undefined,
  });

  return {
    ...parsed,
    slug: parsed.slug || slugifyServiceName(parsed.name),
  };
}

export function parseStaffFormData(formData: FormData) {
  const parsed = staffFormSchema.parse({
    name: formData.get("name"),
    email: formData.get("email") || undefined,
  });

  return {
    ...parsed,
    email: parsed.email || undefined,
  };
}
