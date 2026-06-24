import { createBillingPortalSession } from "@/app/actions/billing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardBillingPage() {
  return (
    <main className="grid gap-6 px-6 py-10">
      <div>
        <h1 className="text-3xl font-semibold">Facturation</h1>
        <p className="mt-3 text-muted-foreground">
          Stripe Checkout et Customer Portal sont prebranches avec erreurs propres si Stripe manque.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Portail client</CardTitle>
          <CardDescription>Permet au client de gerer paiement, factures et abonnement.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createBillingPortalSession}>
            <Button type="submit">Acceder au portail</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
