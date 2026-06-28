import { Bell, CalendarDays, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingReminderPreviewProps {
  serviceName?: string;
  staffName?: string;
  date?: string;
  time?: string;
  address?: string;
  className?: string;
}

export function BookingReminderPreview({
  serviceName = "Massage relaxant",
  staffName = "Sophie Bertin",
  date = "Mardi 15 juillet 2026",
  time = "14h00",
  address = "123 rue du Bien-etre, Paris 75001",
  className,
}: BookingReminderPreviewProps) {
  return (
    <div className={cn("overflow-hidden rounded-lg border bg-white text-sm shadow-sm dark:bg-zinc-900", className)}>
      {/* Email header */}
      <div className="bg-primary px-5 py-4 text-primary-foreground">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          <span className="font-semibold">Rappel de rendez-vous</span>
        </div>
        <p className="mt-1 text-xs opacity-80">Ce message est envoye automatiquement 24h avant votre RDV</p>
      </div>

      {/* Email body */}
      <div className="px-5 py-4 space-y-4">
        <p className="text-sm text-muted-foreground">Bonjour,</p>
        <p className="text-sm">
          Nous vous rappelons votre rendez-vous de demain. Voici les details :
        </p>

        <div className="space-y-2 rounded-md border bg-muted/30 p-3">
          <div className="flex items-center gap-2 text-sm">
            <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
            <span><strong>{serviceName}</strong> avec {staffName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 shrink-0" />
            <span>{date} a {time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            <span>{address}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex-1 rounded bg-primary px-3 py-1.5 text-center text-xs font-medium text-primary-foreground">
            Confirmer ma presence
          </div>
          <div className="rounded border px-3 py-1.5 text-center text-xs font-medium text-muted-foreground">
            Annuler
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Pour reporter, connectez-vous a votre espace client ou repondez a cet email.
        </p>
      </div>
    </div>
  );
}
