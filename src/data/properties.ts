// src/data/properties.ts
// Fuente: Google Site de Toto Partner (textos condensados) + fichas PDF de Toto Partner (precios).
// priceCOP = null  ->  mostrar "Consultar".
// verified:false en distancias  ->  NO mostrar hasta que Toto las confirme.

export type Category =
  | "lotes-campestres"
  | "apartamentos"
  | "bodegas-locales"
  | "grandes-terrenos"
  | "casas-fincas";

export type Region = "Oriente Antioqueño" | "Valle de Aburrá" | "Eje Cafetero" | "Bogotá";

export interface Spec {
  concepto: string;
  dato: string;
  nota?: string;
}

export interface Distance {
  lugar: string;
  tiempo: string; // en carro, aproximado
  verified: boolean;
}

export interface Property {
  id: number;
  slug: string;
  name: string;
  tag: string; // etiqueta sobre la foto de la tarjeta
  category: Category;
  region: Region;
  municipality: string;
  location: string; // línea con pin en la tarjeta
  areaLabel: string; // texto en mono en la tarjeta
  areaMin: number | null; // m², para el filtro "Área mínima"
  areaMax: number | null;
  priceCOP: number | null; // null => "Consultar"
  priceNote?: string; // administración, predial, etc.
  summary: string; // 1-2 frases (meta description / intro)
  description: string[]; // párrafos de la ficha
  keyStats: { value: string; label: string }[]; // 3 cifras junto al título
  specs: Spec[]; // tabla "Tarjeta del lote / inmueble"
  includes: string[]; // "Lo que incluye"
  distances: Distance[];
  showOnMap: boolean;
  pdfUrl?: string; // ficha PDF si existe
  cover: string;
  images: string[]; // /images/<slug>/1.jpg ... (reemplazar por las reales)
}

export const WHATSAPP_NUMBER = "573004517485";
export const WHATSAPP_DISPLAY = "300 451 7485";

