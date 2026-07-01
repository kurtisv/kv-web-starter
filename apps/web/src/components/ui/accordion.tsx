import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("divide-y border", className)} {...props} />;
}

export function AccordionItem({
  className,
  ...props
}: React.DetailsHTMLAttributes<HTMLDetailsElement>) {
  return <details className={cn("group", className)} {...props} />;
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <summary
      className={cn(
        "flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-sm font-medium",
        "transition-colors hover:bg-muted/50 active:bg-muted",
        "[&::-webkit-details-marker]:hidden",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
    </summary>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    // CSS grid height trick — animates open/close without JavaScript
    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-200 ease-out group-open:grid-rows-[1fr]">
      <div className="overflow-hidden">
        <div
          className={cn(
            "px-5 pb-5 text-sm leading-6 text-muted-foreground",
            "opacity-0 transition-opacity duration-150 group-open:opacity-100",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
