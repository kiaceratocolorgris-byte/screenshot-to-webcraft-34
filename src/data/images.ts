// Rutas centralizadas de imágenes provisionales. Cuando suba las fotos reales a
// public/images/<slug>/, las rutas de properties.ts (cover / images) se usan automáticamente.
import hero from "@/assets/hero.jpg";
import totoAsset from "@/assets/toto.png.asset.json";
import lote from "@/assets/lote.jpg";
import apto from "@/assets/apto.jpg";
import bodega from "@/assets/bodega.jpg";
import interior from "@/assets/interior.jpg";
import finca from "@/assets/finca.jpg";
import type { Category, Property } from "./properties";

export const images = { hero, toto: totoAsset.url, lote, apto, bodega, interior, finca };

const byCategory: Record<Category, string[]> = {
  "lotes-campestres": [lote, hero, finca],
  apartamentos: [apto, interior, hero],
  "bodegas-locales": [bodega, hero, lote],
  "grandes-terrenos": [hero, lote, finca],
  "casas-fincas": [finca, lote, hero],
};

/** Imagen provisional según categoría (rota por id para dar variedad). */
export const placeholderFor = (p: Property, i = 0) => {
  const list = byCategory[p.category];
  return list[(p.id + i) % list.length]!;
};

/** Galería: cover + images; si faltan, completa con provisionales. */
export const galleryFor = (p: Property) => {
  const real = [p.cover, ...p.images].filter(Boolean);
  const unique = Array.from(new Set(real));
  const out = unique.map((src, i) => ({ src, fallback: placeholderFor(p, i) }));
  for (let i = out.length; i < 3; i++) out.push({ src: placeholderFor(p, i), fallback: placeholderFor(p, i) });
  return out;
};
