"use client";

import * as React from "react";
import { AlertCircle, Bell, BellOff, CheckCircle2, Info, X, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  useNotifications,
  type AppNotification,
  type NotificationVariant,
} from "@/components/providers/notifications-provider";

const ICONS: Record<NotificationVariant, React.ElementType> = {
  success: CheckCircle2,
  error:   XCircle,
  warning: AlertCircle,
  info:    Info,
  default: Bell,
};

const ICON_CLASSES: Record<NotificationVariant, string> = {
  success: "text-success",
  error:   "text-destructive",
  warning: "text-warning",
  info:    "text-blue-500",
  default: "text-muted-foreground",
};

function timeAgo(date: Date): string {
  const sec = Math.floor((Date.now() - date.getTime()) / 1000);
  if (sec < 60) return "A l'instant";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h} h`;
  return `${Math.floor(h / 24)} j`;
}

export function NotificationBell() {
  const { notifications, unreadCount, dismiss, markRead, markAllRead, clearAll } = useNotifications();
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    function onMouseDown(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label={
          unreadCount > 0
            ? `${unreadCount} notification${unreadCount > 1 ? "s" : ""} non lue${unreadCount > 1 ? "s" : ""}`
            : "Notifications"
        }
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-9 w-9 items-center justify-center border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span
            aria-hidden
            className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold leading-none text-destructive-foreground"
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Centre de notifications"
          className="absolute right-0 top-full z-50 mt-2 w-80 border bg-background shadow-lg"
        >
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-2">
              <Bell className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-sm font-medium">Notifications</span>
              {unreadCount > 0 && (
                <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium tabular-nums">
                  {unreadCount} non lue{unreadCount > 1 ? "s" : ""}
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Tout lire
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-10 text-muted-foreground">
                <BellOff className="h-6 w-6 opacity-30" />
                <p className="text-sm">Aucune notification</p>
              </div>
            ) : (
              <ul role="list">
                {notifications.map((n) => (
                  <NotificationItem
                    key={n.id}
                    notification={n}
                    onDismiss={() => dismiss(n.id)}
                    onRead={() => markRead(n.id)}
                  />
                ))}
              </ul>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="border-t px-4 py-2 text-right">
              <button
                type="button"
                onClick={() => {
                  clearAll();
                  setOpen(false);
                }}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Tout effacer
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function NotificationItem({
  notification,
  onDismiss,
  onRead,
}: {
  notification: AppNotification;
  onDismiss: () => void;
  onRead: () => void;
}) {
  const Icon = ICONS[notification.variant];
  const iconCls = ICON_CLASSES[notification.variant];
  const isUnread = !notification.readAt;

  return (
    <li
      role="button"
      tabIndex={0}
      onClick={onRead}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onRead(); }
      }}
      className={cn(
        "group flex cursor-default items-start gap-3 border-b px-4 py-3 transition-colors last:border-b-0 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        isUnread && "bg-muted/20"
      )}
    >
      <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", iconCls)} aria-hidden />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-1">
          <p className={cn("text-sm leading-snug", isUnread && "font-medium")}>
            {notification.title}
          </p>
          <div className="flex shrink-0 items-center gap-1">
            <span className="text-[10px] text-muted-foreground">{timeAgo(notification.createdAt)}</span>
            <button
              type="button"
              aria-label="Retirer"
              onClick={(e) => { e.stopPropagation(); onDismiss(); }}
              className="opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
        {notification.description && (
          <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
            {notification.description}
          </p>
        )}
        {isUnread && (
          <span aria-hidden className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
        )}
      </div>
    </li>
  );
}
