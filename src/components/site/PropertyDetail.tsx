import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { CalendarDays, ChevronLeft, ChevronRight, MessageCircle, X } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { WHATSAPP_DISPLAY, priceDisplay, properties, propertyMessage, whatsappLink, type Property } from "@/data/properties";
import { galleryFor } from "@/data/images";
import { PropertyCard } from "./Portfolio";
import { SmartImage } from "./SmartImage";

const openWa = (msg: string) => window.open(whatsappLink(msg), "_blank", "noopener");
const inputCls = "mt-1 w-full rounded-sm border bg-field px-3 py-2.5 text-sm focus:border-gold focus:outline-none";
export const coPhone = z.string().transform((s) => s.replace(/\D/g, "").replace(/^57(?=\d{10}$)/, "")).pipe(z.string().regex(/^3\d{9}$/, "Ingrese un celular colombiano de 10 dígitos"));

/* ---------- Galería + lightbox ---------- */
function Gallery({ p }: { p: Property }) {
  const imgs = galleryFor(p);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const n = imgs.length;
  const move = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + n) % n)), [n]);

  useEffect(() => {
    if (open === null) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [open, move]);

  const order = [active, ...imgs.map((_, i) => i).filter((i) => i !== active)];
  const tile = (i: number, cls: string, eager = false) => (
    <button key={i} onClick={() => setOpen(i)} className={`group overflow-hidden ${cls}`} aria-label={`Ampliar foto ${i + 1} de ${p.name}`}>
      <SmartImage src={imgs[i]!.src} fallback={imgs[i]!.fallback} alt={`${p.name}, foto ${i + 1}`} loading={eager ? "eager" : "lazy"} width={1024} height={768}
        wrapperClassName="h-full w-full" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
    </button>
  );

  return (
    <div>
      {n >= 3 ? (
        <div className="grid aspect-[16/10] grid-cols-3 grid-rows-2 gap-2">
          {tile(order[0]!, "col-span-2 row-span-2", true)}
          {tile(order[1]!, "")}
          {tile(order[2]!, "")}
        </div>
      ) : (
        <div className={`grid aspect-[16/10] gap-2 ${n === 2 ? "grid-cols-2" : ""}`}>{order.map((i, k) => tile(i, "", k === 0))}</div>
      )}
      {n > 1 && (
        <div className="mt-2 flex gap-2 overflow-x-auto">
          {imgs.map((im, i) => (
            <button key={i} onClick={() => setActive(i)} aria-label={`Ver foto ${i + 1}`} aria-pressed={active === i}
              className={`h-16 w-24 shrink-0 overflow-hidden border-2 ${active === i ? "border-gold" : "border-transparent opacity-70 hover:opacity-100"}`}>
              <SmartImage src={im.src} fallback={im.fallback} alt="" width={96} height={64} wrapperClassName="h-full w-full" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
      {open !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95" role="dialog" aria-modal="true" aria-label={`Galería de ${p.name}`} onClick={() => setOpen(null)}>
          <img src={imgs[open]!.src} onError={(e) => { e.currentTarget.src = imgs[open]!.fallback; }} alt={`${p.name}, foto ${open + 1}`} className="max-h-[88vh] max-w-[92vw] object-contain" onClick={(e) => e.stopPropagation()} />
          <button autoFocus onClick={() => setOpen(null)} aria-label="Cerrar" className="absolute right-4 top-4 p-2 text-ink-foreground"><X className="h-7 w-7" /></button>
          {n > 1 && <>
            <button onClick={(e) => { e.stopPropagation(); move(-1); }} aria-label="Foto anterior" className="absolute left-3 p-3 text-ink-foreground"><ChevronLeft className="h-8 w-8" /></button>
            <button onClick={(e) => { e.stopPropagation(); move(1); }} aria-label="Foto siguiente" className="absolute right-3 p-3 text-ink-foreground"><ChevronRight className="h-8 w-8" /></button>
          </>}
          <span className="absolute bottom-5 font-mono text-sm text-ink-foreground/80">{open + 1} / {n}</span>
        </div>
      )}
    </div>
  );
}

/* ---------- Modal agendar visita ---------- */
const visitSchema = z.object({
  nombre: z.string().trim().min(2, "Escriba su nombre").max(80),
  celular: coPhone,
  fecha: z.string().min(1, "Elija fecha y hora"),
});

function VisitDialog({ p, open, onOpenChange }: { p: Property; open: boolean; onOpenChange: (o: boolean) => void }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-sm bg-card">
        <DialogHeader>
          <p className="eyebrow">Agendar visita</p>
          <DialogTitle className="font-display text-3xl font-normal">{p.name}</DialogTitle>
          <DialogDescription>Elija cuándo le queda bien y Toto le confirma por WhatsApp.</DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={(e) => {
          e.preventDefault();
          const r = visitSchema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
          if (!r.success) { setErrors(Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), i.message]))); return; }
          setErrors({});
          const when = new Date(r.data.fecha).toLocaleString("es-CO", { dateStyle: "full", timeStyle: "short" });
          openWa(`Hola Toto, soy ${r.data.nombre} (${r.data.celular}). Quiero agendar una visita a "${p.name}" (${p.municipality}) el ${when}.`);
          toast.success("Abrimos WhatsApp con su solicitud de visita.");
          onOpenChange(false);
        }}>
          {([["nombre", "Nombre", "text"], ["celular", "Celular", "tel"], ["fecha", "Fecha y hora preferida", "datetime-local"]] as const).map(([k, l, t]) => (
            <label key={k} className="block">
              <span className="field-label">{l}</span>
              <input name={k} type={t} className={inputCls} />
              {errors[k] && <span className="mt-1 block text-xs text-destructive">{errors[k]}</span>}
            </label>
          ))}
          <Button type="submit" className="w-full"><CalendarDays /> Enviar solicitud</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* ---------- Lateral ---------- */
function PdfCard({ p }: { p: Property }) {
  const [err, setErr] = useState("");
  return (
    <form className="border bg-card p-6" onSubmit={(e) => {
      e.preventDefault();
      const r = coPhone.safeParse(String(new FormData(e.currentTarget).get("wa") ?? ""));
      if (!r.success) { setErr(r.error.issues[0]!.message); return; }
      setErr("");
      if (p.pdfUrl) {
        const a = document.createElement("a"); a.href = p.pdfUrl; a.download = ""; a.target = "_blank"; a.click();
        toast.success("Descargando la ficha.");
      } else {
        openWa(`Hola Toto, por favor envíeme la ficha técnica en PDF de "${p.name}" (${p.municipality}) a este WhatsApp: ${r.data}.`);
        toast.success("Abrimos WhatsApp para pedir la ficha.");
      }
    }}>
      <p className="eyebrow">Ficha técnica</p>
      <h3 className="mt-2 text-2xl">Reciba la ficha en PDF</h3>
      <label className="mt-4 block">
        <span className="field-label">Su WhatsApp</span>
        <input name="wa" type="tel" inputMode="tel" placeholder="300 000 0000" className={inputCls} aria-invalid={!!err} />
        {err && <span className="mt-1 block text-xs text-destructive">{err}</span>}
      </label>
      <Button type="submit" variant="outline" className="mt-4 w-full">Enviarme la ficha</Button>
    </form>
  );
}

function Sidebar({ p, onVisit }: { p: Property; onVisit: () => void }) {
  return (
    <aside className="space-y-4 lg:sticky lg:top-24">
      <div className="border bg-card p-6">
        <p className="eyebrow">Precio</p>
        <p className="mt-2 font-display text-4xl">{priceDisplay(p)}</p>
        {p.priceNote && <p className="mt-1 text-sm text-muted-foreground">{p.priceNote}</p>}
        <div className="mt-6 space-y-2">
          <Button asChild className="w-full"><a href={whatsappLink(propertyMessage(p))} target="_blank" rel="noreferrer"><MessageCircle /> Preguntar por WhatsApp</a></Button>
          <Button variant="outline" className="w-full" onClick={onVisit}><CalendarDays /> Agendar visita</Button>
        </div>
        <div className="mt-6 flex items-center gap-3 border-t pt-6">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary font-display text-2xl text-gold-light" aria-hidden>T</span>
          <div>
            <p className="font-medium">Juan Carlos “Toto” Echeverry</p>
            <p className="text-sm text-muted-foreground">Asesor · <span className="font-mono">{WHATSAPP_DISPLAY}</span></p>
          </div>
        </div>
      </div>
      <PdfCard p={p} />
    </aside>
  );
}

/* ---------- Página ---------- */
export function PropertyDetail({ p }: { p: Property }) {
  const [visit, setVisit] = useState(false);
  const verified = p.distances.filter((d) => d.verified);
  const same = properties.filter((x) => x.municipality === p.municipality && x.id !== p.id);
  const related = (same.length ? same : properties.filter((x) => x.category === p.category && x.id !== p.id)).slice(0, 3);
  const numeric = (s: string) => /\d/.test(s);

  return (
    <div className="pb-24 lg:pb-0">
      <div className="container-site py-8">
        <nav aria-label="Ruta" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" hash="propiedades" className="text-gold hover:underline">← Todas las propiedades</Link>
          <span>/</span><span>{p.municipality}</span><span>/</span><span className="text-foreground">{p.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[65fr_35fr]">
          <div className="min-w-0">
            <Gallery p={p} />

            <p className="eyebrow mt-10">{p.tag.toUpperCase()} · {p.municipality}</p>
            <h1 className="mt-3 text-5xl leading-tight md:text-6xl">{p.name}</h1>
            <p className="mt-3 text-lg text-muted-foreground">{p.location}</p>

            <div className="mt-8 grid grid-cols-3 divide-x border-y">
              {p.keyStats.map((s) => (
                <div key={s.label} className="px-4 py-5 first:pl-0">
                  <div className="font-display text-xl md:text-3xl">{s.value}</div>
                  <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground md:text-[11px]">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4 text-lg leading-relaxed text-foreground/85">
              {p.description.map((d, i) => <p key={i}>{d}</p>)}
            </div>

            <section className="mt-14">
              <p className="eyebrow">Datos técnicos · {p.name}</p>
              <h2 className="mt-2 text-3xl">Tarjeta del inmueble</h2>
              <div className="mt-6 overflow-x-auto border">
                <table className="w-full text-sm">
                  <thead className="bg-primary text-left text-[11px] uppercase tracking-[0.12em] text-primary-foreground">
                    <tr><th className="px-4 py-3 font-semibold">Concepto</th><th className="px-4 py-3 text-right font-semibold">Dato</th><th className="px-4 py-3 font-semibold">Nota</th></tr>
                  </thead>
                  <tbody className="bg-card">
                    {p.specs.map((s) => (
                      <tr key={s.concepto} className="border-t">
                        <td className="px-4 py-3">{s.concepto}</td>
                        <td className={`px-4 py-3 text-right ${numeric(s.dato) ? "font-mono" : ""}`}>{s.dato}</td>
                        <td className="px-4 py-3 text-muted-foreground">{s.nota ?? ""}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {p.includes.length > 0 && (
              <section className="mt-14">
                <h2 className="text-3xl">Lo que incluye</h2>
                <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {p.includes.map((x) => <li key={x} className="flex gap-3"><span className="text-gold" aria-hidden>—</span>{x}</li>)}
                </ul>
              </section>
            )}

            {verified.length > 0 && (
              <section className="mt-14">
                <h2 className="text-3xl">Distancias aproximadas</h2>
                <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                  {verified.map((d) => (
                    <li key={d.lugar} className="flex items-baseline gap-2">
                      <span>{d.lugar}</span>
                      <span className="flex-1 border-b border-dotted border-input" aria-hidden />
                      <span className="font-mono text-sm text-gold">{d.tiempo}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted-foreground">Tiempos en carro, aproximados.</p>
              </section>
            )}
          </div>

          <Sidebar p={p} onVisit={() => setVisit(true)} />
        </div>

        {related.length > 0 && (
          <section className="mt-20 border-t pt-14">
            <h2 className="mb-8 text-3xl md:text-4xl">Otras propiedades en {same.length ? p.municipality : "la misma categoría"}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((r) => <PropertyCard key={r.id} p={r} />)}</div>
          </section>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 flex gap-2 border-t bg-background p-3 lg:hidden">
        <Button asChild className="flex-1"><a href={whatsappLink(propertyMessage(p))} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp</a></Button>
        <Button variant="outline" className="flex-1" onClick={() => setVisit(true)}>Agendar visita</Button>
      </div>

      <VisitDialog p={p} open={visit} onOpenChange={setVisit} />
    </div>
  );
}
