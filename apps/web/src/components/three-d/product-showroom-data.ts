/** Shared data for the AeroPod Max product showroom demo.
 * Plain data module: importable from server AND client components.
 * AeroPod Max is a fictional premium headphone brand created for this demo.
 */

export interface ProductColorOption {
  id: string;
  label: string;
  /** Body colour applied to the 3D model */
  hex: string;
  /** Swatch ring colour for the configurator UI */
  swatchClass: string;
}

export interface ProductMaterialOption {
  id: string;
  label: string;
  description: string;
  metalness: number;
  roughness: number;
}

export interface ProductHotspot {
  id: string;
  index: number;
  title: string;
  body: string;
  /** World position of the marker on the 3D model */
  position: [number, number, number];
}

export interface ProductSpec {
  label: string;
  value: string;
  detail: string;
}

export const PRODUCT_NAME = "AeroPod Max";
export const PRODUCT_TAGLINE =
  "Casque audio premium fictif - la piece maitresse de cette demo de showroom 3D.";
export const PRODUCT_PRICE = "549 $";

export const PRODUCT_COLORS: ProductColorOption[] = [
  { id: "onyx", label: "Onyx", hex: "#374151", swatchClass: "bg-gray-700" },
  { id: "lunar", label: "Argent lunaire", hex: "#cbd5e1", swatchClass: "bg-slate-300" },
  { id: "abyss", label: "Bleu abysse", hex: "#1e3a8a", swatchClass: "bg-blue-900" },
  { id: "sage", label: "Sauge", hex: "#84a98c", swatchClass: "bg-emerald-300" },
];

export const PRODUCT_MATERIALS: ProductMaterialOption[] = [
  {
    id: "aluminium",
    label: "Aluminium brosse",
    description: "Finition metallique reflechissante, toucher froid.",
    metalness: 0.85,
    roughness: 0.28,
  },
  {
    id: "titanium",
    label: "Titane mat",
    description: "Sobre et resistant, reflets diffus.",
    metalness: 0.6,
    roughness: 0.5,
  },
  {
    id: "ceramic",
    label: "Ceramique",
    description: "Surface lisse quasi laquee, aspect haut de gamme.",
    metalness: 0.15,
    roughness: 0.16,
  },
];

export const PRODUCT_HOTSPOTS: ProductHotspot[] = [
  {
    id: "battery",
    index: 1,
    title: "Batterie 40 h",
    body: "Cellule haute densite logee dans l'ecouteur droit. Recharge rapide: 10 minutes pour 5 heures d'ecoute.",
    position: [1.18, -0.35, 0.25],
  },
  {
    id: "spatial-audio",
    index: 2,
    title: "Audio spatial",
    body: "Transducteurs de 42 mm et suivi dynamique de la tete pour un rendu immersif certifie studio.",
    position: [-1.25, 0.05, 0.3],
  },
  {
    id: "material",
    index: 3,
    title: "Materiaux premium",
    body: "Arceau en alliage aeronautique, coussinets en mousse a memoire de forme tissee.",
    position: [0, 1.28, 0.1],
  },
  {
    id: "connection",
    index: 4,
    title: "Connexion multipoint",
    body: "Bluetooth 5.4, deux appareils simultanes, latence reduite en mode createur.",
    position: [1.2, 0.45, -0.2],
  },
  {
    id: "warranty",
    index: 5,
    title: "Garantie 3 ans",
    body: "Couverture complete pieces et main-d'oeuvre, echange express sous 48 h.",
    position: [-1.15, -0.55, -0.25],
  },
];

export const PRODUCT_SPECS: ProductSpec[] = [
  { label: "Autonomie", value: "40 h", detail: "ANC actif, volume 50 %" },
  { label: "Transducteurs", value: "42 mm", detail: "Diaphragme bio-cellulose" },
  { label: "Reduction de bruit", value: "-38 dB", detail: "Hybride, 8 micros" },
  { label: "Poids", value: "312 g", detail: "Arceau alliage aeronautique" },
  { label: "Connexion", value: "BT 5.4", detail: "Multipoint, AAC / LDAC" },
  { label: "Charge", value: "USB-C", detail: "10 min = 5 h d'ecoute" },
];

export const THREE_D_BENEFITS = [
  {
    title: "Inspection a 360 degres",
    body: "Le client tourne autour du produit comme en boutique: aucune photo ne remplace ce niveau de confiance.",
  },
  {
    title: "Variantes instantanees",
    body: "Couleurs et materiaux changent en temps reel sans recharger de galerie photo - un seul modele, toutes les finitions.",
  },
  {
    title: "Points forts contextualises",
    body: "Les hotspots ancrent chaque argument commercial a l'endroit exact du produit concerne.",
  },
];