export const properties: Property[] = [
  {
    id: 1,
    slug: "altos-de-bracamonte",
    name: "Altos de Bracamonte",
    tag: "Lote de lujo",
    category: "lotes-campestres",
    region: "Valle de Aburrá",
    municipality: "Envigado",
    location: "Vía La Acuarela, Envigado",
    areaLabel: "5.392 m²",
    areaMin: 5392.25,
    areaMax: 5392.25,
    priceCOP: null,
    summary:
      "Lote de 5.392,25 m² en la parcelación boutique Altos de Bracamonte (20 lotes), sobre la Vía La Acuarela, Envigado.",
    description: [
      "Lote de 5.392,25 m² para construir una residencia de lujo en uno de los sectores más exclusivos y valorizados de Envigado, dentro de Altos de Bracamonte, un proyecto boutique de solo 20 lotes.",
      "Combina privacidad, naturaleza y seguridad con vista panorámica, sin alejarse de la ciudad: colegios, universidades, supermercados y comercio quedan cerca por la Vía La Acuarela.",
    ],
    keyStats: [
      { value: "5.392,25 m²", label: "Área total" },
      { value: "20", label: "Lotes en el proyecto" },
      { value: "Envigado", label: "Vía La Acuarela" },
    ],
    specs: [
      { concepto: "Área total", dato: "5.392,25 m²" },
      { concepto: "Proyecto", dato: "Parcelación boutique", nota: "Solo 20 lotes" },
      { concepto: "Ubicación", dato: "Vía La Acuarela, Envigado" },
      { concepto: "Precio", dato: "Consultar" },
    ],
    includes: [
      "Portería y vigilancia",
      "Unidad cerrada",
      "Vías completamente pavimentadas",
      "Acueducto y alcantarillado",
      "Redes eléctricas subterráneas",
      "Zona boscosa",
      "Excelente topografía",
      "Vista panorámica",
    ],
    distances: [],
    showOnMap: true,
    cover: "/images/altos-de-bracamonte/1.jpg",
    images: [],
  },
  {
    id: 2,
    slug: "central-de-empresas-y-negocios",
    name: "Central de Empresas y Negocios",
    tag: "Bodegas y locales",
    category: "bodegas-locales",
    region: "Oriente Antioqueño",
    municipality: "Rionegro",
    location: "Km 2 vía Belén – Rionegro",
    areaLabel: "Por etapas",
    areaMin: null,
    areaMax: null,
    priceCOP: null,
    summary:
      "Desarrollo de bodegas y locales comerciales por etapas en el km 2 de la vía Belén – Rionegro, cerca del aeropuerto José María Córdova.",
    description: [
      "Moderno desarrollo de bodegas y locales comerciales que se construye por etapas, con espacios adaptables a las necesidades de cada empresa, inversionista o emprendedor.",
      "Está en el kilómetro 2 de la vía Belén – Rionegro, frente a Nacional de Chocolates y a pocos minutos del aeropuerto y de la autopista Medellín – Bogotá, con alta proyección de valorización y rentabilidad.",
    ],
    keyStats: [
      { value: "Por etapas", label: "Desarrollo" },
      { value: "Km 2", label: "Vía Belén – Rionegro" },
      { value: "Bodegas y locales", label: "Tipo de inmueble" },
    ],
    specs: [
      { concepto: "Tipo", dato: "Bodegas y locales comerciales" },
      { concepto: "Desarrollo", dato: "Por etapas" },
      { concepto: "Ubicación", dato: "Km 2 vía Belén – Rionegro", nota: "Frente a Nacional de Chocolates" },
      { concepto: "Precio", dato: "Consultar" },
    ],
    includes: [
      "Infraestructura moderna",
      "Seguridad permanente",
      "Especificaciones técnicas de alto nivel",
      "Espacios adaptables a cada empresa",
      "Conexión con la autopista Medellín – Bogotá",
    ],
    distances: [],
    showOnMap: true,
    cover: "/images/central-de-empresas-y-negocios/1.jpg",
    images: [],
  },
  {
    id: 3,
    slug: "hacienda-flandes",
    name: "Hacienda Flandes",
    tag: "Lotes campestres",
    category: "lotes-campestres",
    region: "Oriente Antioqueño",
    municipality: "El Retiro",
    location: "Sector Pantanillo, El Retiro",
    areaLabel: "Consultar",
    areaMin: null,
    areaMax: null,
    priceCOP: null,
    summary:
      "Parcelación exclusiva en el sector Pantanillo de El Retiro, sobre la histórica Finca Flandes.",
    description: [
      "Hacienda Flandes es una parcelación exclusiva en el reconocido sector Pantanillo, en El Retiro, rodeada de montañas, bosques y paisajes naturales.",
      "Nace sobre la histórica Finca Flandes, que recibió las primeras ovejas de Nueva Zelanda en los años cincuenta. Hoy ofrece una comunidad campestre con acceso pavimentado, urbanismo moderno y amplias zonas comunes, a pocos minutos del casco urbano de El Retiro.",
    ],
    keyStats: [
      { value: "Pantanillo", label: "Sector" },
      { value: "El Retiro", label: "Municipio" },
      { value: "Consultar", label: "Áreas disponibles" },
    ],
    specs: [
      { concepto: "Tipo", dato: "Lotes campestres" },
      { concepto: "Ubicación", dato: "Sector Pantanillo, El Retiro" },
      { concepto: "Acceso", dato: "Completamente pavimentado" },
      { concepto: "Precio", dato: "Consultar" },
    ],
    includes: [
      "Urbanismo moderno",
      "Amplias zonas comunes",
      "Acceso pavimentado",
      "Entorno de montañas y bosque",
      "A minutos del casco urbano de El Retiro",
    ],
    distances: [],
    showOnMap: true,
    cover: "/images/hacienda-flandes/1.jpg",
    images: [],
  },
  {
    id: 4,
    slug: "horizontes-territorio-campestre",
    name: "Horizontes Territorio Campestre",
    tag: "Lotes campestres",
    category: "lotes-campestres",
    region: "Oriente Antioqueño",
    municipality: "El Retiro",
    location: "Vía El Retiro – La Ceja",
    areaLabel: "1.886 – 8.329 m²",
    areaMin: 1886,
    areaMax: 8329,
    priceCOP: null,
    summary:
      "Lotes campestres de 1.886 a 8.329 m² sobre la vía El Retiro – La Ceja, con respaldo de Londoño Gómez y Umbral Propiedad Raíz.",
    description: [
      "Parcelación sobre la vía El Retiro – La Ceja, uno de los corredores de mayor desarrollo del Oriente, con buena conexión hacia Medellín, Llanogrande, Rionegro y el aeropuerto.",
      "Ofrece lotes campestres desde 1.886 m² hasta 8.329 m², con zonas comunes pensadas para naturaleza, deporte, recreación y trabajo remoto. Está respaldado por Londoño Gómez y Umbral Propiedad Raíz.",
    ],
    keyStats: [
      { value: "1.886 m²", label: "Lote mínimo" },
      { value: "8.329 m²", label: "Lote máximo" },
      { value: "El Retiro – La Ceja", label: "Corredor" },
    ],
    specs: [
      { concepto: "Rango de áreas", dato: "1.886 – 8.329 m²" },
      { concepto: "Ubicación", dato: "Vía El Retiro – La Ceja" },
      { concepto: "Respaldo", dato: "Londoño Gómez · Umbral Propiedad Raíz" },
      { concepto: "Precio", dato: "Consultar" },
    ],
    includes: [
      "Urbanismo moderno",
      "Amplias zonas comunes",
      "Espacios para deporte y recreación",
      "Espacios para trabajo remoto",
      "Entorno de bosque y naturaleza",
    ],
    distances: [],
    showOnMap: true,
    cover: "/images/horizontes-territorio-campestre/1.jpg",
    images: [],
  },
  {
    id: 5,
    slug: "lote-28-la-montana",
    name: "Lote 28 · La Montaña",
    tag: "Lote campestre",
    category: "lotes-campestres",
    region: "Oriente Antioqueño",
    municipality: "El Retiro",
    location: "Parcelación La Montaña, El Retiro",
    areaLabel: "2.376 m²",
    areaMin: 2376.09,
    areaMax: 2376.09,
    priceCOP: null,
    summary:
      "Lote de 2.376,09 m² con terraza de 585,56 m² lista para construir y vista a las montañas del Oriente, en la parcelación La Montaña, El Retiro.",
    description: [
      "Lote de 2.376,09 m² con una terraza de 585,56 m² lista para construir y vista a las montañas del Oriente Antioqueño.",
      "Su topografía permite un proyecto arquitectónico de alto nivel, conservando amplias zonas verdes. Es una buena opción tanto para vivir como para invertir en una de las zonas de mayor crecimiento del Oriente.",
    ],
    keyStats: [
      { value: "2.376,09 m²", label: "Área total" },
      { value: "585,56 m²", label: "Terraza útil" },
      { value: "≈ 30 min", label: "Aeropuerto JMC" },
    ],
    specs: [
      { concepto: "Área total", dato: "2.376,09 m²" },
      { concepto: "Terraza útil", dato: "585,56 m²", nota: "Plataforma lista para construir" },
      { concepto: "Proporción de terraza", dato: "24,6 %", nota: "El resto queda en zonas verdes y bosque" },
      { concepto: "Topografía", dato: "Curvas de nivel definidas", nota: "Ideal para vivienda unifamiliar" },
      { concepto: "Precio", dato: "Consultar" },
    ],
    includes: [
      "Plataforma lista para construcción",
      "Curvas de nivel definidas",
      "Vista panorámica",
      "Excelente iluminación natural",
      "Rodeado de bosque",
      "Ideal para vivienda unifamiliar",
    ],
    distances: [
      { lugar: "Aeropuerto JMC", tiempo: "30 min", verified: true },
      // Pendientes de confirmar con Toto (venían en el mockup, no en el sitio):
      { lugar: "Parque principal de El Retiro", tiempo: "10 min", verified: false },
      { lugar: "Llanogrande", tiempo: "20 min", verified: false },
      { lugar: "La Ceja", tiempo: "20 min", verified: false },
      { lugar: "Medellín (El Poblado)", tiempo: "45 min", verified: false },
      { lugar: "Colegios y centros médicos", tiempo: "15 min", verified: false },
    ],
    showOnMap: true,
    cover: "/images/lote-28-la-montana/1.jpg",
    images: [],
  },
  {
    id: 6,
    slug: "la-trinidad",
    name: "La Trinidad",
    tag: "Lotes campestres",
    category: "lotes-campestres",
    region: "Eje Cafetero",
    municipality: "Pereira",
    location: "Cerritos, Pereira",
    areaLabel: "Más de 1 ha",
    areaMin: 10000,
    areaMax: null,
    priceCOP: null,
    summary:
      "Unidad cerrada de 57 lotes urbanizados de más de 10.000 m² en Cerritos, Pereira, con vista a los valles de los ríos Cauca y Risaralda.",
    description: [
      "Unidad cerrada de solo 57 lotes urbanizados en Cerritos, la zona de mayor valorización de Pereira, con lotes de más de 10.000 m² para residencias de lujo con piscina, jardines y espacios recreativos.",
      "Se desarrolla sobre una histórica hacienda de más de 100 cuadras, con bosques, lagos y senderos, vista a los valles de los ríos Cauca y Risaralda, redes subterráneas, seguridad permanente y vías pavimentadas.",
    ],
    keyStats: [
      { value: "+10.000 m²", label: "Área por lote" },
      { value: "57", label: "Lotes urbanizados" },
      { value: "+100 cuadras", label: "Hacienda" },
    ],
    specs: [
      { concepto: "Área por lote", dato: "Más de 10.000 m²" },
      { concepto: "Lotes en el proyecto", dato: "57", nota: "Unidad cerrada" },
      { concepto: "Ubicación", dato: "Cerritos, Pereira" },
      { concepto: "Precio", dato: "Consultar" },
    ],
    includes: [
      "Lotes completamente urbanizados",
      "Redes subterráneas",
      "Seguridad permanente",
      "Vías pavimentadas",
      "Lagos, bosques y senderos naturales",
      "Vista a los valles de los ríos Cauca y Risaralda",
    ],
    distances: [],
    showOnMap: false, // queda fuera del mapa esquemático del Oriente
    cover: "/images/la-trinidad/1.jpg",
    images: [],
  },
  {
    id: 7,
    slug: "llanogrande-hills",
    name: "Llanogrande Hills",
    tag: "Lotes premium",
    category: "lotes-campestres",
    region: "Oriente Antioqueño",
    municipality: "Rionegro",
    location: "Llanogrande, Rionegro",
    areaLabel: "Desde 2.178 m²",
    areaMin: 2177.7,
    areaMax: null,
    priceCOP: null,
    summary:
      "Parcelación de 95 lotes urbanizados desde 2.177,70 m² en Llanogrande, con más de 3.500 árboles sembrados y vista al Valle de San Nicolás.",
    description: [
      "Exclusiva parcelación de 95 lotes urbanizados en Llanogrande, rodeada de bosques nativos, aire puro y vistas al Valle de San Nicolás.",
      "Los lotes parten de 2.177,70 m². El proyecto conserva el paisaje con más de 3.500 árboles sembrados, reservas naturales y senderos ecológicos, a pocos minutos del aeropuerto, de Medellín, centros comerciales, clínicas y colegios.",
    ],
    keyStats: [
      { value: "2.177,70 m²", label: "Lote mínimo" },
      { value: "95", label: "Lotes urbanizados" },
      { value: "+3.500", label: "Árboles sembrados" },
    ],
    specs: [
      { concepto: "Área desde", dato: "2.177,70 m²" },
      { concepto: "Lotes en el proyecto", dato: "95", nota: "Completamente urbanizados" },
      { concepto: "Ubicación", dato: "Llanogrande, Rionegro" },
      { concepto: "Precio", dato: "Consultar" },
    ],
    includes: [
      "Bosques nativos y reservas naturales",
      "Senderos ecológicos",
      "Más de 3.500 árboles sembrados",
      "Vistas al Valle de San Nicolás",
      "Entorno seguro y natural",
    ],
    distances: [],
    showOnMap: true,
    cover: "/images/llanogrande-hills/1.jpg",
    images: [],
  },
  {
    id: 8,
    slug: "apartamento-envigado-mayorca",
    name: "Apartamento cerca de Mayorca",
    tag: "Apartamento",
    category: "apartamentos",
    region: "Valle de Aburrá",
    municipality: "Envigado",
    location: "Envigado, cerca al C.C. Mayorca",
    areaLabel: "84 m²",
    areaMin: 84,
    areaMax: 84,
    priceCOP: null,
    summary:
      "Apartamento de 84 m² con 3 habitaciones, parqueadero privado y cuarto útil en Envigado, cerca del C.C. Mayorca y del Metro.",
    description: [
      "Apartamento de 84 m² en una de las zonas más valorizadas de Envigado, con tres habitaciones: la principal con baño privado y vestier, y las auxiliares con clóset y baño social compartido.",
      "Cocina integral de concepto abierto con barra americana, balcón con vista panorámica, parqueadero privado y cuarto útil. Está cerca del Centro Comercial Mayorca, estaciones del Metro, colegios, clínicas y supermercados.",
    ],
    keyStats: [
      { value: "84 m²", label: "Área" },
      { value: "3", label: "Habitaciones" },
      { value: "1", label: "Parqueadero + cuarto útil" },
    ],
    specs: [
      { concepto: "Área", dato: "84 m²" },
      { concepto: "Habitaciones", dato: "3", nota: "Principal con baño privado y vestier" },
      { concepto: "Cocina", dato: "Integral, abierta", nota: "Con barra americana" },
      { concepto: "Parqueadero", dato: "Privado" },
      { concepto: "Cuarto útil", dato: "Incluido" },
      { concepto: "Precio", dato: "Consultar" },
    ],
    includes: [
      "Balcón con vista panorámica",
      "Cocina integral abierta",
      "Parqueadero privado",
      "Cuarto útil",
      "Zonas comunes para descanso, deporte y recreación",
      "Cerca al Metro y al C.C. Mayorca",
    ],
    distances: [],
    showOnMap: true,
    cover: "/images/apartamento-envigado-mayorca/1.jpg",
    images: [],
  },
  {
    id: 9,
    slug: "terreno-34-cuadras",
    name: "Terreno de 34 cuadras",
    tag: "Gran terreno",
    category: "grandes-terrenos",
    region: "Oriente Antioqueño",
    municipality: "La Ceja",
    location: "Entre La Ceja, El Carmen de Viboral y Rionegro",
    areaLabel: "≈ 21,8 ha",
    areaMin: 218000,
    areaMax: 218000,
    priceCOP: null,
    summary:
      "Terreno de aproximadamente 34 cuadras (≈ 21,8 ha) a 2.100 msnm entre La Ceja, El Carmen de Viboral y Rionegro.",
    description: [
      "Terreno de aproximadamente 34 cuadras, entre La Ceja, El Carmen de Viboral y Rionegro, a 2.100 metros sobre el nivel del mar, con clima privilegiado y amplios paisajes naturales.",
      "Por su extensión, topografía y ubicación es ideal para un campo de golf, una parcelación campestre de lujo, un condominio residencial o un proyecto turístico, con fácil acceso a Llanogrande, el aeropuerto y Medellín.",
    ],
    keyStats: [
      { value: "34 cuadras", label: "Extensión" },
      { value: "≈ 21,8 ha", label: "Equivalente" },
      { value: "2.100 msnm", label: "Altura" },
    ],
    specs: [
      { concepto: "Extensión", dato: "≈ 34 cuadras", nota: "≈ 21,8 ha" },
      { concepto: "Altura", dato: "2.100 msnm" },
      { concepto: "Ubicación", dato: "Entre La Ceja, El Carmen de Viboral y Rionegro" },
      { concepto: "Vocación", dato: "Golf, parcelación, condominio o turismo" },
      { concepto: "Precio", dato: "Consultar" },
    ],
    includes: [
      "Ideal para campo de golf",
      "Ideal para parcelación campestre de lujo",
      "Ideal para condominio residencial",
      "Potencial turístico",
      "Conexión con Llanogrande, el aeropuerto y Medellín",
    ],
    distances: [],
    showOnMap: true,
    cover: "/images/terreno-34-cuadras/1.jpg",
    images: [],
  },
  {
    id: 10,
    slug: "montemadero",
    name: "Montemadero",
    tag: "Lotes campestres",
    category: "lotes-campestres",
    region: "Oriente Antioqueño",
    municipality: "La Ceja",
    location: "El Yarumo, vía San Antonio de Pereira – La Ceja",
    areaLabel: "Desde 2.500 m²",
    areaMin: 2500,
    areaMax: null,
    priceCOP: null,
    summary:
      "Parcelación de lotes urbanizados desde 2.500 m² en El Yarumo, vía San Antonio de Pereira – La Ceja, con vista panorámica.",
    description: [
      "Parcelación de lotes urbanizados en el sector El Yarumo, sobre la vía San Antonio de Pereira – La Ceja, un corredor de buen desarrollo residencial y conectividad.",
      "Los lotes parten de 2.500 m² y tienen vista panorámica. Cuenta con vías internas pavimentadas, redes eléctricas subterráneas y servicios públicos, muy cerca de San Antonio de Pereira, Llanogrande, Rionegro, La Ceja y el aeropuerto.",
    ],
    keyStats: [
      { value: "2.500 m²", label: "Lote mínimo" },
      { value: "El Yarumo", label: "Sector" },
      { value: "La Ceja", label: "Municipio" },
    ],
    specs: [
      { concepto: "Área desde", dato: "2.500 m²" },
      { concepto: "Ubicación", dato: "El Yarumo, vía San Antonio de Pereira – La Ceja" },
      { concepto: "Estado", dato: "Lotes urbanizados" },
      { concepto: "Precio", dato: "Consultar" },
    ],
    includes: [
      "Vías internas pavimentadas",
      "Redes eléctricas subterráneas",
      "Servicios públicos",
      "Vista panorámica desde todo el proyecto",
      "Cerca de San Antonio de Pereira, Llanogrande y Rionegro",
    ],
    distances: [],
    showOnMap: true,
    cover: "/images/montemadero/1.jpg",
    images: [],
  },
  {
    id: 11,
    slug: "reservas-de-juanito-laguna",
    name: "Reservas de Juanito Laguna",
    tag: "Lotes campestres",
    category: "lotes-campestres",
    region: "Oriente Antioqueño",
    municipality: "El Retiro",
    location: "El Retiro",
    areaLabel: "Desde 5.526 m²",
    areaMin: 5526,
    areaMax: null,
    priceCOP: null,
    summary:
      "Parcelación de lotes urbanizados desde 5.526 m² en El Retiro, rodeada de bosque nativo.",
    description: [
      "Parcelación de lotes urbanizados en El Retiro, entre bosques nativos, aire puro y paisajes naturales, con buena conexión hacia Medellín, Llanogrande y Rionegro.",
      "Los lotes parten de 5.526 m², ideales para una residencia campestre de lujo con amplios jardines y terrazas, y privacidad en contacto con la naturaleza.",
    ],
    keyStats: [
      { value: "5.526 m²", label: "Lote mínimo" },
      { value: "El Retiro", label: "Municipio" },
      { value: "Urbanizados", label: "Estado" },
    ],
    specs: [
      { concepto: "Área desde", dato: "5.526 m²" },
      { concepto: "Ubicación", dato: "El Retiro, Antioquia" },
      { concepto: "Estado", dato: "Lotes urbanizados" },
      { concepto: "Precio", dato: "Consultar" },
    ],
    includes: [
      "Rodeado de bosque nativo",
      "Privacidad y tranquilidad",
      "Espacio para jardines y terrazas",
      "Conexión con Medellín, Llanogrande y Rionegro",
    ],
    distances: [],
    showOnMap: true,
    cover: "/images/reservas-de-juanito-laguna/1.jpg",
    images: [],
  },
  {
    id: 12,
    slug: "riveras-del-tambo",
    name: "Riveras del Tambo",
    tag: "Apartamentos",
    category: "apartamentos",
    region: "Oriente Antioqueño",
    municipality: "La Ceja",
    location: "La Ceja",
    areaLabel: "61 – 74 m²",
    areaMin: 61.47,
    areaMax: 74.07,
    priceCOP: null,
    summary:
      "Unidad residencial de 174 apartamentos en 5 torres, de 61,47 a 74,07 m², en La Ceja.",
    description: [
      "Moderna unidad residencial en La Ceja: 174 apartamentos distribuidos en 5 torres de 5 niveles, construidos con sistema tradicional y acabados de alta calidad.",
      "Los apartamentos van de 61,47 a 74,07 m² y aprovechan la luz natural. Cada torre tiene ascensor, parqueaderos cubiertos para propietarios, parqueaderos para visitantes y opción de cuarto útil. Está cerca del parque principal, el C.C. Viva La Ceja y las vías hacia Rionegro, San Antonio de Pereira y Medellín.",
    ],
    keyStats: [
      { value: "61,47 – 74,07 m²", label: "Áreas" },
      { value: "174", label: "Apartamentos" },
      { value: "5 torres", label: "De 5 niveles" },
    ],
    specs: [
      { concepto: "Áreas", dato: "61,47 – 74,07 m²" },
      { concepto: "Apartamentos", dato: "174", nota: "5 torres de 5 niveles" },
      { concepto: "Ascensor", dato: "En cada torre" },
      { concepto: "Parqueaderos", dato: "Cubiertos y de visitantes", nota: "Cuarto útil opcional" },
      { concepto: "Precio", dato: "Consultar" },
    ],
    includes: [
      "Ascensor en cada torre",
      "Parqueaderos cubiertos para propietarios",
      "Parqueaderos para visitantes",
      "Opción de cuarto útil",
      "Zonas comunes para bienestar y recreación",
      "Espacios para trabajo remoto",
    ],
    distances: [],
    showOnMap: true,
    cover: "/images/riveras-del-tambo/1.jpg",
    images: [],
  },
  {
    id: 13,
    slug: "serranias-de-fizebad",
    name: "Serranías de Fizebad",
    tag: "Lote exclusivo",
    category: "lotes-campestres",
    region: "Oriente Antioqueño",
    municipality: "El Retiro",
    location: "Parcelación Serranías de Fizebad, El Retiro",
    areaLabel: "2.296 m²",
    areaMin: 2296,
    areaMax: 2296,
    priceCOP: null,
    summary:
      "Lote de 2.296 m² en la parcelación Serranías de Fizebad, El Retiro, rodeado de zonas verdes y bosque nativo.",
    description: [
      "Lote de 2.296 m² en la prestigiosa parcelación Serranías de Fizebad, en El Retiro, con amplias zonas verdes, bosque nativo y paisajes característicos de la zona.",
      "Su topografía favorece un proyecto arquitectónico moderno que aproveche las vistas y la privacidad, con la tranquilidad del campo y cercanía a Medellín, Llanogrande y Rionegro.",
    ],
    keyStats: [
      { value: "2.296 m²", label: "Área" },
      { value: "El Retiro", label: "Municipio" },
      { value: "Fizebad", label: "Parcelación" },
    ],
    specs: [
      { concepto: "Área", dato: "2.296 m²" },
      { concepto: "Parcelación", dato: "Serranías de Fizebad" },
      { concepto: "Ubicación", dato: "El Retiro, Antioquia" },
      { concepto: "Precio", dato: "Consultar" },
    ],
    includes: [
      "Amplias zonas verdes",
      "Bosque nativo",
      "Topografía favorable para construir",
      "Vistas naturales y privacidad",
    ],
    distances: [],
    showOnMap: true,
    cover: "/images/serranias-de-fizebad/1.jpg",
    images: [],
  },
  {
    id: 14,
    slug: "la-campina",
    name: "La Campiña",
    tag: "Lotes campestres",
    category: "lotes-campestres",
    region: "Oriente Antioqueño",
    municipality: "La Ceja",
    location: "Km 6 vía San Antonio de Pereira – La Ceja (Quirama)",
    areaLabel: "1.500 – 3.900 m²",
    areaMin: 1500,
    areaMax: 3900,
    priceCOP: null,
    summary:
      "Parcelación de 88 lotes urbanizados de 1.500 a 3.900 m² en el km 6 de la vía San Antonio de Pereira – La Ceja (Quirama).",
    description: [
      "Parcelación en el kilómetro 6 de la vía San Antonio de Pereira – La Ceja (Quirama), uno de los corredores de mayor crecimiento del Oriente, con 88 lotes urbanizados de 1.500 a 3.900 m².",
      "Cuenta con vías pavimentadas, redes de servicios subterráneas, alcantarillado con planta de tratamiento de aguas residuales y portería con vigilancia, a pocos minutos de La Ceja, Rionegro y San Antonio de Pereira.",
    ],
    keyStats: [
      { value: "1.500 – 3.900 m²", label: "Áreas" },
      { value: "88", label: "Lotes urbanizados" },
      { value: "Km 6", label: "Vía San Antonio – La Ceja" },
    ],
    specs: [
      { concepto: "Áreas", dato: "1.500 – 3.900 m²" },
      { concepto: "Lotes en el proyecto", dato: "88", nota: "Urbanizados" },
      { concepto: "Ubicación", dato: "Km 6 vía San Antonio de Pereira – La Ceja (Quirama)" },
      { concepto: "Precio", dato: "Consultar" },
    ],
    includes: [
      "Vías pavimentadas",
      "Redes de servicios subterráneas",
      "Alcantarillado con planta de tratamiento",
      "Portería con vigilancia",
      "Fácil acceso a Medellín y Llanogrande",
    ],
    distances: [],
    showOnMap: true,
    cover: "/images/la-campina/1.jpg",
    images: [],
  },

  // ───────────── Propiedades con precio (vienen de las fichas PDF de Toto Partner) ─────────────

  {
    id: 15,
    slug: "lote-27-reservas-de-avinon",
    name: "Lote 27 · Reservas de Aviñón",
    tag: "Lote campestre",
    category: "lotes-campestres",
    region: "Oriente Antioqueño",
    municipality: "Rionegro",
    location: "Parcelación Reservas de Aviñón, Llanogrande, Rionegro",
    areaLabel: "2.763,7 m²",
    areaMin: 2763.7,
    areaMax: 2763.7,
    priceCOP: 1290000000,
    priceNote: "Administración $1.100.000/mes · Predial $8.000.000/año",
    summary:
      "Lote de 2.763,7 m², estrato 6, en la parcelación Reservas de Aviñón, Llanogrande, Rionegro.",
    description: [
      "Lote de 2.763,7 m² en la parcelación Reservas de Aviñón, en el sector de Llanogrande, Rionegro, estrato 6.",
      "Administración de $1.100.000 mensuales y predial de $8.000.000 anuales. Precio de venta: $1.290.000.000.",
    ],
    keyStats: [
      { value: "2.763,7 m²", label: "Área total" },
      { value: "Estrato 6", label: "Estrato" },
      { value: "Llanogrande", label: "Sector" },
    ],
    specs: [
      { concepto: "Área total", dato: "2.763,7 m²" },
      { concepto: "Estrato", dato: "6" },
      { concepto: "Administración", dato: "$1.100.000 / mes" },
      { concepto: "Predial", dato: "$8.000.000 / año" },
      { concepto: "Precio de venta", dato: "$1.290.000.000" },
    ],
    includes: ["Parcelación en Llanogrande", "Estrato 6"],
    distances: [],
    showOnMap: true,
    pdfUrl: "", // pegar aquí el enlace de la ficha PDF cuando esté subida
    cover: "/images/lote-27-reservas-de-avinon/1.jpg",
    images: [],
  },
  {
    id: 16,
    slug: "casa-finca-ojo-de-agua",
    name: "Casa finca · Vereda Ojo de Agua",
    tag: "Casa finca",
    category: "casas-fincas",
    region: "Oriente Antioqueño",
    municipality: "Oriente Antioqueño", // POR CONFIRMAR: ¿Rionegro o El Carmen de Viboral?
    location: "Vereda Ojo de Agua, Oriente Antioqueño",
    areaLabel: "Lote 2.300 m² · 270 m² construidos",
    areaMin: 2300,
    areaMax: 2300,
    priceCOP: 1730000000,
    summary:
      "Casa finca independiente de 270 m² construidos en lote de 2.300 m², con planta solar y doble acueducto, en la vereda Ojo de Agua.",
    description: [
      "Casa finca independiente de 270 m² construidos en un lote de 2.300 m², con excelente vista y entorno natural, en la vereda Ojo de Agua.",
      "Tiene 3 alcobas y estudio, 3 baños, zona social abierta con sala, comedor y cocina integrados, sala de TV, zona de ropas y cuarto útil. Cuenta con planta solar conectada a la red, doble acueducto (Rionegro y Carmen), portada eléctrica y parqueadero cubierto para 3 carros.",
    ],
    keyStats: [
      { value: "2.300 m²", label: "Lote" },
      { value: "270 m²", label: "Construidos" },
      { value: "3 + estudio", label: "Alcobas" },
    ],
    specs: [
      { concepto: "Tipo", dato: "Casa finca independiente" },
      { concepto: "Área del lote", dato: "2.300 m²" },
      { concepto: "Área construida", dato: "270 m²" },
      { concepto: "Alcobas", dato: "3 + estudio" },
      { concepto: "Baños", dato: "3", nota: "2 completos y 1 social" },
      { concepto: "Energía", dato: "Planta solar conectada a la red" },
      { concepto: "Acueducto", dato: "Doble: Rionegro y Carmen" },
      { concepto: "Parqueadero", dato: "Cubierto para 3 carros" },
      { concepto: "Precio de venta", dato: "$1.730.000.000" },
    ],
    includes: [
      "Planta solar",
      "Doble acueducto",
      "Portada eléctrica",
      "Excelente vista",
      "Zona social abierta",
      "Sala de TV y zona de ropas",
    ],
    distances: [],
    showOnMap: true,
    pdfUrl: "",
    cover: "/images/casa-finca-ojo-de-agua/1.jpg",
    images: [],
  },
  {
    id: 17,
    slug: "apartamento-rosales-bogota",
    name: "Apartamento en Rosales",
    tag: "Apartamento",
    category: "apartamentos",
    region: "Bogotá",
    municipality: "Bogotá",
    location: "Rosales, abajo de la Circunvalar, Bogotá",
    areaLabel: "475 m²",
    areaMin: 475,
    areaMax: 475,
    priceCOP: 6200000000,
    priceNote: "Administración $2.500.000/mes",
    summary:
      "Apartamento remodelado de 475 m² en el piso 11, Rosales (Bogotá), con 4 habitaciones, 2 estudios, 5 terrazas y 7 parqueaderos.",
    description: [
      "Apartamento remodelado de 475 m² en el piso 11 de un edificio clásico en perfectas condiciones, en Rosales, abajo de la Circunvalar, con vista a la ciudad.",
      "Tiene 4 habitaciones con baño y vestier, 2 estudios, 5 terrazas, cocina abierta, zona de lavandería independiente, cuarto y baño de servicio, y 7 parqueaderos. El edificio ofrece vigilancia 24/7, 2 ascensores privados, gimnasio, zonas verdes, cancha de squash y salón social.",
    ],
    keyStats: [
      { value: "475 m²", label: "Área" },
      { value: "4 + 2 estudios", label: "Habitaciones" },
      { value: "7", label: "Parqueaderos" },
    ],
    specs: [
      { concepto: "Área", dato: "475 m²" },
      { concepto: "Piso", dato: "11" },
      { concepto: "Habitaciones", dato: "4", nota: "Cada una con baño y vestier" },
      { concepto: "Estudios", dato: "2" },
      { concepto: "Terrazas", dato: "5" },
      { concepto: "Parqueaderos", dato: "7" },
      { concepto: "Administración", dato: "$2.500.000 / mes" },
      { concepto: "Precio de venta", dato: "$6.200.000.000" },
    ],
    includes: [
      "Apartamento remodelado con vista a la ciudad",
      "Cocina abierta",
      "Zona de lavandería independiente",
      "Cuarto y baño de servicio",
      "Vigilancia 24/7",
      "2 ascensores privados",
      "Gimnasio y cancha de squash",
      "Salón social y zonas verdes",
    ],
    distances: [],
    showOnMap: false, // Bogotá no entra en el mapa del Oriente
    pdfUrl: "",
    cover: "/images/apartamento-rosales-bogota/1.jpg",
    images: [],
  },
];

// ───────────── Helpers ─────────────

export const categoryLabels: Record<Category, string> = {
  "lotes-campestres": "Lotes campestres",
  apartamentos: "Apartamentos",
  "bodegas-locales": "Bodegas y locales",
  "grandes-terrenos": "Grandes terrenos",
  "casas-fincas": "Casas y fincas",
};

export const formatCOP = (n: number) =>
  "$" + n.toLocaleString("es-CO", { maximumFractionDigits: 0 });

export const priceDisplay = (p: Property) =>
  p.priceCOP ? formatCOP(p.priceCOP) : "Consultar";

export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const propertyMessage = (p: Property) =>
  `Hola Toto, me interesa "${p.name}" (${p.municipality}). ¿Me puede dar más información?`;

export const municipalities = () =>
  Array.from(new Set(properties.map((p) => p.municipality)));
