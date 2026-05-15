"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";
import { parseServiceFormData, parseStaffFormData } from "@/modules/booking";

export async function createService(formData: FormData) {
  const service = parseServiceFormData(formData);

  await prisma.service.create({
    data: {
      name: service.name,
      slug: service.slug,
      description: service.description,
      durationMin: service.durationMin,
      priceCents: service.priceCents,
    },
  });

  revalidatePath("/dashboard/services");
  redirect("/dashboard/services");
}

export async function createStaffMember(formData: FormData) {
  const staff = parseStaffFormData(formData);

  await prisma.staff.create({
    data: {
      name: staff.name,
      email: staff.email,
    },
  });

  revalidatePath("/dashboard/staff");
  redirect("/dashboard/staff");
}
