import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { properties, type Municipio, type PropertyCategory } from "@/data/properties";

export interface Filters {
  category: PropertyCategory | "all";
  municipio: Municipio | "all";
  minArea: number;
}

const Ctx = createContext<{
  filters: Filters;
  setFilters: (f: Partial<Filters>) => void;
  results: typeof properties;
} | null>(null);

export function FiltersProvider({ children }: { children: ReactNode }) {
  const [filters, set] = useState<Filters>({ category: "all", municipio: "all", minArea: 0 });
  const results = useMemo(
    () =>
      properties.filter(
        (p) =>
          (filters.category === "all" || p.category === filters.category) &&
          (filters.municipio === "all" || p.municipio === filters.municipio) &&
          (filters.minArea === 0 || p.minArea === null || p.minArea >= filters.minArea),
      ),
    [filters],
  );
  return (
    <Ctx.Provider value={{ filters, setFilters: (f) => set((s) => ({ ...s, ...f })), results }}>
      {children}
    </Ctx.Provider>
  );
}

export function useFilters() {
  const c = useContext(Ctx);
  if (!c) throw new Error("FiltersProvider missing");
  return c;
}

export const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
