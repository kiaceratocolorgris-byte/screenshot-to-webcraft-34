import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";

/** Imagen con skeleton mientras carga y respaldo si el archivo no existe. */
export function SmartImage({ src, fallback, className = "", wrapperClassName = "", ...rest }: ImgHTMLAttributes<HTMLImageElement> & { src: string; fallback: string; wrapperClassName?: string }) {
  const [cur, setCur] = useState(src);
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  const fail = () => { if (cur !== fallback) setCur(fallback); else setLoaded(true); };

  useEffect(() => { setCur(src); setLoaded(false); }, [src]);
  // Si la imagen terminó (o falló) antes de que la página respondiera, revisarla al montar.
  useEffect(() => {
    const img = ref.current;
    if (img?.complete) { if (img.naturalWidth > 0) setLoaded(true); else fail(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cur]);

  return (
    <span className={`relative block overflow-hidden bg-muted ${wrapperClassName}`}>
      {!loaded && <span className="absolute inset-0 animate-pulse bg-border/60" aria-hidden />}
      <img
        {...rest}
        ref={ref}
        src={cur}
        loading={rest.loading ?? "lazy"}
        onLoad={() => setLoaded(true)}
        onError={fail}
        className={`${className} transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </span>
  );
}
