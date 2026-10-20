import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { CATEGORY_LABELS, properties, type Property, type PropertyCategory } from "@/data/properties";
import { useFilters } from "@/lib/filters";
import { Reveal, SectionHead } from "./Reveal";

export function PropertyCard({ p }: { p: Property }) {
  return (
    <Link to="/propiedad/$slug" params={{ slug: p.slug }} className="group flex flex-col border bg-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={p.image} alt={p.name} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
        <span className="absolute left-3 top-3 bg-card px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]">{p.tag}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{p.location}</p>
        <h3 className="mt-2 flex-1 text-2xl">{p.name}</h3>
        <div className="mt-4 flex items-center justify-between border-t pt-4 text-sm">
          <span className="font-mono text-xs">{p.areaLabel}</span>
          <span className="font-semibold text-gold">Ver ficha <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span></span>
        </div>
      </div>
    </Link>
  );
}

export function PropertyFilters() {
  const { filters, setFilters, results } = useFilters();
  const opts: [PropertyCategory | "all", string][] = [["all", "Todas"], ...(Object.entries(CATEGORY_LABELS) as [PropertyCategory, string][])];
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap gap-2">
        {opts.map(([k, l]) => {
          const active = filters.category === k;
          return (
            <button key={k} onClick={() => setFilters({ category: k })} aria-pressed={active}
              className={`rounded-full border px-4 py-2 text-sm transition-colors duration-200 ${active ? "border-ink bg-ink text-ink-foreground" : "bg-card hover:border-foreground"}`}>
              {l}
            </button>
          );
        })}
        {(filters.municipio !== "all" || filters.minArea > 0) && (
          <button onClick={() => setFilters({ municipio: "all", minArea: 0 })} className="px-2 text-sm text-gold underline">
            Quitar filtros{filters.municipio !== "all" ? ` (${filters.municipio})` : ""}
          </button>
        )}
      </div>
      <span className="font-mono text-sm text-muted-foreground" aria-live="polite">{results.length} de {properties.length}</span>
    </div>
  );
}

export function Portfolio() {
  const { results } = useFilters();
  return (
    <section id="propiedades" className="py-24">
      <div className="container-site">
        <Reveal>
          <SectionHead eyebrow="Portafolio" title="Propiedades seleccionadas" aside="Cada propiedad tiene su propia página, con fotos, datos técnicos y un botón que le escribe a Toto con el nombre del lote ya incluido." />
        </Reveal>
        <PropertyFilters />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => <PropertyCard key={p.id} p={p} />)}
        </div>
        {results.length === 0 && <p className="py-16 text-center text-muted-foreground">No hay propiedades con esos filtros.</p>}
      </div>
    </section>
  );
}
