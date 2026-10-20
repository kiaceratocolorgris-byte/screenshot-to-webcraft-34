import { createFileRoute, Link, notFound, type ErrorComponentProps } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { properties } from "@/data/properties";
import { PropertyDetail } from "@/components/site/PropertyDetail";

export const Route = createFileRoute("/propiedad/$slug")({
  loader: ({ params }) => {
    const p = properties.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData: p }) => {
    if (!p) return { meta: [{ title: "Propiedad no disponible | Toto Partner Inmobiliario" }, { name: "robots", content: "noindex" }] };
    const title = `${p.name} · ${p.municipality} | Toto Partner Inmobiliario`;
    const ld: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": ["RealEstateListing", "Product"],
      name: p.name,
      description: p.summary,
      image: p.cover,
      address: { "@type": "PostalAddress", addressLocality: p.municipality, streetAddress: p.location, addressCountry: "CO" },
    };
    if (p.priceCOP) ld["offers"] = { "@type": "Offer", price: p.priceCOP, priceCurrency: "COP", availability: "https://schema.org/InStock" };
    return {
      meta: [
        { title },
        { name: "description", content: p.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: p.summary },
        { property: "og:type", content: "website" },
      ],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(ld) }],
    };
  },
  component: PropertyPage,
  notFoundComponent: NotFoundProperty,
  errorComponent: ErrorProperty,
});

function PropertyPage() {
  const p = Route.useLoaderData();
  return <PropertyDetail key={p.slug} p={p} />;
}

function NotFoundProperty() {
  return (
    <section className="container-site flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">Propiedad no encontrada</p>
      <h1 className="mt-4 text-5xl md:text-6xl">Este lote ya no está en el portafolio</h1>
      <p className="mt-4 max-w-md text-muted-foreground">Puede que se haya vendido o que el enlace haya cambiado. Vea las propiedades disponibles.</p>
      <Button asChild className="mt-8"><Link to="/" hash="propiedades">Ver el portafolio</Link></Button>
    </section>
  );
}

function ErrorProperty({ reset }: ErrorComponentProps) {
  return (
    <section className="container-site py-24 text-center">
      <h1 className="text-4xl">No pudimos cargar esta propiedad</h1>
      <Button className="mt-6" onClick={reset}>Intentar de nuevo</Button>
    </section>
  );
}
