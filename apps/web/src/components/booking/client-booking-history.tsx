import { CalendarDays, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type BookingHistoryStatus = "upcoming" | "completed" | "cancelled";

export interface BookingHistoryItem {
  id: string;
  service: string;
  staff: string;
  date: string;
  time: string;
  priceCents: number;
  status: BookingHistoryStatus;
}

const STATUS_STYLES: Record<BookingHistoryStatus, string> = {
  upcoming:  "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300",
  completed: "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
  cancelled: "border-zinc-200 bg-zinc-100 text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400",
};

const STATUS_LABELS: Record<BookingHistoryStatus, string> = {
  upcoming:  "A venir",
  completed: "Termine",
  cancelled: "Annule",
};

interface ClientBookingHistoryProps {
  items: BookingHistoryItem[];
  className?: string;
}

export function ClientBookingHistory({ items, className }: ClientBookingHistoryProps) {
  if (items.length === 0) {
    return (
      <div className={cn("flex flex-col items-center gap-3 py-12 text-center", className)}>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <CalendarDays className="h-6 w-6 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium">Aucune reservation</p>
        <p className="text-xs text-muted-foreground">Votre historique apparaitra ici.</p>
        <Button asChild size="sm" className="mt-2">
          <Link href="/booking">Prendre un rendez-vous</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("divide-y", className)}>
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between gap-3 py-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{item.service}</p>
            <p className="text-xs text-muted-foreground">
              {item.date} a {item.time} &mdash; {item.staff}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="text-sm font-semibold">
              {(item.priceCents / 100).toFixed(0)} €
            </span>
            <Badge variant="outline" size="sm" className={cn("font-normal", STATUS_STYLES[item.status])}>
              {STATUS_LABELS[item.status]}
            </Badge>
          </div>
        </div>
      ))}
      <div className="pt-3 text-right">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/my-bookings">
            Voir tout l&apos;historique <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
