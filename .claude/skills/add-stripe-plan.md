# Skill : Ajouter un plan Stripe

## Quand utiliser
Quand l'utilisateur veut ajouter un nouveau plan de souscription (ex: ENTERPRISE).

## Procedure

### 1. Crer le produit + prix dans Stripe Dashboard
- Creer un produit avec un prix recurrent
- Copier le `price_id` (format `price_xxx`)

### 2. Ajouter le prix dans `env.ts`
```ts
STRIPE_PRICE_ENTERPRISE: z.string().optional(),
```

### 3. Ajouter le plan dans `prisma/schema.prisma`
```prisma
enum Plan {
  FREE
  PRO
  BUSINESS
  ENTERPRISE   # Deja present — verifier
}
```

### 4. Mettre a jour `modules/billing/checkout.ts`
```ts
export const checkoutPlanSchema = z.enum(["PRO", "BUSINESS", "ENTERPRISE"]);

export function getPlanPriceId(input: {
  plan: CheckoutPlan;
  proPriceId?: string;
  businessPriceId?: string;
  enterprisePriceId?: string;
}) {
  if (input.plan === "ENTERPRISE") return input.enterprisePriceId;
  // ...
}
```

### 5. Mettre a jour `app/actions/billing.ts`
- Passer `enterprisePriceId: env.STRIPE_PRICE_ENTERPRISE` a `getPlanPriceId()`

### 6. Mettre a jour `modules/billing/entitlements.ts`
- Verifier que `planRanks` inclut ENTERPRISE avec le bon rang

### 7. Mettre a jour la page pricing
- Ajouter le plan dans `app/pricing/page.tsx`

### 8. Enregistrer le webhook
- S'assurer que `customer.subscription.created/updated/deleted` sont couverts
- Le handler dans `app/api/webhooks/stripe/route.ts` utilise `getPlanFromMetadata()` — mettre a jour si necessaire

### 9. Verifier
- `pnpm db:migrate` si le schema a change
- Tester le checkout en mode Stripe test
- Verifier que `hasPlanEntitlement({ minimumPlan: "ENTERPRISE" })` fonctionne
