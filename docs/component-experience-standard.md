# Component Experience Standard

**Sprint:** Frontend Experience System — Phase 1
**Date:** 2026-07-01

Ce document definit ce qu'est un bon composant dans ce boilerplate.
Il est destine aux agents, aux developpeurs et aux reviewers.

---

## Component Anatomy

Tout composant suit cette anatomie. Chaque element est optionnel sauf indication.

```
ComponentAnatomy {
  container          — wrapper semantique (section, article, div avec role)
  visual-anchor      — image, icone, illustration ou accent couleur (optionnel)
  header             — zone titre + metadonnees
    title            — OBLIGATOIRE si le composant transmet de l'information
    description      — sous-titre ou texte court
    metadata         — date, auteur, badge, statut
  content            — zone principale du contenu
  primary-action     — CTA principal (un seul par composant)
  secondary-action   — lien, bouton secondaire (optionnel)
  feedback-area      — messages d'erreur, succes, loading, empty
  state-layer        — couche visuelle d'etat (hover, focus, disabled, selected)
  responsive-behavior — comment l'anatomie s'adapte en mobile
}
```

---

## Les 10 Standards Fondamentaux

### 1. Chaque composant a un objectif clair
Un composant ne fait qu'une chose. Il se decrit en une phrase : "ce composant affiche X
dans le contexte Y". Si la phrase contient "et", le composant fait trop.

### 2. Tout element interactif a des etats visibles
- `hover` : changement de couleur/elevation visible
- `focus-visible` : ring ou outline visible (pas supprime avec `outline-none` seul)
- `active` / `pressed` : feedback tactile (scale ou opacity)
- `disabled` : `opacity-50 cursor-not-allowed pointer-events-none`
Aucun element interactif ne peut etre identique dans tous ces etats.

### 3. Tout composant de workflow gere ses etats de cycle de vie
Quand applicable : `loading`, `empty`, `error`, `success`.
- `loading` : skeleton ou spinner, pas de flash de contenu vide
- `empty` : message humain + action de recovery si possible
- `error` : message lisible + suggestion de correction
- `success` : confirmation visible, pas seulement absence d'erreur

### 4. Toute carte a une hierarchie claire
Ordre visuel : ancre visuelle → titre → metadonnees → contenu → action.
Le titre doit etre scannable en 1 seconde.
L'action principale doit etre accessible au premier regard.

### 5. Toute section marketing a une intention dominante
Une section = une intention parmi : confiance, conversion, education, preuve, navigation, action.
Ne jamais melanger deux intentions de meme poids dans une section.

### 6. Tout composant est lisible sur mobile 360/390px
Aucun texte ne deborde, aucun element ne cree de scroll horizontal.
Les grids passent de N colonnes a 1 ou 2 colonnes sur mobile.
Les CTA ont une surface tactile minimum de 44x44px.

### 7. Tout composant evite l'overflow horizontal
Tester systematiquement avec `overflow-x: hidden` sur le parent.
Les tableaux utilisent `overflow-x-auto` sur leur conteneur.
Les badges/tags passent en `flex-wrap`.

### 8. Tout composant respecte les tokens de theme actif
- Jamais `bg-blue-500` directement : utiliser `bg-primary` ou `bg-primary/15`.
- Jamais `text-gray-700` : utiliser `text-foreground` ou `text-muted-foreground`.
- Jamais `border-gray-200` : utiliser `border-border`.
Exception documentee uniquement si la couleur est semantique (vert = succes, rouge = erreur)
et que les tokens CSS variables correspondants n'existent pas.

### 9. Toute animation respecte reduced-motion
```tsx
// Toujours
motion-safe:animate-fade-in
// Ou via Framer:
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
```
Pas d'animation sans `@media (prefers-reduced-motion: reduce)` guard.

### 10. Tout composant expose className et evite les couleurs de marque hardcodees
```tsx
// Toujours
className?: string
// Dans le JSX
<div className={cn("base-classes", className)}>
```
Les couleurs de marque sont dans les tokens CSS, pas dans le JSX.

---

## Standards par type

### Button Standard

