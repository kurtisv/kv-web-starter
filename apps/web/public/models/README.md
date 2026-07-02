# public/models - 3D assets

Politique complete: `src/lib/three-d/asset-policy.ts`.
Inventaire: `src/lib/three-d/model-manifest.ts` (source de verite - tout fichier ajoute ici DOIT y etre declare).

## Regles

1. Format: `.glb` en priorite (Draco OK, decodeur local dans `public/draco-gltf/`).
2. Budget de poids: 2048 Ko max par modele, cible 512 Ko pour mobile, chargement differe au-dela de 1024 Ko.
3. Licence obligatoire: `cc0`, `public-domain` ou `internal` pour tout nouvel asset. Documenter la source (URL) dans le manifest.
4. Chaque modele doit avoir un fallback: image statique OU placeholder procedural (`components/three-d/model-placeholder.tsx`).
5. Chaque usage fournit une description alternative (aria-label).
6. Aucun asset runtime charge depuis un CDN externe.

## Arborescence

```
public/models/3d/<slot>/default.glb   # modele principal du slot
public/models/3d/fallback/            # images fallback partagees
```

## Etat actuel

| Fichier | Poids | Licence | Statut |
| --- | --- | --- | --- |
| 3d/phone/default.glb | 868 Ko | unknown | a clarifier avant reutilisation |
| 3d/laptop/default.glb | 408 Ko | unknown | a clarifier avant reutilisation |
| 3d/car/default.glb | 5296 Ko | unknown | HORS BUDGET - ne pas reutiliser |

Les nouvelles demos 3D (`/demo/3d/*`) n'utilisent AUCUN GLB: geometrie procedurale uniquement, 0 Ko de telechargement, aucune question de licence.
