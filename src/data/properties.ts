import { images } from "./images";

export type PropertyCategory = "campestre" | "apartamento" | "bodega" | "terreno";
export type Municipio = "El Retiro" | "Rionegro" | "La Ceja" | "Envigado" | "Pereira";

export interface Property {
  id: number;
  slug: string;
  name: string;
  location: string;
  municipio: Municipio;
  category: PropertyCategory;
  tag: string;
  areaLabel: string;
  /** Área mínima en m² para filtrar (null = consultar) */
  minArea: number | null;
  image: string;
  /** Posición en el mapa esquemático (0–100) */
  map: { x: number; y: number };
}

export const CATEGORY_LABELS: Record<PropertyCategory, string> = {
  campestre: "Lotes campestres",
  apartamento: "Apartamentos",
  bodega: "Bodegas y locales",
  terreno: "Grandes terrenos",
};

export const properties: Property[] = [
  { id: 1, slug: "altos-de-bracamonte", name: "Altos de Bracamonte", location: "Vía La Acuarela, Envigado", municipio: "Envigado", category: "campestre", tag: "Lote de lujo", areaLabel: "5.392 m²", minArea: 5392, image: images.lote, map: { x: 22, y: 62 } },
  { id: 2, slug: "central-de-empresas-y-negocios", name: "Central de Empresas y Negocios", location: "Km 2 vía Belén–Rionegro, Rionegro", municipio: "Rionegro", category: "bodega", tag: "Bodegas y locales", areaLabel: "Por etapas", minArea: null, image: images.bodega, map: { x: 66, y: 30 } },
  { id: 3, slug: "hacienda-flandes", name: "Hacienda Flandes", location: "Sector Pantanillo, El Retiro", municipio: "El Retiro", category: "campestre", tag: "Lote campestre", areaLabel: "Consultar", minArea: null, image: images.hero, map: { x: 38, y: 76 } },
  { id: 4, slug: "horizontes-territorio-campestre", name: "Horizontes Territorio Campestre", location: "Vía El Retiro–La Ceja", municipio: "El Retiro", category: "campestre", tag: "Lote campestre", areaLabel: "1.886 – 8.329 m²", minArea: 1886, image: images.lote, map: { x: 50, y: 72 } },
  { id: 5, slug: "lote-28-la-montana", name: "Lote 28 · La Montaña", location: "Parcelación La Montaña, El Retiro", municipio: "El Retiro", category: "campestre", tag: "Lote campestre", areaLabel: "2.376 m²", minArea: 2376, image: images.hero, map: { x: 42, y: 66 } },
  { id: 6, slug: "la-trinidad", name: "La Trinidad", location: "Cerritos, Pereira", municipio: "Pereira", category: "campestre", tag: "Lote campestre", areaLabel: "Más de 1 ha", minArea: 10000, image: images.lote, map: { x: 8, y: 92 } },
  { id: 7, slug: "llanogrande-hills", name: "Llanogrande Hills", location: "Llanogrande, Rionegro", municipio: "Rionegro", category: "campestre", tag: "Lotes premium", areaLabel: "Desde 2.178 m²", minArea: 2178, image: images.hero, map: { x: 56, y: 46 } },
  { id: 8, slug: "apartamento-cerca-de-mayorca", name: "Apartamento cerca de Mayorca", location: "Envigado, cerca al C.C. Mayorca", municipio: "Envigado", category: "apartamento", tag: "Apartamento", areaLabel: "84 m²", minArea: 84, image: images.apto, map: { x: 16, y: 52 } },
  { id: 9, slug: "terreno-34-cuadras", name: "Terreno de 34 cuadras", location: "Entre La Ceja, El Carmen de Viboral y Rionegro", municipio: "La Ceja", category: "terreno", tag: "Gran terreno", areaLabel: "≈ 21,8 ha", minArea: 218000, image: images.terreno, map: { x: 76, y: 58 } },
  { id: 10, slug: "montemadero", name: "Montemadero", location: "El Yarumo, vía San Antonio de Pereira – La Ceja", municipio: "La Ceja", category: "campestre", tag: "Lote campestre", areaLabel: "Desde 2.500 m²", minArea: 2500, image: images.lote, map: { x: 64, y: 66 } },
  { id: 11, slug: "reservas-de-juanito-laguna", name: "Reservas de Juanito Laguna", location: "El Retiro", municipio: "El Retiro", category: "campestre", tag: "Lote campestre", areaLabel: "Desde 5.526 m²", minArea: 5526, image: images.hero, map: { x: 32, y: 70 } },
  { id: 12, slug: "riveras-del-tambo", name: "Riveras del Tambo", location: "La Ceja", municipio: "La Ceja", category: "apartamento", tag: "Apartamentos", areaLabel: "61 – 74 m²", minArea: 61, image: images.apto, map: { x: 62, y: 80 } },
  { id: 13, slug: "serranias-de-fizebad", name: "Serranías de Fizebad", location: "Parcelación Serranías de Fizebad, El Retiro", municipio: "El Retiro", category: "campestre", tag: "Lote exclusivo", areaLabel: "2.296 m²", minArea: 2296, image: images.lote, map: { x: 46, y: 60 } },
  { id: 14, slug: "la-campina", name: "La Campiña", location: "Km 6 vía San Antonio de Pereira – La Ceja (Quirama)", municipio: "La Ceja", category: "campestre", tag: "Lote campestre", areaLabel: "1.500 – 3.900 m²", minArea: 1500, image: images.hero, map: { x: 70, y: 72 } },
];

export const MUNICIPIOS: Municipio[] = ["El Retiro", "Rionegro", "La Ceja", "Envigado", "Pereira"];

export const WHATSAPP_NUMBER = "573004517485";
export const waLink = (msg: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