Un bouton client-ready doit :
- avoir un variant principal par contexte (primary, secondary, ghost, destructive)
- montrer hover + focus-visible + disabled
- ne pas depasser le texte de son CTA (pas de texte vague "Cliquez ici")
- etre accessible au clavier et au click
- avoir un `aria-label` si l'icone seule porte le sens

### Card Standard

Une carte client-ready doit :
- avoir une hierarchie visuelle claire (surface → titre → meta → action)
- montrer hover/focus si cliquable (`cursor-pointer`, ring ou elevation change)
- respecter les tokens de theme (pas de couleur hardcodee)
- etre lisible sur mobile (pas de texte tronque sans ellipsis)
- avoir une variante mobile safe (padding adapte, pas d'image coupee)
- afficher un badge/statut coherent avec StatusBadge si statut present

### Form Standard

Un formulaire client-ready doit :
- avoir des labels associes (`htmlFor` + `id`)
- montrer l'etat focus-visible sur chaque input
- montrer l'etat error avec message lisible sous le champ
- montrer l'etat success apres soumission reussie
- avoir un bouton de soumission qui se desactive pendant le chargement
- respecter `aria-describedby` pour les messages d'aide et d'erreur

### Filter Standard

Un systeme de filtres client-ready doit :
- afficher les filtres actifs visiblement (badges, texte ou etat actif)
- fournir un bouton "Effacer" visible quand des filtres sont actifs
- etre accessible au clavier (Tab entre filtres, Enter/Space pour activer)
- avoir un `aria-label` sur le champ de recherche
- mettre a jour les resultats sans rechargement complet de page

### Marketing Section Standard

Une section marketing client-ready doit :
- avoir une intention unique et dominante
- avoir un titre scannable (max 2 lignes sur mobile)
- respecter la densite du design profile actif
- avoir un CTA visible si l'intention est "conversion" ou "action"
- ne pas utiliser plus de 2 niveaux visuels de cartes simultanement

### Domain Card Standard

Une carte metier client-ready doit :
- identifier clairement le domaine (immobilier, booking, ecommerce, etc.)
- prioriser les informations specifiques au domaine en premier
- utiliser les icones et labels pertinents au domaine
- avoir un statut visible si applicable (StatusBadge)
- proposer une action principale claire

### Dashboard Component Standard

Un composant dashboard client-ready doit :
- prioriser la scannabilite (chiffres grands, labels courts)
- avoir un empty state clair avec message utile
- avoir un loading state (skeleton ou spinner)
- ne pas dependre de la couleur seule pour transmettre l'information
- etre lisible en un coup d'oeil sans survol

### Empty State Standard

Un empty state client-ready doit :
- avoir une icone illustrative (optionelle mais recommandee)
- avoir un message humain qui explique pourquoi c'est vide
- avoir une action de recovery quand possible ("Ajouter", "Importer", etc.)
- ne pas simplement afficher "Aucun resultat" sans contexte

### Error State Standard

Un error state client-ready doit :
- avoir un message lisible par un humain non technique
- suggerer une action de recovery
- ne pas exposer de details techniques (stack trace, codes internes)
- avoir un moyen de reessayer si l'erreur est retryable

### Loading State Standard

Un loading state client-ready doit :
- utiliser `SkeletonTable`, `SkeletonCard` ou `SkeletonMetric` selon le contexte
- ne jamais flasher du contenu vide avant le skeleton
- avoir une duree de transition courte (< 200ms avant affichage)
- respecter reduced-motion (pas d'animation agressive du skeleton)

---

## Criteres de validation d'un composant

Avant de marquer un composant comme `production` dans le registry :

- [ ] Objectif clair et documentable en une phrase
- [ ] Tous les etats interactifs sont visibles
- [ ] Mobile 390px sans overflow
- [ ] Tokens de theme (pas de couleurs hardcodees)
- [ ] Accessibilite : ARIA roles, labels, keyboard navigation
- [ ] Reduced-motion respecte si animation presente
- [ ] `className` expose
- [ ] Empty/loading/error states si applicable
- [ ] Exports nommes (pas d'export default)
- [ ] Tests ou exemples documentes
