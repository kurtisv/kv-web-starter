# Skill: Design Audit

Audite les composants et pages pour identifier les violations du design system.

## Quand utiliser

- Avant une release
- Quand un PR touche des composants visuels
- Quand un nouveau contributeur a travaille sur l'UI

## Procedure

### 1. Scanner les couleurs hardcodees

Chercher dans `apps/web/src/components/` et `apps/web/src/app/`:
```
text-<color>-<shade>   (ex: text-green-500, text-red-600)
bg-<color>-<shade>
border-<color>-<shade>
#<hex>
rgb(
```

Tout ce qui n'est pas une variable CSS (`text-primary`, `bg-muted`, `border-border`, etc.) est une violation.

### 2. Verifier la compatibilite theme

Pour chaque composant UI important, verifier qu'il fonctionne avec:
- (aucun data-theme) — theme par defaut zinc
- `data-theme="luxury-auto"` — dark, fond noir
- `data-theme="local-business"` — clair, fond creme

Si le composant "casse" visuellement sur l'un des themes, c'est une violation.

### 3. Verifier l'accessibilite basique

- Les boutons ont-ils un `focus-visible:ring` ?
- Les images ont-elles un `alt` ?
- Les icones decoratives ont-elles `aria-hidden="true"` ?
- Les labels de formulaire sont-ils associes aux inputs ?

### 4. Verifier la responsivite

- La page est-elle lisible sur mobile (< 640px) ?
- Y a-t-il des debordements horizontaux ?
- Les grilles se replient-elles correctement ?

### 5. Rapport

Lister les violations par categorie:
- **Couleurs hardcodees** — fichier:ligne, valeur actuelle, remplacement recommande
- **Theme breaks** — composant, theme, description du probleme
- **A11y** — element, probleme, correction
- **Responsive** — composant, breakpoint problematique

### Fix rapide

Pour remplacer `text-green-500` -> `text-success`:
1. Verifier que `--success` est defini dans `globals.css` (oui)
2. Remplacer partout dans le fichier
3. Tester sur les deux themes dark (luxury-auto, dark-tech-api)
