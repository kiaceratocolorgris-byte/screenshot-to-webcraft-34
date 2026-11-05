import { useState } from "react";
import { useLanguage } from "@/lib/language";
import { images } from "@/data/images";

/** Tarjeta del asesor: misma foto de la sección "Sobre Toto", con respaldo al círculo verde si la foto no carga. */
export function AdvisorCard() {
  const { t } = useLanguage();
  const [failed, setFailed] = useState(false);

  return (
    <div className="mt-6 flex items-center gap-3 border-t pt-6">
      {failed ? (
        <span
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary font-display text-2xl text-gold-light sm:h-14 sm:w-14"
          aria-hidden
        >
          T
        </span>
      ) : (
        <img
          src={images.toto}
          alt="Juan Carlos “Toto” Echeverry"
          loading="lazy"
          onError={() => setFailed(true)}
          style={{ borderWidth: "1.5px", borderColor: "#9C7A3C" }}
          className="h-12 w-12 shrink-0 rounded-full border-solid object-cover object-[center_20%] sm:h-14 sm:w-14"
        />
      )}
      <div>
        <p className="font-medium">Juan Carlos “Toto” Echeverry</p>
        <p className="text-sm text-muted-foreground">
          {t("Asesor ·")}{" "}
          <a href="tel:+573004517485" className="font-mono no-underline">
            +57 300 451 7485
          </a>
        </p>
      </div>
    </div>
  );
}
