import { properties } from "@/data/properties";
type Municipio = string;
import { images } from "@/data/images";
import { scrollTo, useFilters } from "@/lib/filters";
import { Reveal, SectionHead } from "./Reveal";

const ZONES: [Municipio, string][] = [
  ["El Retiro", "Bosque, clima frío y parcelaciones de baja densidad."],
  ["Rionegro", "Llanogrande, el aeropuerto y el eje empresarial del Oriente."],
  ["La Ceja", "Corredor de San Antonio de Pereira y Quirama, con gran crecimiento."],
  ["Envigado", "La ciudad cerca: Vía La Acuarela y la zona de Mayorca."],
  ["Pereira", "Cerritos, la zona campestre más valorizada del Eje Cafetero."],
];

export function ZoneGrid() {
  const { setFilters } = useFilters();
  const go = (m: Municipio | "all") => { setFilters({ municipio: m, category: "all", minArea: 0 }); scrollTo("propiedades"); };
  const count = (m: Municipio) => properties.filter((p) => p.municipality === m).length;
  return (
    <section id="zonas" className="py-24">
      <div className="container-site">
        <Reveal><SectionHead eyebrow="Guías por zona" title="¿Dónde conviene comprar?" aside="Cada zona tiene una guía con distancias, colegios, valorización y los proyectos disponibles." /></Reveal>
        <div className="grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {ZONES.map(([m, d]) => (
            <button key={m} onClick={() => go(m)} className="group bg-card p-8 text-left transition-colors duration-200 hover:bg-background">
              <span className="font-mono text-xs text-gold">{count(m)} {count(m) === 1 ? "propiedad" : "propiedades"}</span>
              <h3 className="mt-3 text-3xl">{m}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{d}</p>
              <span className="mt-6 inline-block text-sm text-gold transition-transform duration-200 group-hover:translate-x-1">Ver propiedades →</span>
            </button>
          ))}
          <button onClick={() => go("all")} className="group bg-primary p-8 text-left text-primary-foreground">
            <span className="font-mono text-xs text-gold-light">{properties.length} en total</span>
            <h3 className="mt-3 text-3xl">Todo el portafolio</h3>
            <p className="mt-3 text-sm text-primary-foreground/75">Lotes, apartamentos, bodegas y grandes terrenos.</p>
            <span className="mt-6 inline-block text-sm text-gold-light transition-transform duration-200 group-hover:translate-x-1">Ver todo →</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export function BackingSection() {
  const stats = [["1993", "fundada en Rionegro"], ["+30", "años de trayectoria"], ["600", "empleos directos"], ["900", "empleos indirectos"]];
  return (
    <section className="bg-primary py-24 text-primary-foreground">
      <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="eyebrow mb-3 text-gold-light">Respaldo</p>
          <h2 className="text-4xl md:text-5xl">Trabajo de la mano con Constructora Serving S.A.S.</h2>
          <p className="mt-6 max-w-lg text-primary-foreground/80">Una constructora nacida en Rionegro en 1993, con proyectos residenciales, comerciales, industriales y de parcelación en Rionegro, La Ceja, El Retiro, Envigado y Pereira.</p>
        </Reveal>
        <div className="grid grid-cols-2 gap-px bg-primary-foreground/20">
          {stats.map(([n, l]) => (
            <div key={l} className="bg-primary p-8">
              <div className="font-display text-5xl md:text-6xl">{n}</div>
              <div className="mt-2 text-sm text-gold-light">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutToto() {
  const pillars = [
    ["Leer el green", "Estudio la zona, las vías y la valorización antes de recomendar."],
    ["Elegir el palo", "Le muestro la propiedad que encaja con su objetivo, no la que más comisión deja."],
    ["Jugar limpio", "Información completa y transparente en cada paso de la compra."],
  ];
  return (
    <section id="sobre-toto" className="py-24">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <Reveal className="relative overflow-hidden">
          <img src={images.toto} alt="Juan Carlos “Toto” Echeverry en un campo de golf" loading="lazy" width={896} height={1200} className="aspect-[3/4] w-full object-cover" />
          <div className="absolute inset-0 bg-photo-fade" />
          <div className="absolute bottom-0 p-6 text-ink-foreground">
            <p className="font-display text-3xl">Juan Carlos Echeverry</p>
            <p className="text-sm text-ink-foreground/80">Golfista profesional · Director de golf · Asesor inmobiliario</p>
          </div>
        </Reveal>
        <Reveal>
          <p className="eyebrow mb-3">Sobre Toto</p>
          <h2 className="text-4xl md:text-5xl">Del tee de salida a la firma de la escritura</h2>
          <p className="mt-6 text-muted-foreground">Mi carrera en el golf me enseñó que los grandes resultados llegan con preparación, paciencia y honestidad. Esa misma forma de trabajar es la que aplico hoy en el negocio inmobiliario.</p>
          <p className="mt-4 text-muted-foreground">Acompaño a familias e inversionistas a encontrar dónde vivir, invertir o desarrollar su patrimonio en el Oriente Antioqueño. No le vendo una propiedad: le ayudo a tomar la decisión correcta a largo plazo.</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {pillars.map(([t, d]) => (
              <div key={t} className="border-t-2 border-gold pt-4">
                <h3 className="text-xl">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ProcessSteps() {
  const steps = [
    ["Asesoría", "Definimos objetivo, presupuesto y zona: vivir, invertir o desarrollar."],
    ["Visita", "Recorremos los lotes que encajan, con planos y topografía en mano."],
    ["Estudio de títulos", "Revisamos el certificado de libertad, el uso del suelo y la normativa del municipio."],
    ["Promesa", "Firmamos la promesa de compraventa con fechas y forma de pago claras."],
    ["Escritura", "Escritura en notaría y registro en la Oficina de Instrumentos Públicos."],
  ];
  return (
    <section className="border-t bg-card py-24">
      <div className="container-site">
        <Reveal><SectionHead eyebrow="Cómo compramos juntos" title="Su compra, paso a paso" /></Reveal>
        <ol className="grid gap-8 md:grid-cols-5">
          {steps.map(([t, d], i) => (
            <li key={t} className="border-t border-foreground pt-4">
              <span className="font-mono text-sm text-gold">0{i + 1}</span>
              <h3 className="mt-2 text-xl">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink py-16 text-ink-foreground">
      <div className="container-site grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">Toto Partner Inmobiliario</p>
          <p className="mt-3 text-sm text-ink-foreground/70">Juan Carlos Echeverry · Asesor inmobiliario<br />Oriente Antioqueño, Colombia</p>
        </div>
        <div>
          <p className="eyebrow text-gold-mid">WhatsApp y llamadas</p>
          <a href="tel:+573004517485" className="mt-3 block font-mono text-lg text-gold-light">300 451 7485</a>
          <a href="https://instagram.com/totopartnerinmobiliario" target="_blank" rel="noreferrer" className="mt-2 block text-sm text-ink-foreground/70 hover:text-ink-foreground">Instagram: @totopartnerinmobiliario</a>
        </div>
        <div>
          <p className="eyebrow text-gold-mid">Respaldo</p>
          <p className="mt-3 text-sm text-ink-foreground/70">Constructora Serving S.A.S.<br />Rionegro, desde 1993</p>
        </div>
      </div>
    </footer>
  );
}
