import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { propertyImages, placeholderFor } from "@/data/images";
import type { Property } from "@/data/properties";
import { SmartImage } from "./SmartImage";

const MAX_PHOTOS = 6;

/** Fotos del carrusel de la tarjeta: hasta 6 de propertyImages; si no hay, solo la portada. */
function photosFor(p: Property): { src: string; fallback: string }[] {
  const real = propertyImages[p.slug]?.images;
  // Con fotos reales, el respaldo es la misma foto real: nunca una imagen generada.
  if (real && real.length > 0) return real.slice(0, MAX_PHOTOS).map((src) => ({ src, fallback: src }));
  const src = p.cover ?? placeholderFor(p);
  return [{ src, fallback: placeholderFor(p) }];
}

/**
 * Carrusel circular dentro de la tarjeta de propiedad.
 * - Flechas con fade al hover en escritorio; siempre visibles y más pequeñas en táctil.
 * - Swipe en celular/tablet, puntos indicadores (máx. 6), transición 300 ms.
 * - Carga diferida: solo la primera foto al renderizar; el resto al interactuar.
 * - Los clics en flechas/puntos no navegan a la ficha (stopPropagation).
 */
export function PropertyCardCarousel({ p, alt }: { p: Property; alt: string }) {
  const photos = useMemo(() => photosFor(p), [p]);
  const [index, setIndex] = useState(0);
  // Fotos que ya se pidieron al navegador (la primera siempre).
  const [requested, setRequested] = useState<Set<number>>(() => new Set([0]));
  const touch = useRef<{ x: number; y: number } | null>(null);
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const request = useCallback((i: number) => {
    setRequested((prev) => {
      if (prev.has(i)) return prev;
      const next = new Set(prev);
      next.add(i);
      return next;
    });
  }, []);

  const go = useCallback(
    (i: number) => {
      const n = photos.length;
      const target = ((i % n) + n) % n;
      setIndex(target);
      request(target);
      request((target + 1) % n); // precargar la siguiente
    },
    [photos.length, request],
  );

  const stop = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const t0 = e.touches[0];
    if (t0) touch.current = { x: t0.clientX, y: t0.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touch.current;
    touch.current = null;
    const t0 = e.changedTouches[0];
    if (!start || !t0) return;
    const dx = t0.clientX - start.x;
    const dy = t0.clientY - start.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      go(index + (dx < 0 ? 1 : -1));
    }
  };

  const single = photos.length <= 1;
  const transition = reduceMotion.current ? "none" : "transform 300ms ease";

  return (
    <div
      className="group/carousel relative h-full w-full"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseEnter={() => request((index + 1) % photos.length)}
    >
      {/* Pista deslizante */}
      <div
        className="flex h-full w-full"
        style={{ transform: `translateX(-${index * 100}%)`, transition }}
      >
        {photos.map((photo, i) => (
          <div key={photo.src} className="relative h-full w-full shrink-0" aria-hidden={i !== index}>
            {requested.has(i) ? (
              <SmartImage
                src={photo.src}
                fallback={photo.fallback}
                alt={i === index ? alt : ""}
                width={1024}
                height={768}
                loading={i === 0 ? "eager" : "lazy"}
                wrapperClassName="h-full w-full"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            ) : (
              <span className="block h-full w-full bg-muted" aria-hidden />
            )}
          </div>
        ))}
      </div>

      {!single && (
        <>
          {/* Flechas: fade al hover en escritorio; siempre visibles y pequeñas en táctil */}
          <button
            type="button"
            aria-label="Foto anterior"
            onClick={(e) => { stop(e); go(index - 1); }}
            className="absolute left-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-opacity duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:h-9 md:w-9 md:opacity-0 md:group-hover/carousel:opacity-100 md:group-focus-within/carousel:opacity-100"
          >
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
          </button>
          <button
            type="button"
            aria-label="Foto siguiente"
            onClick={(e) => { stop(e); go(index + 1); }}
            className="absolute right-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-opacity duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:h-9 md:w-9 md:opacity-0 md:group-hover/carousel:opacity-100 md:group-focus-within/carousel:opacity-100"
          >
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
          </button>

          {/* Puntos indicadores */}
          <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {photos.map((photo, i) => (
              <button
                key={photo.src}
                type="button"
                aria-label={`Foto ${i + 1}`}
                aria-current={i === index}
                onClick={(e) => { stop(e); go(i); }}
                className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${i === index ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
