"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { BookingConfirmationEmail } from "@/emails/booking-confirmation";
import { BookingStatus } from "@/generated/prisma";
import { sendTransactionalEmail } from "@/lib/email/resend";
import { prisma } from "@/lib/db";
import {
  calculateBookingEndAt,
  hasBookingConflict,
  parseBookingRequestFormData,
  parseServiceFormData,
  parseStaffFormData,
} from "@/modules/booking";

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

export async function createBookingRequest(formData: FormData) {
  const bookingRequest = parseBookingRequestFormData(formData);

  const result = await prisma.$transaction(async (tx) => {
    const service = await tx.service.findFirst({
      where: { id: bookingRequest.serviceId, isActive: true },
      select: { id: true, durationMin: true, name: true },
    });

    if (!service) {
      return { ok: false as const, reason: "service-not-found" };
    }

    const endAt = calculateBookingEndAt(bookingRequest.startAt, service.durationMin);
    const conflictingBookings = await tx.booking.findMany({
      where: {
        serviceId: bookingRequest.serviceId,
        staffId: bookingRequest.staffId,
        status: { in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
        startAt: { lt: endAt },
        endAt: { gt: bookingRequest.startAt },
      },
      select: { startAt: true, endAt: true },
    });

    if (
      hasBookingConflict({
        startAt: bookingRequest.startAt,
        endAt,
        existingBookings: conflictingBookings,
      })
    ) {
      return { ok: false as const, reason: "slot-conflict" };
    }

    const booking = await tx.booking.create({
      data: {
        serviceId: service.id,
        staffId: bookingRequest.staffId,
        customerName: bookingRequest.customerName,
        customerEmail: bookingRequest.customerEmail,
        customerPhone: bookingRequest.customerPhone,
        startAt: bookingRequest.startAt,
        endAt,
        status: BookingStatus.PENDING,
      },
    });

    return {
      ok: true as const,
      booking: {
        customerEmail: booking.customerEmail,
        customerName: booking.customerName,
        startAt: booking.startAt,
        serviceName: service.name,
      },
    };
  });

  if (!result.ok) {
    redirect(`/booking?error=${result.reason}`);
  }

  await sendTransactionalEmail({
    to: result.booking.customerEmail,
    subject: "Votre demande de reservation a ete recue",
    react: (
      <BookingConfirmationEmail
        customerName={result.booking.customerName}
        serviceName={result.booking.serviceName}
        startAt={result.booking.startAt}
      />
    ),
  });

  revalidatePath("/dashboard/bookings");
  redirect("/booking?success=1");
}
