import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { properties, waLink } from "@/data/properties";

export const Route = createFileRoute("/propiedad/$slug")({
  loader: ({ params }) => {
    const p = properties.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} · Toto Partner Inmobiliario` },
          { name: "description", content: `${loaderData.name}, ${loaderData.location}. ${loaderData.areaLabel}.` },
          { property: "og:title", content: loaderData.name },
          { property: "og:description", content: `${loaderData.location} · ${loaderData.areaLabel}` },
        ]
      : [{ title: "Propiedad no disponible" }, { name: "robots", content: "noindex" }],
  }),
  component: PropertyPage,
});

function PropertyPage() {
  const p = Route.useLoaderData();
  return (
    <section className="container-site py-24">
      <p className="eyebrow mb-3">{p.tag}</p>
      <h1 className="text-5xl">{p.name}</h1>
      <p className="mt-3 text-muted-foreground">{p.location} · <span className="font-mono">{p.areaLabel}</span></p>
      <p className="mt-8 text-muted-foreground">Ficha completa próximamente.</p>
      <div className="mt-8 flex gap-3">
        <Button asChild><a href={waLink(`Hola Toto, me interesa ${p.name}.`)} target="_blank" rel="noreferrer">Escribir a Toto</a></Button>
        <Button asChild variant="outline"><Link to="/">Volver al portafolio</Link></Button>
      </div>
    </section>
  );
}
