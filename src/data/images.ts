// Mapa de fotos reales por propiedad (slug = mismo slug de src/data/properties.ts).
// cover = primera foto. images = galería completa (incluye la portada).
// planos = planos de apartamentos (guardados, sin mostrar por ahora).
// Las propiedades sin entrada aquí siguen con imágenes provisionales por categoría.
import hero from "@/assets/hero.jpg";
import totoAsset from "@/assets/toto.jpg.asset.json";
import apto from "@/assets/apto.jpg";
import bodega from "@/assets/bodega.jpg";
import interior from "@/assets/interior.jpg";
import finca from "@/assets/finca.jpg";
import type { Category, Property } from "./properties";

export const images = { hero, toto: totoAsset.url, apto, bodega, interior, finca };

export interface PropertyPhotos { cover: string; images: string[]; planos?: string[]; }

export const propertyImages: Record<string, PropertyPhotos> = {
  "altos-de-bracamonte": {
    cover: "/images/altos-de-bracamonte/1.jpg",
    images: [
      "/images/altos-de-bracamonte/1.jpg",
      "/images/altos-de-bracamonte/2.jpg",
      "/images/altos-de-bracamonte/3.jpg",
      "/images/altos-de-bracamonte/4.jpg",
      "/images/altos-de-bracamonte/5.jpg",
      "/images/altos-de-bracamonte/6.jpg",
      "/images/altos-de-bracamonte/7.jpg",
      "/images/altos-de-bracamonte/8.jpg",
      "/images/altos-de-bracamonte/9.jpg",
      "/images/altos-de-bracamonte/10.jpg",
    ],
  },
  "apartamento-envigado-mayorca": {
    cover: "/images/apartamento-envigado-mayorca/1.jpg",
    images: [
      "/images/apartamento-envigado-mayorca/1.jpg",
      "/images/apartamento-envigado-mayorca/2.jpg",
      "/images/apartamento-envigado-mayorca/3.jpg",
      "/images/apartamento-envigado-mayorca/4.jpg",
      "/images/apartamento-envigado-mayorca/5.jpg",
      "/images/apartamento-envigado-mayorca/6.jpg",
      "/images/apartamento-envigado-mayorca/7.jpg",
      "/images/apartamento-envigado-mayorca/8.jpg",
      "/images/apartamento-envigado-mayorca/9.jpg",
      "/images/apartamento-envigado-mayorca/10.jpg",
    ],
  },
  "apartamento-rosales-bogota": {
    cover: "/images/apartamento-rosales-bogota/1.jpg",
    images: [
      "/images/apartamento-rosales-bogota/1.jpg",
      "/images/apartamento-rosales-bogota/2.jpg",
      "/images/apartamento-rosales-bogota/3.jpg",
      "/images/apartamento-rosales-bogota/4.jpg",
      "/images/apartamento-rosales-bogota/5.jpg",
      "/images/apartamento-rosales-bogota/6.jpg",
      "/images/apartamento-rosales-bogota/7.jpg",
      "/images/apartamento-rosales-bogota/8.jpg",
      "/images/apartamento-rosales-bogota/9.jpg",
      "/images/apartamento-rosales-bogota/10.jpg",
    ],
  },
  "casa-finca-ojo-de-agua": {
    cover: "/images/casa-finca-ojo-de-agua/1.jpg",
    images: [
      "/images/casa-finca-ojo-de-agua/1.jpg",
      "/images/casa-finca-ojo-de-agua/2.jpg",
      "/images/casa-finca-ojo-de-agua/3.jpg",
      "/images/casa-finca-ojo-de-agua/4.jpg",
      "/images/casa-finca-ojo-de-agua/5.jpg",
      "/images/casa-finca-ojo-de-agua/6.jpg",
      "/images/casa-finca-ojo-de-agua/7.jpg",
      "/images/casa-finca-ojo-de-agua/8.jpg",
      "/images/casa-finca-ojo-de-agua/9.jpg",
      "/images/casa-finca-ojo-de-agua/10.jpg",
      "/images/casa-finca-ojo-de-agua/11.jpg",
      "/images/casa-finca-ojo-de-agua/12.jpg",
      "/images/casa-finca-ojo-de-agua/13.jpg",
      "/images/casa-finca-ojo-de-agua/14.jpg",
      "/images/casa-finca-ojo-de-agua/15.jpg",
      "/images/casa-finca-ojo-de-agua/16.jpg",
      "/images/casa-finca-ojo-de-agua/17.jpg",
      "/images/casa-finca-ojo-de-agua/18.jpg",
      "/images/casa-finca-ojo-de-agua/19.jpg",
      "/images/casa-finca-ojo-de-agua/20.jpg",
      "/images/casa-finca-ojo-de-agua/21.jpg",
      "/images/casa-finca-ojo-de-agua/22.jpg",
      "/images/casa-finca-ojo-de-agua/23.jpg",
      "/images/casa-finca-ojo-de-agua/24.jpg",
    ],
  },
  "central-de-empresas-y-negocios": {
    cover: "/images/central-de-empresas-y-negocios/1.jpg",
    images: [
      "/images/central-de-empresas-y-negocios/1.jpg",
      "/images/central-de-empresas-y-negocios/2.jpg",
      "/images/central-de-empresas-y-negocios/3.jpg",
      "/images/central-de-empresas-y-negocios/4.jpg",
      "/images/central-de-empresas-y-negocios/5.jpg",
      "/images/central-de-empresas-y-negocios/6.jpg",
      "/images/central-de-empresas-y-negocios/7.jpg",
      "/images/central-de-empresas-y-negocios/8.jpg",
      "/images/central-de-empresas-y-negocios/9.jpg",
      "/images/central-de-empresas-y-negocios/10.jpg",
    ],
  },
  "hacienda-flandes": {
    cover: "/images/hacienda-flandes/1.jpg",
    images: [
      "/images/hacienda-flandes/1.jpg",
      "/images/hacienda-flandes/2.jpg",
      "/images/hacienda-flandes/3.jpg",
      "/images/hacienda-flandes/4.jpg",
      "/images/hacienda-flandes/5.jpg",
      "/images/hacienda-flandes/6.jpg",
      "/images/hacienda-flandes/7.jpg",
    ],
  },
  "horizontes-territorio-campestre": {
    cover: "/images/horizontes-territorio-campestre/1.jpg",
    images: [
      "/images/horizontes-territorio-campestre/1.jpg",
      "/images/horizontes-territorio-campestre/2.jpg",
      "/images/horizontes-territorio-campestre/3.jpg",
      "/images/horizontes-territorio-campestre/4.jpg",
      "/images/horizontes-territorio-campestre/5.jpg",
      "/images/horizontes-territorio-campestre/6.jpg",
      "/images/horizontes-territorio-campestre/7.jpg",
      "/images/horizontes-territorio-campestre/8.jpg",
    ],
  },
  "la-campina": {
    cover: "/images/la-campina/1.jpg",
    images: [
      "/images/la-campina/1.jpg",
      "/images/la-campina/2.jpg",
      "/images/la-campina/3.jpg",
      "/images/la-campina/4.jpg",
      "/images/la-campina/5.jpg",
      "/images/la-campina/6.jpg",
      "/images/la-campina/7.jpg",
      "/images/la-campina/8.jpg",
      "/images/la-campina/9.jpg",
      "/images/la-campina/10.jpg",
    ],
  },
  "la-trinidad": {
    cover: "/images/la-trinidad/1.jpg",
    images: [
      "/images/la-trinidad/1.jpg",
      "/images/la-trinidad/2.jpg",
      "/images/la-trinidad/3.jpg",
      "/images/la-trinidad/4.jpg",
      "/images/la-trinidad/5.jpg",
      "/images/la-trinidad/6.jpg",
      "/images/la-trinidad/7.jpg",
      "/images/la-trinidad/8.jpg",
      "/images/la-trinidad/9.jpg",
      "/images/la-trinidad/10.jpg",
    ],
  },
  "llanogrande-hills": {
    cover: "/images/llanogrande-hills/1.jpg",
    images: [
      "/images/llanogrande-hills/1.jpg",
      "/images/llanogrande-hills/2.jpg",
      "/images/llanogrande-hills/3.jpg",
      "/images/llanogrande-hills/4.jpg",
      "/images/llanogrande-hills/5.jpg",
      "/images/llanogrande-hills/6.jpg",
      "/images/llanogrande-hills/7.jpg",
      "/images/llanogrande-hills/8.jpg",
      "/images/llanogrande-hills/9.jpg",
      "/images/llanogrande-hills/10.jpg",
    ],
  },
  "lote-28-la-montana": {
    cover: "/images/lote-28-la-montana/1.jpg",
    images: [
      "/images/lote-28-la-montana/1.jpg",
      "/images/lote-28-la-montana/2.jpg",
      "/images/lote-28-la-montana/3.jpg",
      "/images/lote-28-la-montana/4.jpg",
      "/images/lote-28-la-montana/5.jpg",
      "/images/lote-28-la-montana/6.jpg",
      "/images/lote-28-la-montana/7.jpg",
      "/images/lote-28-la-montana/8.jpg",
      "/images/lote-28-la-montana/9.jpg",
      "/images/lote-28-la-montana/10.jpg",
      "/images/lote-28-la-montana/11.jpg",
      "/images/lote-28-la-montana/12.jpg",
      "/images/lote-28-la-montana/13.jpg",
      "/images/lote-28-la-montana/14.jpg",
      "/images/lote-28-la-montana/15.jpg",
      "/images/lote-28-la-montana/16.jpg",
      "/images/lote-28-la-montana/17.jpg",
      "/images/lote-28-la-montana/18.jpg",
      "/images/lote-28-la-montana/19.jpg",
      "/images/lote-28-la-montana/20.jpg",
    ],
  },
  "montemadero": {
    cover: "/images/montemadero/1.jpg",
    images: [
      "/images/montemadero/1.jpg",
      "/images/montemadero/2.jpg",
      "/images/montemadero/3.jpg",
      "/images/montemadero/4.jpg",
      "/images/montemadero/5.jpg",
      "/images/montemadero/6.jpg",
      "/images/montemadero/7.jpg",
      "/images/montemadero/8.jpg",
      "/images/montemadero/9.jpg",
      "/images/montemadero/10.jpg",
    ],
  },
  "reservas-de-juanito-laguna": {
    cover: "/images/reservas-de-juanito-laguna/1.jpg",
    images: [
      "/images/reservas-de-juanito-laguna/1.jpg",
      "/images/reservas-de-juanito-laguna/2.jpg",
      "/images/reservas-de-juanito-laguna/3.jpg",
      "/images/reservas-de-juanito-laguna/4.jpg",
      "/images/reservas-de-juanito-laguna/5.jpg",
      "/images/reservas-de-juanito-laguna/6.jpg",
      "/images/reservas-de-juanito-laguna/7.jpg",
      "/images/reservas-de-juanito-laguna/8.jpg",
      "/images/reservas-de-juanito-laguna/9.jpg",
      "/images/reservas-de-juanito-laguna/10.jpg",
    ],
  },
  "riveras-del-tambo": {
    cover: "/images/riveras-del-tambo/1.jpg",
    images: [
      "/images/riveras-del-tambo/1.jpg",
      "/images/riveras-del-tambo/2.jpg",
      "/images/riveras-del-tambo/3.jpg",
      "/images/riveras-del-tambo/4.jpg",
      "/images/riveras-del-tambo/5.jpg",
      "/images/riveras-del-tambo/6.jpg",
      "/images/riveras-del-tambo/7.jpg",
      "/images/riveras-del-tambo/8.jpg",
      "/images/riveras-del-tambo/9.jpg",
      "/images/riveras-del-tambo/10.jpg",
      "/images/riveras-del-tambo/11.jpg",
    ],
    planos: [
"/images/riveras-del-tambo/planos/1.jpg",
      "/images/riveras-del-tambo/planos/2.jpg",
      "/images/riveras-del-tambo/planos/3.jpg",
      "/images/riveras-del-tambo/planos/4.jpg",
      "/images/riveras-del-tambo/planos/5.jpg",
      "/images/riveras-del-tambo/planos/6.jpg",
      "/images/riveras-del-tambo/planos/7.jpg",
      "/images/riveras-del-tambo/planos/8.jpg",
    ],
  },
  "serranias-de-fizebad": {
    cover: "/images/serranias-de-fizebad/1.jpg",
    images: [
      "/images/serranias-de-fizebad/1.jpg",
      "/images/serranias-de-fizebad/2.jpg",
      "/images/serranias-de-fizebad/3.jpg",
      "/images/serranias-de-fizebad/4.jpg",
      "/images/serranias-de-fizebad/5.jpg",
      "/images/serranias-de-fizebad/6.jpg",
      "/images/serranias-de-fizebad/7.jpg",
      "/images/serranias-de-fizebad/8.jpg",
    ],
  },
  "lote-27-reservas-de-avinon": {
    cover: "/images/lote-27-reservas-de-avinon/1.jpg",
    images: [
      "/images/lote-27-reservas-de-avinon/1.jpg",
      "/images/lote-27-reservas-de-avinon/2.jpg",
      "/images/lote-27-reservas-de-avinon/3.jpg",
      "/images/lote-27-reservas-de-avinon/4.jpg",
      "/images/lote-27-reservas-de-avinon/5.jpg",
      "/images/lote-27-reservas-de-avinon/6.jpg",
      "/images/lote-27-reservas-de-avinon/7.jpg",
      "/images/lote-27-reservas-de-avinon/8.jpg",
      "/images/lote-27-reservas-de-avinon/9.jpg",
      "/images/lote-27-reservas-de-avinon/10.jpg",
      "/images/lote-27-reservas-de-avinon/11.jpg",
      "/images/lote-27-reservas-de-avinon/12.jpg",
      "/images/lote-27-reservas-de-avinon/13.jpg",
      "/images/lote-27-reservas-de-avinon/14.jpg",
      "/images/lote-27-reservas-de-avinon/15.jpg",
      "/images/lote-27-reservas-de-avinon/16.jpg",
    ],
  },
  "terreno-34-cuadras": {
    cover: "/images/terreno-34-cuadras/1.jpg",
    images: [
      "/images/terreno-34-cuadras/1.jpg",
      "/images/terreno-34-cuadras/2.jpg",
      "/images/terreno-34-cuadras/3.jpg",
      "/images/terreno-34-cuadras/4.jpg",
      "/images/terreno-34-cuadras/5.jpg",
      "/images/terreno-34-cuadras/6.jpg",
      "/images/terreno-34-cuadras/7.jpg",
      "/images/terreno-34-cuadras/8.jpg",
    ],
  },
};

