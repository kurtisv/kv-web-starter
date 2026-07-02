import { Calendar, X, CreditCard, Bell, AlertTriangle, Star, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  type: string;
  label: string;
  detail: string;
  time: string;
  icon: string;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  "calendar":       <Calendar className="h-3.5 w-3.5" />,
  "x":              <X className="h-3.5 w-3.5" />,
  "credit-card":    <CreditCard className="h-3.5 w-3.5" />,
  "bell":           <Bell className="h-3.5 w-3.5" />,
  "alert-triangle": <AlertTriangle className="h-3.5 w-3.5" />,
  "star":           <Star className="h-3.5 w-3.5" />,
  "mail":           <Mail className="h-3.5 w-3.5" />,
};

const TYPE_COLORS: Record<string, string> = {
  booking_new:       "bg-primary/10 text-primary",
  booking_cancel:    "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  payment:           "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  waitlist_notified: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  no_show:           "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  review:            "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
  reminder_sent:     "bg-muted text-muted-foreground",
};

interface BookingActivityFeedProps {
  items: ActivityItem[];
  className?: string;
}

export function BookingActivityFeed({ items, className }: BookingActivityFeedProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item) => (
        <div key={item.id} className="flex items-start gap-3">
          <div className={cn(
            "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
            TYPE_COLORS[item.type] ?? "bg-muted text-muted-foreground"
          )}>
            {ICON_MAP[item.icon] ?? <Calendar className="h-3.5 w-3.5" />}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">{item.label}</p>
            <p className="text-xs text-muted-foreground">{item.detail}</p>
          </div>
          <p className="shrink-0 text-xs text-muted-foreground">{item.time}</p>
        </div>
      ))}
    </div>
  );
}
