import { Badge } from "@/components/ui/badge";
import { formatPrice } from "./price-display";

export interface CustomerOrder {
  id: string;
  number: string;
  date: string;
  status: "pending" | "paid" | "shipped" | "cancelled";
  totalCents: number;
}

const STATUS_LABEL: Record<CustomerOrder["status"], string> = {
  pending: "En attente",
  paid: "Payee",
  shipped: "Expediee",
  cancelled: "Annulee",
};

export function CustomerOrderTable({ orders }: { orders: CustomerOrder[] }) {
  if (orders.length === 0) {
    return <p className="border bg-muted/20 p-4 text-sm text-muted-foreground">Aucune commande.</p>;
  }

  return (
    <div className="overflow-hidden border">
      <div className="grid grid-cols-[1fr_auto_auto] gap-3 border-b bg-muted/40 px-3 py-2 text-xs font-medium text-muted-foreground sm:grid-cols-[1fr_auto_auto_auto]">
        <span>Commande</span>
        <span className="hidden sm:block">Date</span>
        <span>Statut</span>
        <span>Total</span>
      </div>
      {orders.map((order) => (
        <div key={order.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b px-3 py-3 text-sm last:border-b-0 sm:grid-cols-[1fr_auto_auto_auto]">
          <span className="font-medium">{order.number}</span>
          <span className="hidden text-muted-foreground sm:block">{order.date}</span>
          <Badge variant={order.status === "cancelled" ? "destructive" : order.status === "pending" ? "warning" : "success"}>
            {STATUS_LABEL[order.status]}
          </Badge>
          <span>{formatPrice(order.totalCents)}</span>
        </div>
      ))}
    </div>
  );
}
