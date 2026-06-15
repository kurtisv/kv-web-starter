# Skill: UI Polish

Procedure de polissage visuel des composants et pages.

## Quand utiliser

- Avant une demo client
- Avant une release publique
- Quand le design semble "pas fini"

## Procedure

### 1. Verifier les espacements

- Les sections ont-elles des `py-16 sm:py-24` ?
- Les cards ont-elles des paddings coherents (p-6 ou p-5) ?
- Les grilles ont-elles des `gap-4` ou `gap-6` ?
- Il ne doit pas y avoir deux valeurs d'espacement differentes pour le meme type d'element

### 2. Verifier la typographie

Utiliser les constantes `TYPOGRAPHY` de `tokens.ts`:
- H1: `text-4xl font-semibold tracking-tight text-balance sm:text-6xl`
- H2: `text-3xl font-semibold tracking-tight`
- Body: `text-base leading-7 text-muted-foreground`
- Caption: `text-xs text-muted-foreground`

### 3. Verifier les transitions

- Les boutons ont-ils `transition-all duration-150` ?
- Les liens ont-ils `hover:text-foreground transition-colors` ?
- Les cards avec hover ont-elles `hover:shadow-md` ou `hover:bg-muted/50` ?

### 4. Verifier les etats vides et de chargement

- Y a-t-il un `EmptyState` pour les listes vides ?
- Y a-t-il un `LoadingState` ou `Skeleton` pour les chargements ?
- Les erreurs sont-elles visibles et actionnables ?

### 5. Micro-details

- Les icones ont-elles la bonne taille (`h-4 w-4`, `h-5 w-5`) ?
- Les textes longs ont-ils `text-balance` ou `max-w-prose` ?
- Les CTA sont-ils assez visibles (taille lg ou xl) ?
- Les badges sont-ils coherents (meme variant pour le meme type de donnee) ?

### 6. Validation finale

Passer chaque page en revue sur:
- Desktop (1280px)
- Tablet (768px)
- Mobile (375px)

Lister les problemes restants si non resolus dans cette session.
