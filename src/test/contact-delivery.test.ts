import { afterEach, describe, expect, it, vi } from "vitest";
import { submitContactLead } from "@/lib/contact-delivery";

afterEach(() => vi.unstubAllGlobals());

describe("Formspree contact delivery", () => {
  it.each(["Compradores", "Propietarios"] as const)("sends %s to the owner's chosen endpoint", async (category) => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    await submitContactLead(category, { nombre: "Prueba Toto", celular: "3000000000" });
    expect(fetchMock).toHaveBeenCalledWith("https://formspree.io/f/mqppbrdy", expect.objectContaining({ method: "POST" }));
    expect(JSON.parse(fetchMock.mock.calls[0]?.[1].body)).toMatchObject({ categoria: category, nombre: "Prueba Toto", celular: "3000000000" });
  });
  it("rejects unsuccessful delivery rather than reporting success", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status: 422 })));
    await expect(submitContactLead("Compradores", { nombre: "Prueba Toto" })).rejects.toThrow();
  });
  it("requires explicit acceptance before reporting success", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: false }), { status: 200 })));
    await expect(submitContactLead("Propietarios", { nombre: "Prueba Toto" })).rejects.toThrow();
  });
  it("propagates network failures", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Network error")));
    await expect(submitContactLead("Compradores", { nombre: "Prueba Toto" })).rejects.toThrow();
  });
});