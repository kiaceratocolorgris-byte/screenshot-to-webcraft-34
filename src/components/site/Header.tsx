import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { waLink } from "@/data/properties";

const NAV = [
  ["Propiedades", "propiedades"],
  ["Mapa", "mapa"],
  ["Zonas", "zonas"],
  ["Sobre Toto", "sobre-toto"],
  ["Contacto", "contacto"],
] as const;

export const WA_DEFAULT = "Hola Toto, vi su portafolio y quiero más información.";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-3" aria-label="Toto Partner Inmobiliario, inicio">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-ink">
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-ink-foreground" aria-hidden>
          <rect x="7" y="3" width="1.6" height="18" />
          <path d="M8.6 3.5 L18 7 L8.6 10.5 Z" />
          <ellipse cx="9" cy="21" rx="5" ry="1" />
        </svg>
      </span>
      <span className="leading-none">
        <span className={`block font-display text-xl ${light ? "text-ink-foreground" : "text-foreground"}`}>TOTO</span>
        <span className={`block text-[9px] font-semibold tracking-[0.22em] ${light ? "text-gold-light" : "text-muted-foreground"}`}>
          PARTNER INMOBILIARIO
        </span>
      </span>
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="container-site flex h-[72px] items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex" aria-label="Principal">
          {NAV.map(([l, id]) => (
            <a key={id} href={`#${id}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex">
            <a href={waLink(WA_DEFAULT)} target="_blank" rel="noreferrer">
              <MessageCircle /> WhatsApp
            </a>
          </Button>
          <Button asChild size="icon" className="sm:hidden" aria-label="WhatsApp">
            <a href={waLink(WA_DEFAULT)} target="_blank" rel="noreferrer"><MessageCircle /></a>
          </Button>
          <button className="p-2 md:hidden" onClick={() => setOpen(!open)} aria-label="Menú" aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t md:hidden" aria-label="Móvil">
          {NAV.map(([l, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="container-site block border-b py-4 font-display text-lg">
              {l}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

export function WhatsAppFab() {
  return (
    <a
      href={waLink(WA_DEFAULT)}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribir a Toto por WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-200 hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
