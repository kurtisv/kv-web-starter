"use client";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE, DURATION } from "@/components/animations/motion";

export function Form({ className, ...props }: React.FormHTMLAttributes<HTMLFormElement>) {
  return <form className={cn("grid gap-4", className)} {...props} />;
}

export function FormField({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-2", className)} {...props} />;
}

/**
 * Animated validation message: slides in when children are truthy, out when falsy.
 * Works with react-hook-form errors and any conditional message.
 */
export function FormMessage({ children, className }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <AnimatePresence>
      {children ? (
        <motion.p
          key="form-message"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: DURATION.fast, ease: EASE.smooth }}
          className={cn("text-sm text-destructive", className)}
        >
          {children}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}

/**
 * Animated success or generic info banner.
 * Slides in from above when children are truthy.
 */
export function FormBanner({
  children,
  variant = "error",
  className,
}: {
  children?: React.ReactNode;
  variant?: "error" | "success" | "info";
  className?: string;
}) {
  const variantClass = {
    error:   "border border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300",
    success: "border border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
    info:    "border bg-muted text-muted-foreground",
  }[variant];

  return (
    <AnimatePresence>
      {children ? (
        <motion.div
          key="form-banner"
          role="alert"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: DURATION.base * 0.6, ease: EASE.smooth }}
          className={cn("px-3 py-2 text-sm", variantClass, className)}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
