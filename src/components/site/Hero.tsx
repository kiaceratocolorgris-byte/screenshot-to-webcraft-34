import { useLanguage } from "@/lib/language";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { images } from "@/data/images";
import { categoryLabels, municipalities, properties, type Category } from "@/data/properties";
import { scrollTo, useFilters } from "@/lib/filters";

const selectCls = "w-full bg-transparent py-1 text-sm text-foreground focus:outline-none";

export function Hero() {
  const { t, language } = useLanguage();
  const { setFilters } = useFilters();
  const [cat, setCat] = useState<Category | "all">("all");
  const [mun, setMun] = useState<string>("all");
  const [area, setArea] = useState(0);
  const muns = municipalities();
  const regions = new Set(properties.map((p) => p.region)).size;

  const stats: [string, string][] = [
    [String(properties.length), "propiedades disponibles"],
    [String(muns.length), `${t("municipios en")} ${regions} ${t("regiones")}`],
    ["+30 años", "de respaldo de Constructora Serving"],
    ["1 a 1", "asesoría directa con Toto"],
  ];

  return (
    <section id="top" className="relative flex min-h-[92vh] flex-col overflow-hidden text-ink-foreground">
      <img src={images.hero} alt={t("Vista aérea de montañas y parcelaciones del Oriente Antioqueño")} className="absolute inset-0 h-full w-full object-cover" width={1920} height={1088} />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="container-site relative flex flex-1 flex-col justify-center py-20">
        <p className="eyebrow mb-5 text-gold-light">{t("Oriente Antioqueño · Envigado · Eje Cafetero")}</p>
        <h1 className="max-w-3xl text-5xl leading-[1.05] md:text-7xl">
          {t("Invierta en tierra con la")} <em className="text-gold-light">{t("estrategia")}</em> {t("de un golfista profesional.")}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-ink-foreground/85">
          {t("Soy Juan Carlos “Toto” Echeverry. Le ayudo a encontrar el lote, la casa o la bodega correcta en las zonas de mayor valorización del Oriente, con el respaldo de Constructora Serving.")}
        </p>
        <form
          className="mt-10 grid max-w-3xl gap-px border bg-border text-foreground sm:grid-cols-[1fr_1fr_1fr_auto]"
          onSubmit={(e) => {
            e.preventDefault();
            setFilters({ category: cat, municipio: mun, minArea: area });
            scrollTo("propiedades");
          }}
        >
          <label className="bg-card px-4 py-3">
            <span className="field-label">{t("Tipo")}</span>
            <select className={selectCls} value={cat} onChange={(e) => setCat(e.target.value as never)}>
              <option value="all">{t("Todos")}</option>
              {Object.entries(categoryLabels).map(([k, v]) => <option key={k} value={k}>{t(v)}</option>)}
            </select>
          </label>
          <label className="bg-card px-4 py-3">
            <span className="field-label">{t("Municipio")}</span>
            <select className={selectCls} value={mun} onChange={(e) => setMun(e.target.value)}>
              <option value="all">{t("Todos")}</option>
              {muns.map((m) => <option key={m} value={m}>{t(m)}</option>)}
            </select>
          </label>
          <label className="bg-card px-4 py-3">
            <span className="field-label">{t("Área mínima")}</span>
            <select className={selectCls} value={area} onChange={(e) => setArea(Number(e.target.value))}>
              <option value={0}>{t("Cualquiera")}</option>
              <option value={1500}>1.500 m²</option>
              <option value={2500}>2.500 m²</option>
              <option value={5000}>5.000 m²</option>
              <option value={10000}>1 ha</option>
            </select>
          </label>
          <Button type="submit" className="h-auto min-h-12 px-8">{t("Buscar")}</Button>
        </form>
      </div>
      <div className="relative border-t border-ink-foreground/15 bg-ink/80">
        <div className="container-site grid grid-cols-2 gap-6 py-6 md:grid-cols-4">
          {stats.map(([n, l]) => (
            <div key={t(l)}>
              <div className="font-display text-3xl">{t(n)}</div>
              <div className="text-xs text-ink-foreground/70">{t(l)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
