import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

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
        <Accordion>
          {items.map((item, i) => (
            <AccordionItem key={i}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
