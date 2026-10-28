import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ContactForms } from "@/components/site/ContactForms";
import { LanguageProvider } from "@/lib/language";

vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

afterEach(() => vi.unstubAllGlobals());

const renderForms = () => render(<LanguageProvider><ContactForms /></LanguageProvider>);

const buyerForm = (container: HTMLElement) => container.querySelectorAll("form")[0] as HTMLFormElement;

const fillBuyer = (form: HTMLFormElement) => {
  fireEvent.input(within(form).getByLabelText("Nombre"), { target: { value: "Ana Prueba" } });
  fireEvent.input(within(form).getByLabelText("Celular"), { target: { value: "3000000000" } });
  const presupuesto = within(form).getByLabelText("Presupuesto") as HTMLSelectElement;
  fireEvent.change(presupuesto, { target: { value: presupuesto.options[1]?.value ?? "" } });
  fireEvent.click(within(form).getByRole("button", { name: "Enviar a Toto" }));
};

describe("Contact form confirmation", () => {
  it("shows the success message over the form once Formspree accepts the lead", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 })));
    const { container } = renderForms();
    const form = buyerForm(container);

    fillBuyer(form);

    const status = await screen.findByRole("status");
    expect(status).toHaveTextContent("Mensaje enviado");
    expect(form.contains(status)).toBe(true);
    expect(within(form).getByLabelText("Nombre")).toHaveValue("");

    fireEvent.click(within(status).getByRole("button", { name: "Enviar otro mensaje" }));
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("keeps the typed data and warns when delivery is not accepted", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: false }), { status: 200 })));
    const { container } = renderForms();
    const form = buyerForm(container);

    fillBuyer(form);

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("No se pudo enviar el mensaje. Intente de nuevo.");
    expect(screen.queryByRole("status")).toBeNull();
    expect(within(form).getByLabelText("Nombre")).toHaveValue("Ana Prueba");
  });
});
