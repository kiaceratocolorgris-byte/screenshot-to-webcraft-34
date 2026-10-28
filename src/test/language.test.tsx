import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { LanguageProvider, useLanguage } from "@/lib/language";
import { properties } from "@/data/properties";

describe("Language preference", () => {
  beforeEach(() => localStorage.clear());
  it("starts in Spanish and switches both ways", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper: LanguageProvider });
    expect(result.current.language).toBe("es");
    act(() => result.current.setLanguage("en"));
    expect(result.current.language).toBe("en");
    expect(document.documentElement.lang).toBe("en");
    act(() => result.current.setLanguage("es"));
    expect(result.current.language).toBe("es");
    expect(document.documentElement.lang).toBe("es-CO");
  });
  it("restores the selected language", async () => {
    localStorage.setItem("toto-language", "en");
    const { result } = renderHook(() => useLanguage(), { wrapper: LanguageProvider });
    await waitFor(() => expect(result.current.language).toBe("en"));
  });
  it("does not mutate owner listing data when switching", () => {
    const original = JSON.stringify(properties);
    const { result } = renderHook(() => useLanguage(), { wrapper: LanguageProvider });
    act(() => result.current.setLanguage("en"));
    for (const p of properties) p.description.forEach(result.current.t);
    expect(JSON.stringify(properties)).toBe(original);
  });
});