const byCategory: Record<Category, string[]> = {
  "lotes-campestres": [finca, hero, finca],
  apartamentos: [apto, interior, hero],
  "bodegas-locales": [bodega, hero, finca],
  "grandes-terrenos": [hero, finca, finca],
  "casas-fincas": [finca, finca, hero],
};

/** Imagen provisional según categoría (rota por id para dar variedad). */
export const placeholderFor = (p: Property, i = 0) => {
  const list = byCategory[p.category];
  return list[(p.id + i) % list.length]!;
};

/** Portada: foto real si la propiedad está en propertyImages; si no, su cover o provisional. */
export const coverFor = (p: Property) => propertyImages[p.slug]?.cover ?? p.cover ?? placeholderFor(p);

/** Galería: fotos reales si existen en propertyImages; si no, cover + provisionales. */
export const galleryFor = (p: Property) => {
  const entry = propertyImages[p.slug];
  const real = entry?.images ?? [p.cover, ...p.images].filter(Boolean);
  const unique = Array.from(new Set(real));
  // Con fotos reales, el respaldo es la misma foto real: nunca una imagen generada.
  const out = unique.map((src, i) => ({ src, fallback: entry ? src : placeholderFor(p, i) }));
  if (!entry) for (let i = out.length; i < 3; i++) out.push({ src: placeholderFor(p, i), fallback: placeholderFor(p, i) });
  return out;
};
