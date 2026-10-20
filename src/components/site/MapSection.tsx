import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { properties } from "@/data/properties";
import { mapPositions } from "@/data/mapPositions";
import { Reveal, SectionHead } from "./Reveal";

const TOWNS: [string, number, number][] = [
  ["Medellín", 12, 28], ["Envigado", 14, 58], ["El Retiro", 38, 84], ["La Ceja", 64, 88],
  ["Llanogrande", 50, 40], ["Rionegro", 70, 22], ["El Carmen de V.", 86, 50],
];

export function MapSection() {
  const [hover, setHover] = useState<number | null>(null);
  const onMap = properties.filter((p) => p.showOnMap && mapPositions[p.slug]);
  return (
    <section id="mapa" className="border-y bg-card py-24">
      <div className="container-site">
        <Reveal>
          <SectionHead eyebrow="Ubicación" title="El Oriente, lote por lote" aside="Toque un número para ver la propiedad. El aeropuerto José María Córdova queda en el centro de casi todo el portafolio." />
        </Reveal>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="relative aspect-square border bg-background sm:aspect-[4/3]">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full stroke-border" aria-hidden>
              <path d="M12 28 Q 30 40 50 40 T 70 22" fill="none" strokeWidth="0.6" strokeDasharray="1.5 1" />
              <path d="M14 58 Q 30 70 38 84 T 64 88" fill="none" strokeWidth="0.6" strokeDasharray="1.5 1" />
              <path d="M50 40 Q 58 65 64 88" fill="none" strokeWidth="0.6" strokeDasharray="1.5 1" />
              <path d="M12 28 L14 58" fill="none" strokeWidth="0.6" strokeDasharray="1.5 1" />
            </svg>
            {TOWNS.map(([n, x, y]) => (
              <span key={n} className="absolute -translate-x-1/2 text-[11px] uppercase tracking-[0.12em] text-muted-foreground" style={{ left: `${x}%`, top: `${y}%` }}>{n}</span>
            ))}
            <span className="absolute -translate-x-1/2 -translate-y-1/2 border border-foreground bg-card px-2 py-1 font-mono text-[10px]" style={{ left: "60%", top: "34%" }}>✈ JMC</span>
            {onMap.map((p) => {
              const pos = mapPositions[p.slug]!;
              return (
                <Link key={p.id} to="/propiedad/$slug" params={{ slug: p.slug }}
                  onMouseEnter={() => setHover(p.id)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(p.id)} onBlur={() => setHover(null)}
                  aria-label={`${p.id}. ${p.name}`}
                  className={`absolute grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full font-mono text-[11px] transition-all duration-200 ${hover === p.id ? "z-10 scale-125 bg-ink text-ink-foreground" : "bg-gold text-primary-foreground"}`}
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}>
                  {p.id}
                </Link>
              );
            })}
          </div>
          <ol className="max-h-[560px] overflow-auto border-t">
            {properties.map((p) => (
              <li key={p.id}>
                <Link to="/propiedad/$slug" params={{ slug: p.slug }} onMouseEnter={() => setHover(p.id)} onMouseLeave={() => setHover(null)}
                  className={`flex items-center gap-4 border-b px-2 py-3 transition-colors duration-200 ${hover === p.id ? "bg-background" : ""}`}>
                  <span className="w-6 font-mono text-xs text-gold">{String(p.id).padStart(2, "0")}</span>
                  <span className="flex-1">
                    <span className="block font-display text-lg leading-tight">{p.name}</span>
                    <span className="text-xs text-muted-foreground">{p.municipality} · <span className="font-mono">{p.areaLabel}</span></span>
                  </span>
                  <span className="text-sm text-gold">Ver →</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
