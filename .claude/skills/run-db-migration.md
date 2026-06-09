# Skill : Workflow migration Prisma

## Quand utiliser
Quand l'utilisateur veut modifier le schema de la base de donnees.

## Procedure

### 1. Modifier `prisma/schema.prisma`
Editer le schema directement. Conventions :
- IDs : `String @id @default(cuid())` (pas d'auto-increment int)
- Timestamps : `createdAt DateTime @default(now())` et `updatedAt DateTime @updatedAt`
- Relations : toujours declarer les deux cotes (`@relation` + champ inverse dans le modele lie)
- Index : `@@index([champ])` sur les champs utilises dans `where` ou `orderBy` frequents

### 2. Valider le schema
```bash
pnpm db:validate
```
Corrige les erreurs avant de continuer.

### 3. Regenerer le client Prisma
```bash
pnpm db:generate
```
Met a jour `apps/web/src/generated/prisma/`.

### 4. Appliquer en developpement
```bash
pnpm db:migrate
# Prisma demande un nom pour la migration (ex: "add-feature-x")
```
Cree un fichier SQL dans `prisma/migrations/` et applique les changements.

### 5. Verifier la migration
```bash
pnpm typecheck   # Verifier que les nouveaux types sont corrects
pnpm test        # Verifier que les tests passent encore
```

### 6. En production
```bash
# Via CI ou deploy hook :
pnpm exec prisma migrate deploy
```
Applique les migrations en attente sans creer de nouvelles.

## Regles importantes
- Ne JAMAIS modifier un fichier dans `prisma/migrations/` a la main
- Si une migration echoue en prod, investiguer avant de retenter
- Pour les changements destructifs (suppression de colonne) : creer d'abord une migration de deprecation, puis une de suppression
- `db:push` est UNIQUEMENT pour le prototypage rapide — ne laisse pas de trace de migration
