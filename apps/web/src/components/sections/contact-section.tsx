import * as React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ContactInfo {
  email?: string;
  phone?: string;
  address?: string;
}

interface ContactSectionProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  contact?: ContactInfo;
  formSlot?: React.ReactNode;
  className?: string;
}

export function ContactSection({ title, description, contact, formSlot, className }: ContactSectionProps) {
  return (
    <section className={cn("bg-background", className)}>
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            {title && <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>}
            {description && (
              <p className="mt-4 text-base text-muted-foreground">{description}</p>
            )}
            {contact && (
              <ul className="mt-8 grid gap-4">
                {contact.email && (
                  <li className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <a href={`mailto:${contact.email}`} className="text-sm hover:text-primary transition-colors">
                      {contact.email}
                    </a>
                  </li>
                )}
                {contact.phone && (
                  <li className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <a href={`tel:${contact.phone}`} className="text-sm hover:text-primary transition-colors">
                      {contact.phone}
                    </a>
                  </li>
                )}
                {contact.address && (
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                    <p className="text-sm">{contact.address}</p>
                  </li>
                )}
              </ul>
            )}
          </div>
          <div>
            {formSlot ?? (
              <div className="border p-6">
                <p className="text-sm text-muted-foreground">
                  Passe un formulaire de contact via <code className="font-mono text-xs">formSlot</code>.
                </p>
                <Button className="mt-4" variant="outline">
                  Envoyer un message
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
