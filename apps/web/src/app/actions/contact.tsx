"use server";

import { z } from "zod";

import { sendTransactionalEmail } from "@/lib/email/resend";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function sendContactMessage(formData: FormData) {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return;
  }

  await sendTransactionalEmail({
    to: parsed.data.email,
    subject: "Votre message a ete recu",
    react: (
      <div>
        <h1>Merci {parsed.data.name}</h1>
        <p>Votre demande a ete recue. Nous allons vous repondre rapidement.</p>
      </div>
    ),
  });
}
