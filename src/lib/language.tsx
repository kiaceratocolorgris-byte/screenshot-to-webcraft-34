import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { english } from "./translations";

export type Language = "es" | "en";
export function translate(text: string, language: Language): string {
  return language === "en" ? (english[text] ?? text) : text;
}
const LanguageContext = createContext<{ language: Language; setLanguage: (value: Language) => void }>({ language: "es", setLanguage: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");
  useEffect(() => {
    try { if (localStorage.getItem("toto-language") === "en") setLanguage("en"); } catch { /* Storage may be unavailable. */ }
  }, []);
  useEffect(() => { document.documentElement.lang = language === "es" ? "es-CO" : "en"; }, [language]);
  const change = (value: Language) => {
    setLanguage(value);
    try { localStorage.setItem("toto-language", value); } catch { /* Switching still works without storage. */ }
  };
  return <LanguageContext.Provider value={{ language, setLanguage: change }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  return { ...context, t: (text: string) => translate(text, context.language) };
}