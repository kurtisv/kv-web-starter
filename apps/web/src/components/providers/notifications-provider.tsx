"use client";
import * as React from "react";

export type NotificationVariant = "success" | "error" | "warning" | "info" | "default";

export interface AppNotification {
  id: string;
  title: string;
  description?: string;
  variant: NotificationVariant;
  createdAt: Date;
  readAt: Date | null;
  href?: string;
}

interface NotificationsContextValue {
  notifications: AppNotification[];
  unreadCount: number;
  add: (n: Omit<AppNotification, "id" | "createdAt" | "readAt">) => void;
  dismiss: (id: string) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  clearAll: () => void;
}

const NotificationsContext = React.createContext<NotificationsContextValue | null>(null);

const STORAGE_KEY = "kv-notifications";
const MAX_STORED = 50;

function loadFromStorage(): AppNotification[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Array<Omit<AppNotification, "createdAt" | "readAt"> & { createdAt: string; readAt: string | null }>;
    return parsed.map((n) => ({
      ...n,
      createdAt: new Date(n.createdAt),
      readAt: n.readAt ? new Date(n.readAt) : null,
    }));
  } catch {
    return [];
  }
}

function saveToStorage(notifications: AppNotification[]) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(notifications.slice(0, MAX_STORED)));
  } catch {
    // sessionStorage might be unavailable
  }
}

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = React.useState<AppNotification[]>([]);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      setNotifications(loadFromStorage());
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (hydrated) saveToStorage(notifications);
  }, [notifications, hydrated]);

  const add = React.useCallback(
    (n: Omit<AppNotification, "id" | "createdAt" | "readAt">) => {
      const notification: AppNotification = {
        ...n,
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        createdAt: new Date(),
        readAt: null,
      };
      setNotifications((prev) => [notification, ...prev].slice(0, MAX_STORED));
    },
    []
  );

  const dismiss = React.useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const markRead = React.useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id && !n.readAt ? { ...n, readAt: new Date() } : n))
    );
  }, []);

  const markAllRead = React.useCallback(() => {
    const now = new Date();
    setNotifications((prev) => prev.map((n) => (n.readAt ? n : { ...n, readAt: now })));
  }, []);

  const clearAll = React.useCallback(() => setNotifications([]), []);

  const unreadCount = notifications.filter((n) => !n.readAt).length;

  return (
    <NotificationsContext.Provider
      value={{ notifications, unreadCount, add, dismiss, markRead, markAllRead, clearAll }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = React.useContext(NotificationsContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationsProvider");
  return ctx;
}
