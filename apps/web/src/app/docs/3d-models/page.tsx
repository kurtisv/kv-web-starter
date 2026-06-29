import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Box, CheckCircle2, Download, FolderOpen, Layers, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MarketingPageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Modeles 3D — Guide",
  description:
    "Comment remplacer les scenes Three.js procedurales par de vrais modeles GLB dans KV Web Starter.",
};

// ── Data ──────────────────────────────────────────────────────────────────────

const SLOTS = [
  {
    type: "phone",
    label: "Telephone",
    path: "public/models/3d/phone/default.glb",
    component: "PhoneMockup3D / Smart3DObject objectType=\"phone\"",
    fallback: "ProceduralPhoneFallback — iPhone 16 Pro titanium procedural",
  },
  {
    type: "laptop",
    label: "Laptop",
    path: "public/models/3d/laptop/default.glb",
    component: "WebsiteShowcase3D / Smart3DObject objectType=\"laptop\"",
    fallback: "ProceduralLaptopFallback — MacBook Pro 16\" procedural",
  },
  {
    type: "car",
    label: "Voiture",
    path: "public/models/3d/car/default.glb",
    component: "Car3DPreview / Smart3DObject objectType=\"car\"",
    fallback: "ProceduralCarFallback — GT coupe procedural",
  },
];

