import { useLanguage } from "@/lib/language";
import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { categoryLabels, priceDisplay, properties, type Category, type Property } from "@/data/properties";
import { coverFor, placeholderFor } from "@/data/images";
import { useFilters } from "@/lib/filters";
import { Reveal, SectionHead } from "./Reveal";
import { SmartImage } from "./SmartImage";

export function PropertyCard({ p }: { p: Property }) {
  const { t, language } = useLanguage();
  return (
    <Link to="/propiedad/$slug" params={{ slug: p.slug }} className="group flex flex-col border bg-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        <SmartImage src={coverFor(p)} fallback={placeholderFor(p)} alt={t(p.name)} width={1024} height={768} wrapperClassName="h-full w-full" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
        <span className="absolute left-3 top-3 bg-card px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]">{t(p.tag)}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3 shrink-0" />{t(p.location)}</p>
        <h3 className="mt-2 flex-1 text-2xl">{t(p.name)}</h3>
        <p className="mt-2 font-display text-lg text-primary">{language === "en" && p.priceCOP ? `COP ${p.priceCOP.toLocaleString("en-US")}` : t(priceDisplay(p))}</p>
        <div className="mt-4 flex items-center justify-between border-t pt-4 text-sm">
          <span className="font-mono text-xs">{t(p.areaLabel)}</span>
          <span className="font-semibold text-gold">{t("Ver ficha")} <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span></span>
        </div>
      </div>
    </Link>
  );
}

export function PropertyFilters() {
  const { t, language } = useLanguage();
  const { filters, setFilters, results } = useFilters();
  const opts: [Category | "all", string][] = [["all", "Todas"], ...(Object.entries(categoryLabels) as [Category, string][])];
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap gap-2">
        {opts.map(([k, l]) => {
          const active = filters.category === k;
          return (
            <button key={k} onClick={() => setFilters({ category: k })} aria-pressed={active}
              className={`rounded-full border px-4 py-2 text-sm transition-colors duration-200 ${active ? "border-ink bg-ink text-ink-foreground" : "bg-card hover:border-foreground"}`}>
              {t(l)}
            </button>
          );
        })}
        {(filters.municipio !== "all" || filters.minArea > 0) && (
          <button onClick={() => setFilters({ municipio: "all", minArea: 0 })} className="px-2 text-sm text-gold underline">
            {t("Quitar filtros")}{filters.municipio !== "all" ? ` (${filters.municipio})` : ""}
          </button>
        )}
      </div>
      <span className="font-mono text-sm text-muted-foreground" aria-live="polite">{results.length} {t("de")} {properties.length}</span>
    </div>
  );
}

export function Portfolio() {
  const { t, language } = useLanguage();
  const { results } = useFilters();
  return (
    <section id="propiedades" className="py-24">
      <div className="container-site">
        <Reveal>
          <SectionHead eyebrow={t("Portafolio")} title={t("Propiedades seleccionadas")} aside={t("Cada propiedad tiene su propia página, con fotos, datos técnicos y un botón que le escribe a Toto con el nombre del lote ya incluido.")} />
        </Reveal>
        <PropertyFilters />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => <PropertyCard key={p.id} p={p} />)}
        </div>
        {results.length === 0 && <p className="py-16 text-center text-muted-foreground">{t("No hay propiedades con esos filtros.")}</p>}
      </div>
    </section>
  );
}
