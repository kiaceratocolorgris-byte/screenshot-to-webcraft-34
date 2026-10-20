import { useState, type ImgHTMLAttributes } from "react";

/** Imagen con skeleton mientras carga y respaldo si el archivo no existe. */
export function SmartImage({ src, fallback, className = "", wrapperClassName = "", ...rest }: ImgHTMLAttributes<HTMLImageElement> & { src: string; fallback: string; wrapperClassName?: string }) {
  const [cur, setCur] = useState(src);
  const [loaded, setLoaded] = useState(false);
  return (
    <span className={`relative block overflow-hidden bg-muted ${wrapperClassName}`}>
      {!loaded && <span className="absolute inset-0 animate-pulse bg-border/60" aria-hidden />}
      <img
        {...rest}
        src={cur}
        loading={rest.loading ?? "lazy"}
        onLoad={() => setLoaded(true)}
        onError={() => { if (cur !== fallback) setCur(fallback); else setLoaded(true); }}
        className={`${className} transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </span>
  );
}
