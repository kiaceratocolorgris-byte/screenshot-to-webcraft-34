import { useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink as waLink } from "@/data/properties";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { ESFlag, USFlag } from "@/components/site/Flags";
import totoLogo from "@/assets/toto-logo-compact.jpg.asset.json";
import { useLanguage } from "@/lib/language";

const NAV = [
  ["Propiedades", "propiedades"],
  ["Mapa", "mapa"],
  ["Zonas", "zonas"],
  ["Sobre Toto", "sobre-toto"],
  ["Contacto", "contacto"],
] as const;


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
  const { language, setLanguage, t } = useLanguage();
  return (
    <header className="sticky top-0 z-40 border-b border-header-foreground/15 bg-header">
      <div className="container-site flex h-[88px] items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {NAV.map(([l, id]) => (
            <a key={id} href={`/#${id}`} className="text-sm text-header-foreground/80 transition-colors hover:text-header-foreground">
              {t(l)}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div role="group" aria-label={t("Idioma")} className="flex shrink-0 items-center text-header-foreground">
            <Button variant="ghost" size="sm" onClick={() => setLanguage("en")} aria-label="English" aria-pressed={language === "en"} className={`h-9 gap-1.5 px-1.5 text-xs text-header-foreground hover:bg-header-foreground/10 hover:text-header-foreground sm:px-2 sm:text-sm ${language === "en" ? "underline underline-offset-4" : "opacity-70"}`}><USFlag className="h-3 w-[19px] rounded-[1px]" aria-hidden /> EN</Button>
            <span aria-hidden="true" className="text-header-foreground/50">/</span>
            <Button variant="ghost" size="sm" onClick={() => setLanguage("es")} aria-label="Español" aria-pressed={language === "es"} className={`h-9 gap-1.5 px-1.5 text-xs text-header-foreground hover:bg-header-foreground/10 hover:text-header-foreground sm:px-2 sm:text-sm ${language === "es" ? "underline underline-offset-4" : "opacity-70"}`}><ESFlag className="h-3 w-[19px] rounded-[1px]" aria-hidden /> ESP</Button>
          </div>
          <Button variant="ghost" size="icon" className="text-header-foreground hover:bg-header-foreground/10 hover:text-header-foreground lg:hidden" onClick={() => setOpen(!open)} aria-label="Menú" aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-header-foreground/15 bg-header lg:hidden" aria-label="Móvil">
          {NAV.map(([l, id]) => (
            <a key={id} href={`/#${id}`} onClick={() => setOpen(false)} className="container-site block border-b border-header-foreground/15 py-4 font-display text-lg text-header-foreground">
              {t(l)}
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
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-105"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
