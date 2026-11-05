import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PropertyCardCarousel } from "@/components/site/PropertyCardCarousel";
import { coverFor, galleryFor, propertyImages } from "@/data/images";
import { properties } from "@/data/properties";
import apto from "@/assets/apto.jpg";
import bodega from "@/assets/bodega.jpg";
import finca from "@/assets/finca.jpg";
import hero from "@/assets/hero.jpg";
import interior from "@/assets/interior.jpg";

const SLUG = "apartamento-rosales-bogota";
const PREFIX = `/images/${SLUG}/`;
/** Imágenes generadas de relleno: ninguna debe aparecer en el Apartamento en Rosales. */
const GENERATED = [apto, bodega, finca, hero, interior];

const rosales = properties.find((p) => p.slug === SLUG)!;

describe("Apartamento en Rosales usa solo sus fotos reales", () => {
  it("tiene las 10 fotos reales, con 1.jpg como portada", () => {
    const entry = propertyImages[SLUG]!;
    expect(entry.cover).toBe(`${PREFIX}1.jpg`);
    expect(entry.images).toHaveLength(10);
    expect(entry.images[0]).toBe(`${PREFIX}1.jpg`);
    expect(entry.images[9]).toBe(`${PREFIX}10.jpg`);
    entry.images.forEach((src, i) => expect(src).toBe(`${PREFIX}${i + 1}.jpg`));
    expect(coverFor(rosales)).toBe(`${PREFIX}1.jpg`);
  });

  it("la galería de la ficha muestra las 10 y nunca una imagen generada", () => {
    const gallery = galleryFor(rosales);
    expect(gallery).toHaveLength(10);
    expect(gallery[0]!.src).toBe(`${PREFIX}1.jpg`);
    for (const photo of gallery) {
      expect(photo.src.startsWith(PREFIX)).toBe(true);
      expect(photo.fallback.startsWith(PREFIX)).toBe(true);
      expect(GENERATED).not.toContain(photo.src);
      expect(GENERATED).not.toContain(photo.fallback);
    }
  });

  it("la ficha apunta al PDF de la propiedad", () => {
    expect(rosales.pdfUrl).toBe("/fichas/apartamento-rosales-bogota.pdf");
  });

  it("el carrusel de la tarjeta muestra hasta 6 fotos reales, empezando por 1.jpg", () => {
    const { container } = render(
      <PropertyCardCarousel p={rosales} alt="Apartamento en Rosales" />,
    );
    const imgs = Array.from(container.querySelectorAll("img"));
    expect(imgs[0]?.getAttribute("src")).toBe(`${PREFIX}1.jpg`);
    for (const img of imgs) expect(GENERATED).not.toContain(img.getAttribute("src"));
    expect(screen.getAllByRole("button", { name: /^Foto \d+$/ })).toHaveLength(6);
  });
});
