import { Gift } from "lucide-react";
import { cn } from "@/lib/utils";

interface GiftCardItem {
  id: string;
  valueCents: number;
  code: string;
  purchasedBy: string;
  purchasedAt: string;
  usedAt: string | null;
}

interface GiftCardCardProps {
  cards: GiftCardItem[];
  className?: string;
}

export function GiftCardCard({ cards, className }: GiftCardCardProps) {
  return (
    <div className={cn("rounded-xl border bg-card shadow-sm overflow-hidden", className)}>
      <div className="border-b px-5 py-4">
        <p className="text-sm font-medium">Cartes cadeaux</p>
      </div>
      <div className="divide-y">
        {cards.map((card) => (
          <div key={card.id} className="flex items-center justify-between gap-3 px-5 py-3">
            <div className="flex items-center gap-3">
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg",
                card.usedAt ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"
              )}>
                <Gift className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">
                  {(card.valueCents / 100).toFixed(0)} EUR
                </p>
                <p className="text-xs font-mono text-muted-foreground">{card.code}</p>
                <p className="text-xs text-muted-foreground">
                  Par {card.purchasedBy} &mdash; {card.purchasedAt}
                </p>
              </div>
            </div>
            <span className={cn(
              "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
              card.usedAt
                ? "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
            )}>
              {card.usedAt ? "Utilise" : "Actif"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
