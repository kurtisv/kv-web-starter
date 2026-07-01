import { Button } from "@/components/ui/button";
import { formatPrice } from "./price-display";

interface CheckoutSummaryProps {
  subtotalCents: number;
  shippingCents?: number;
  taxCents?: number;
  discountCents?: number;
  ctaLabel?: string;
  onCheckout?: () => void;
}

export function CheckoutSummary({
  subtotalCents,
  shippingCents = 0,
  taxCents = 0,
  discountCents = 0,
  ctaLabel = "Passer au paiement",
  onCheckout,
}: CheckoutSummaryProps) {
  const total = Math.max(0, subtotalCents + shippingCents + taxCents - discountCents);
  const rows = [
    ["Sous-total", subtotalCents],
    ["Livraison", shippingCents],
    ["Taxes", taxCents],
    discountCents > 0 ? ["Reduction", -discountCents] : null,
  ].filter(Boolean) as [string, number][];

  return (
    <div className="grid gap-4 rounded-lg border bg-card p-5 shadow-sm">
      <h3 className="text-base font-semibold">Resume de commande</h3>
      <div className="grid gap-2">
        {rows.map(([label, amount]) => (
          <div key={label} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{label}</span>
            <span className={amount < 0 ? "text-success" : undefined}>
              {amount < 0 ? `-${formatPrice(Math.abs(amount))}` : formatPrice(amount)}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t pt-3 font-semibold">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
      <Button type="button" onClick={onCheckout} className="w-full">
        {ctaLabel}
      </Button>
    </div>
  );
}
