# Skill: Generate Theme

Cree un nouveau theme visuel pour kv-web-starter.

## Procedure

### 1. Definir les valeurs du theme

Collecter:
- Couleur de fond principale (`--background`)
- Couleur de texte principale (`--foreground`)
- Couleur primaire (`--primary`) + son contraste (`--primary-foreground`)
- Couleur secondaire (`--secondary`)
- Couleur de muted (`--muted`, `--muted-foreground`)
- Couleur de bordure (`--border`)
- Couleur d'accent (`--accent`)
- Rayon de bordure (`--radius`: 0.125rem / 0.25rem / 0.375rem / 0.5rem / 0.75rem)
- Mode: light ou dark

### 2. Ajouter dans globals.css

```css
[data-theme="mon-theme"] {
  --background: #...;
  --foreground: #...;
  --card: #...;
  --card-foreground: #...;
  --muted: #...;
  --muted-foreground: #...;
  --border: #...;
  --input: #...;
  --ring: #...;      /* = primary pour les focus rings */
  --primary: #...;
  --primary-foreground: #...;
  --secondary: #...;
  --secondary-foreground: #...;
  --accent: #...;
  --accent-foreground: #...;
  --radius: 0.375rem;
}
```

### 3. Ajouter dans tokens.ts

```ts
// Dans THEMES:
"mon-theme",

// Dans THEME_META:
"mon-theme": {
  label: "Mon Theme",
  description: "Description courte",
  dark: false,
  accent: "#hex-couleur-primaire",
},
```

### 4. Creer un preset projet (optionnel)

Si le theme correspond a un type de projet, ajouter une entree dans `config/project-presets.ts`.

### 5. Tester

- Appliquer `data-theme="mon-theme"` sur `/demo/<type>` ou directement sur une page
- Verifier: boutons, cards, badges, formulaires, navigation
- Verifier le contraste texte/fond (ratio minimum 4.5:1 WCAG AA)
- Verifier que `--destructive`, `--success`, `--warning` restent lisibles sur ce fond

### Checklist validation

- [ ] Toutes les variables CSS definies (ne pas en oublier)
- [ ] `THEMES` et `THEME_META` mis a jour dans tokens.ts
- [ ] Contraste suffisant (tester avec browser DevTools > Accessibility)
- [ ] Fonctionne en mode reduced-motion
- [ ] ThemePreviewCard affiche correctement le swatch
