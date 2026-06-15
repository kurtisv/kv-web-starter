import * as React from "react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

interface FAQSectionProps {
  eyebrow?: string;
  title?: React.ReactNode;
  items: FAQItem[];
  className?: string;
}

export function FAQSection({ eyebrow, title, items, className }: FAQSectionProps) {
  return (
    <section className={cn("bg-background", className)}>
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        {(eyebrow || title) && (
          <div className="mb-10 text-center">
            {eyebrow && (
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {eyebrow}
              </p>
            )}
            {title && <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>}
          </div>
        )}
        <dl className="grid gap-6">
          {items.map((item, i) => (
            <div key={i} className="border-b pb-6 last:border-0">
              <dt className="font-semibold">{item.question}</dt>
              <dd className="mt-2 text-sm leading-7 text-muted-foreground">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
