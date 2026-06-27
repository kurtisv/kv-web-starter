"use client";

import { toast as sonner } from "sonner";
import type { ExternalToast } from "sonner";

export type ToastVariant = "success" | "error" | "warning" | "info" | "default";

export interface ToastOptions extends Omit<ExternalToast, "description"> {
  description?: string;
}

function success(title: string, description?: string, opts?: ToastOptions) {
  return sonner.success(title, { description, ...opts });
}

function error(title: string, description?: string, opts?: ToastOptions) {
  return sonner.error(title, { description, ...opts });
}

function warning(title: string, description?: string, opts?: ToastOptions) {
  return sonner.warning(title, { description, ...opts });
}

function info(title: string, description?: string, opts?: ToastOptions) {
  return sonner.info(title, { description, ...opts });
}

function message(title: string, description?: string, opts?: ToastOptions) {
  return sonner(title, { description, ...opts });
}

function action(
  title: string,
  description: string | undefined,
  actionConfig: { label: string; onClick: () => void },
  opts?: ToastOptions
) {
  return sonner(title, {
    description,
    action: { label: actionConfig.label, onClick: actionConfig.onClick },
    ...opts,
  });
}

function promise<T>(
  p: Promise<T>,
  msgs: {
    loading: string;
    success: string | ((data: T) => string);
    error: string | ((err: unknown) => string);
  }
) {
  return sonner.promise(p, msgs);
}

export const notify = {
  success,
  error,
  warning,
  info,
  message,
  action,
  promise,
  dismiss: sonner.dismiss,
};

export function useToast() {
  return { toast: notify };
}
