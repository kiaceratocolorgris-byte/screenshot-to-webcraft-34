import { useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink as waLink } from "@/data/properties";
import totoLogo from "@/assets/toto-logo-compact.jpg.asset.json";

const NAV = [
  ["Propiedades", "propiedades"],
  ["Mapa", "mapa"],
  ["Zonas", "zonas"],
  ["Sobre Toto", "sobre-toto"],
  ["Contacto", "contacto"],
] as const;

const WA_BTN =
  "border border-header-foreground bg-header-foreground text-header hover:bg-header-foreground/85 hover:text-header";

export const WA_DEFAULT = "Hola Toto, vi su portafolio y quiero más información.";

export function Logo() {
  return (
    <a href="/" className="flex items-center gap-3" aria-label="Toto Partner Inmobiliario, inicio">
      <img src={totoLogo.url} alt="Totogolf · Partner inmobiliario" width={402} height={150} className="h-auto w-[180px] shrink-0 object-contain sm:w-[216px]" />
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-header-foreground/15 bg-header">
      <div className="container-site flex h-[88px] items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {NAV.map(([l, id]) => (
            <a key={id} href={`/#${id}`} className="text-sm text-header-foreground/80 transition-colors hover:text-header-foreground">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild className={`hidden sm:inline-flex ${WA_BTN}`}>
            <a href={waLink(WA_DEFAULT)} target="_blank" rel="noreferrer">
              <MessageCircle /> WhatsApp
            </a>
          </Button>
          <Button asChild size="icon" className={`sm:hidden ${WA_BTN}`} aria-label="WhatsApp">
            <a href={waLink(WA_DEFAULT)} target="_blank" rel="noreferrer"><MessageCircle /></a>
          </Button>
          <Button variant="ghost" size="icon" className="text-header-foreground hover:bg-header-foreground/10 hover:text-header-foreground lg:hidden" onClick={() => setOpen(!open)} aria-label="Menú" aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-header-foreground/15 bg-header lg:hidden" aria-label="Móvil">
          {NAV.map(([l, id]) => (
            <a key={id} href={`/#${id}`} onClick={() => setOpen(false)} className="container-site block border-b border-header-foreground/15 py-4 font-display text-lg text-header-foreground">
              {l}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

export function WhatsAppFab() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  if (path.startsWith("/propiedad/")) return null;
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
