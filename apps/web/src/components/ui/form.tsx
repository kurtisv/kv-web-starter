"use client";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE, DURATION } from "@/components/animations/motion";
import { Label } from "@/components/ui/label";

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
 * Complete form field wrapper: label, optional description, animated error.
 * Passes htmlFor/id to the child via the id prop on the wrapping div context.
 *
 * Usage:
 *   <Field label="Email" htmlFor="email" required error={errors.email?.message}>
 *     <Input id="email" {...register("email")} />
 *   </Field>
 */
export function Field({
  label,
  htmlFor,
  description,
  error,
  required,
  children,
  className,
}: {
  label?: string;
  htmlFor?: string;
  description?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-1.5", className)}>
      {label && (
        <Label htmlFor={htmlFor}>
          {label}
          {required && (
            <span className="ml-0.5 text-destructive" aria-hidden>
              *
            </span>
          )}
        </Label>
      )}
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      {children}
      <FormMessage>{error}</FormMessage>
    </div>
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
