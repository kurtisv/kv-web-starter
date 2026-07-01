# Frontend Design Agent Rules

**Sprint:** Frontend Experience System — Phase 1
**Date:** 2026-07-01

Ces regles gouvernent comment tout agent doit prendre ses decisions de design front-end.
Elles existent pour eliminer les interfaces fades, incoherentes ou inaccessibles.

---

## Les 20 Regles

### Regles de direction (avant de coder)

**1. Ne jamais creer une page sans selectionner un design profile.**
Chaque page a une intention visuelle. Choisir un profile dans `design-profiles.ts` avant
de commencer. Si aucun ne convient exactement, prendre le plus proche et documenter le
choix.

**2. Ne jamais creer une page sans selectionner au moins un frontend pattern.**
Les patterns definissent la combinaison de composants et l'intention UX. Choisir dans
`frontend-patterns.ts`. Un pattern repond a "Qu'est-ce que je construis et pourquoi ?".

**3. Ne jamais creer une card custom si une card existante peut etre adaptee.**
Verifier le Component Registry avant d'ecrire un nouveau composant. Si un composant
couvre 80% du besoin, l'adapter via les props ou les component variables, pas le remplacer.

**4. Ne jamais utiliser un composant sans verifier ses etats.**
Chaque composant interactif doit montrer : hover, focus-visible, active, disabled.
Chaque composant de donnee doit montrer : loading, empty, error quand applicable.
Absence d'un etat = bug UX, pas une lacune optionnelle.

### Regles d'accessibilite (non negotiables)

**5. Tout element interactif doit avoir focus-visible.**
`outline-none` seul est interdit. Remplacer par `focus-visible:ring-2 focus-visible:ring-ring`.
Les boutons icon-only doivent avoir `aria-label`.

**6. Tout workflow doit definir loading, empty, error et success quand applicable.**
Un formulaire sans etat error n'est pas pret pour production.
Un tableau sans etat loading n'est pas pret pour production.

**7. Chaque image decorative doit avoir `alt=""` ou `aria-hidden="true"`.**
Chaque image informative doit avoir un alt descriptif.
Les icones decoratives ont `aria-hidden="true"`.

**8. Toute animation doit respecter reduced-motion.**
```css
@media (prefers-reduced-motion: reduce) { ... }
```
Ou en Tailwind : `motion-safe:animate-*`.
Ou en React/Framer : `useReducedMotion()` guard.

### Regles de qualite visuelle

**9. Toute page doit passer mobile 390px sans overflow.**
Tester systematiquement avant de commiter. Les grids a N colonnes doivent passer a
1-2 colonnes sur mobile. Les textes ne tronquent pas sans ellipsis ou wrap.

**10. Tout domaine doit utiliser un design recipe compatible.**
Ne pas appliquer `premium-saas` sur un site de coiffure.
Ne pas appliquer `dark-technical` sur une boutique e-commerce.
La liste des recipes est dans `design-recipes.ts`.

**11. La decoration doit soutenir le contenu, pas le concurrencer.**
Une animation, un gradient ou un effet doit amplifier le message, pas le noyer.
Regle pratique : si l'effet disparaissait, le contenu resterait-il clair ? Si non, simplifier.

**12. Le CTA primaire doit etre evident.**
Un seul CTA primaire par section. Il doit etre le plus visible de la zone.
Variante `primary` ou `btn-gradient`, jamais `ghost` pour le CTA principal.

### Regles de feedback utilisateur

**13. Le feedback utilisateur doit etre visible apres chaque action.**
Apres un click, un submit ou une selection : l'utilisateur doit voir quelque chose bouger.
Loading spinner, succes message, etat change, toast — au moins un signal.

**14. Les messages d'erreur doivent etre lisibles et suggerer une correction.**
Pas de "Error 500". Pas de stack trace.
Format : "Ce champ est requis" ou "L'adresse e-mail n'est pas valide. Verifier le format."

**15. Les filtres actifs doivent etre visibles et reinitialiserables.**
Un filtre actif sans badge ou indicateur visible est un bug UX.
Un systeme de filtres sans bouton "Effacer" est un bug UX.

### Regles par domaine

**16. Dashboards : prioriser la scannabilite sur la decoration.**
Metriques grandes et contrastees. Labels courts. Pas d'animation sur les chiffres.
Reduire la decoration au minimum pour maintenir le focus sur la donnee.

**17. Ecommerce : prioriser la clarte de conversion.**
Prix, image, CTA et note visibles au premier regard.
Pas de friction (login requis avant ajout au panier = friction).
Indicateur de stock quand pertinent.

**18. Immobilier : prioriser la confiance, le prix et la localisation.**
Prix au-dessus du pli dans chaque carte.
Localisation et surface en metadonnees primaires.
Photos de qualite et contact agent facilement accessible.

**19. Booking : prioriser la confiance et la clarte de l'etape suivante.**
L'utilisateur sait toujours ou il en est dans le flow (step indicator).
La confirmation indique : quoi, quand, ou, et quelle est la prochaine etape.
Annulation facile a trouver (reduire l'anxiete).

**20. API/dev : prioriser la precision et les exemples copiables.**
Chaque endpoint a un exemple runnable.
Les codes d'authentification sont en premier.
Le code est syntaxiquement correct et testable en 60 secondes.

---

## Agent Decision Flow

Ordre obligatoire avant de coder un composant, une page ou une section :

```
1. Identifier le domaine
   → Quel type de business / contexte ?
   → ex: saas, ecommerce, booking, real-estate, portfolio, api...

2. Selectionner le design profile
   → design-profiles.ts → choisir le profile le plus adapte
   → ex: "premium-saas", "warm-local", "commerce-clean"...

3. Selectionner le design recipe
   → design-recipes.ts → choisir le recipe du domaine
   → ex: "premium-saas", "warm-booking", "ecommerce-clean"...

4. Selectionner le frontend pattern
   → frontend-patterns.ts → choisir le pattern UX
   → ex: "hero-trust-bar", "booking-flow-confirmation"...

5. Selectionner le UI quality level
   → ui-quality-levels.ts → choisir le niveau
   → ex: "conversion", "dashboard", "editorial"...

6. Selectionner les composants existants
   → component-registry → verifier les composants disponibles
   → Ne pas creer un nouveau composant si un existant couvre le besoin

7. Verifier les etats manquants
   → loading, empty, error, success — lesquels sont necessaires ?
   → Implementer ceux qui manquent avant de finir

8. Verifier mobile (390px)
   → Le layout tient-il ?
   → Les CTA sont-ils accessibles au pouce ?
   → Pas d'overflow horizontal

9. Verifier l'accessibilite
   → focus-visible sur tout element interactif
   → ARIA labels sur icones et inputs
   → Color contrast (texte sur fond)
   → Reduced-motion si animation

10. Creer uniquement si gap documente
    → Si aucun composant n'existe et que le pattern le necessite,
      documenter pourquoi un nouveau composant est cree,
      et l'ajouter au registry avec maturity "beta"
```

---

## Regles de derniere ligne

Ces regles ne se discutent pas. Elles s'appliquent a tout composant, toute page, tout agent.

| Regle | Consequence si violee |
|---|---|
| focus-visible present | Bug accessibility P0 |
| Pas d'overflow mobile | Bug layout P0 |
| Tokens de theme (pas hardcode) | Bug dark mode P1 |
| Reduced-motion respecte | Bug accessibility P1 |
| Empty state present si donnees async | Bug UX P1 |
| Message d'erreur lisible | Bug UX P1 |
| CTA primaire evident | Bug conversion P1 |
| Design profile selectionne | Bug coherence P2 |
