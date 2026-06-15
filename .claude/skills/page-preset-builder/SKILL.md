# Skill: Page Preset Builder

Cree une nouvelle page demo pour un type de projet donne.

## Procedure

### 1. Choisir le type

Selectionner parmi: portfolio, saas, booking, api, real-estate, local-business, auto-blog, ecommerce, dashboard.

### 2. Choisir le theme

Consulter `PROJECT_PRESETS[type].theme` dans `config/project-presets.ts`.

### 3. Construire la page

Structure standard d'une page demo:
```tsx
export default function DemoXxxPage() {
  return (
    <div data-theme="<theme-id>">
      <HeroSection ... />          // Toujours en premier
      <StatsSection ... />         // Chiffres cles (optionnel)
      <FeatureGrid ... />          // Ou section produit specifique
      <PricingSection ... />       // Si monetisation
      <TestimonialSection ... />   // Social proof
      <CTASection ... />           // Toujours en dernier
    </div>
  );
}
```

### 4. Contenu realiste

Ne pas mettre de lorem ipsum. Le contenu doit simuler un vrai produit:
- Noms de features concrets
- Chiffres plausibles
- Temoignages avec roles realistes
- Plans de prix coherents avec le marche

### 5. Logique produit

Chaque type de demo doit montrer SA logique metier:
- booking: liste de creneaux, selection de service
- api: endpoints liste, code sample, metriques
- ecommerce: cards produit avec prix/stock/promo
- dashboard: tableau de bord avec KPIs et table

### 6. Validation

- [ ] Le `data-theme` est applique au root element
- [ ] La page est lisible sur mobile
- [ ] Les composants viennent de `components/sections/` ou `dashboard-ui/`
- [ ] Pas de couleurs hardcodees
- [ ] La page est ajoutee dans `/demo/page.tsx` (index)