const SOURCES = [
  { name: "Sketchfab", url: "https://sketchfab.com/features/free-3d-models", license: "CC0 / CC-BY", note: "Filtrer par licence" },
  { name: "Poly Haven", url: "https://polyhaven.com/models", license: "CC0", note: "Qualite photo-realiste" },
  { name: "pmndrs market", url: "https://market.pmnd.rs/", license: "CC0", note: "Optimise React Three Fiber" },
  { name: "KhronosGroup Samples", url: "https://github.com/KhronosGroup/glTF-Sample-Assets", license: "Varies / CC0", note: "Modeles de reference glTF" },
  { name: "Quaternius", url: "https://quaternius.com/", license: "CC0", note: "Packs stylises low-poly" },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Docs3DModelsPage() {
  return (
    <MarketingPageShell>
      <div className="mx-auto max-w-4xl px-6 py-16">

        {/* Back */}
        <Link
          href="/docs"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Guide
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="mb-3 flex items-center gap-2">
            <Badge variant="outline">3D</Badge>
            <Badge variant="outline">GLB</Badge>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight">Modeles 3D</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            KV Web Starter affiche des scenes Three.js procedurales par defaut.
            Deposez un fichier <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">.glb</code> dans
            le bon dossier pour passer automatiquement au vrai modele — sans toucher au code.
          </p>
        </div>

        {/* Architecture */}
        <section className="mb-14">
          <div className="mb-5 flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">Architecture en 3 couches</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { n: "1", title: "GLB reel", color: "text-green-600", desc: "Modele charge depuis /public/models/3d/. Prise en charge automatique si le fichier est present." },
              { n: "2", title: "Procedural Three.js", color: "text-blue-600", desc: "Scene construite en code — toujours disponible. Utilise si le GLB est absent ou en erreur." },
              { n: "3", title: "Fallback CSS", color: "text-muted-foreground", desc: "Icone statique quand WebGL n'est pas disponible. Gere par SafeSceneCanvas automatiquement." },
            ].map((l) => (
              <Card key={l.n} className="border-border/60">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-3xl font-bold ${l.color} opacity-30`}>{l.n}</span>
                    <CardTitle className="text-base">{l.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{l.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            La cascade est geree par <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">Smart3DObject</code> :
            un HEAD request verifie si le GLB existe avant de le charger, evitant tout flash d&apos;erreur.
          </p>
        </section>

        {/* Slots */}
        <section className="mb-14">
          <div className="mb-5 flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">Slots disponibles</h2>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-4 py-3 text-left font-medium">Slot</th>
                  <th className="px-4 py-3 text-left font-medium">Chemin du fichier</th>
                  <th className="px-4 py-3 text-left font-medium hidden lg:table-cell">Composant</th>
                </tr>
              </thead>
              <tbody>
                {SLOTS.map((s, i) => (
                  <tr key={s.type} className={i < SLOTS.length - 1 ? "border-b border-border/40" : ""}>
                    <td className="px-4 py-3 font-medium">{s.label}</td>
                    <td className="px-4 py-3">
                      <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">{s.path}</code>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground text-xs">
                      {s.component}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How to replace */}
        <section className="mb-14">
          <div className="mb-5 flex items-center gap-2">
            <Box className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">Comment remplacer un modele</h2>
          </div>
          <ol className="space-y-6">
            {[
              {
                n: "1",
                title: "Trouver un modele CC0",
                body: "Telecharge un .glb depuis une des sources listees ci-dessous. Verifie que la licence est CC0 ou CC-BY si tu l'utilises commercialement.",
              },
              {
                n: "2",
                title: "Optimiser avec gltfpack (recommande)",
                body: "Les GLB bruts peuvent faire 30-100 MB. gltfpack les compresse a < 5 MB avec Draco + meshopt.",
                code: `# Installer gltfpack
winget install meshoptimizer.gltfpack

# Compresser
gltfpack -i mon-modele.glb -o default.glb -cc -tc`,
              },
              {
                n: "3",
                title: "Deposer dans le bon dossier",
                body: "Renomme le fichier default.glb et place-le dans le dossier du slot correspondant.",
                code: `public/
  models/
    3d/
      phone/default.glb   <- telephone
      laptop/default.glb  <- laptop
      car/default.glb     <- voiture`,
              },
              {
                n: "4",
                title: "Verifier",
                body: "Relance pnpm dev. Smart3DObject detecte automatiquement le fichier via HEAD request et bascule sur le GLB. Aucun changement de code requis.",
                code: `pnpm dev
# Ouvre /demo/components — le vrai modele s'affiche`,
              },
              {
                n: "5",
                title: "Committer",
                body: "Les fichiers GLB ne sont pas gitignores. Committe-les avec le reste du projet.",
                code: `git add public/models/3d/phone/default.glb
git commit -m "feat(3d): real phone GLB model"`,
              },
            ].map((step) => (
              <li key={step.n} className="flex gap-4">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  {step.n}
                </span>
                <div className="flex-1">
                  <p className="font-medium">{step.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
                  {step.code && (
                    <pre className="mt-3 overflow-x-auto rounded-lg bg-[#0d1117] px-4 py-3 text-xs text-[#c9d1d9] leading-relaxed">
                      <code>{step.code}</code>
                    </pre>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Script automatique */}
        <section className="mb-14 rounded-xl border border-primary/20 bg-primary/5 p-6">
          <div className="mb-3 flex items-center gap-2">
            <Download className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Script de telechargement automatique</h2>
          </div>
          <p className="mb-4 text-sm text-muted-foreground">
            Un script PowerShell tente de telecharger les trois modeles CC0 automatiquement.
            Valide le format GLB et propose des sources de secours si le telechargement echoue.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-[#0d1117] px-4 py-3 text-xs text-[#c9d1d9]">
            <code>{`# Telecharger les 3 modeles
powershell.exe -File ./scripts/Download-3D-Models.ps1

# Telecharger + compresser avec gltfpack
powershell.exe -File ./scripts/Download-3D-Models.ps1 -Optimize`}</code>
          </pre>
        </section>

        {/* Sources */}
        <section className="mb-14">
          <div className="mb-5 flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">Sources CC0 recommandees</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {SOURCES.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg border border-border p-4 hover:border-primary/40 hover:bg-accent/30 transition-colors"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                <div>
                  <p className="font-medium group-hover:text-primary transition-colors">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.note}</p>
                  <Badge variant="outline" className="mt-1 text-xs">{s.license}</Badge>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Exigences techniques */}
        <section className="mb-14">
          <h2 className="mb-5 text-2xl font-semibold">Exigences techniques</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { label: "Format", value: "GLB (binary glTF 2.0)" },
              { label: "Compression", value: "Draco ou meshopt (gltfpack)" },
              { label: "Taille cible", value: "< 4 MB par modele" },
              { label: "Geometrie", value: "Triangles, UV optionnel" },
              { label: "Textures", value: "KTX2 / JPEG / PNG, <= 2048px" },
              { label: "Animations", value: "Supportees (OrbitControls pause)" },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between rounded-lg border border-border/60 px-4 py-3">
                <span className="text-sm text-muted-foreground">{r.label}</span>
                <span className="text-sm font-medium">{r.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer nav */}
        <div className="flex items-center justify-between border-t border-border pt-8">
          <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            &larr; Guide principal
          </Link>
          <Link href="/demo/components" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Voir la demo 3D &rarr;
          </Link>
        </div>
      </div>
    </MarketingPageShell>
  );
}
