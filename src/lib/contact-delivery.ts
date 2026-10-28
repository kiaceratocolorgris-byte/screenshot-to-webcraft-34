const endpoint = "https://formspree.io/f/mqppbrdy";

export async function submitContactLead(category: "Compradores" | "Propietarios", fields: Record<string, string | undefined>) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ ...fields, categoria: category, subject: `Toto Partner Inmobiliario · ${category}` }),
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw new Error("Contact delivery failed");
  const result: unknown = await response.json();
  if (!result || typeof result !== "object" || !("ok" in result) || result.ok !== true) {
    throw new Error("Contact delivery not accepted");
  }
}