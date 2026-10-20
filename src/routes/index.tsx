import { createFileRoute } from "@tanstack/react-router";
import { FiltersProvider } from "@/lib/filters";
import { Hero } from "@/components/site/Hero";
import { Portfolio } from "@/components/site/Portfolio";
import { MapSection } from "@/components/site/MapSection";
import { ZoneGrid, BackingSection, AboutToto, ProcessSteps } from "@/components/site/Sections";
import { ContactForms } from "@/components/site/ContactForms";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Toto Partner Inmobiliario · Lotes y propiedades en el Oriente Antioqueño" },
      { name: "description", content: "Portafolio inmobiliario premium en El Retiro, Rionegro, La Ceja, Envigado y Pereira, con asesoría directa de Juan Carlos “Toto” Echeverry y respaldo de Constructora Serving." },
      { property: "og:title", content: "Toto Partner Inmobiliario" },
      { property: "og:description", content: "Invierta en tierra con la estrategia de un golfista profesional. Lotes campestres, apartamentos y bodegas en el Oriente Antioqueño." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <FiltersProvider>
      <Hero />
      <Portfolio />
      <MapSection />
      <ZoneGrid />
      <BackingSection />
      <AboutToto />
      <ProcessSteps />
      <ContactForms />
    </FiltersProvider>
  );
}
