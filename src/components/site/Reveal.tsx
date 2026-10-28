import { useLanguage } from "@/lib/language";
import { useEffect, useRef, type ReactNode } from "react";

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { t, language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

export function SectionHead({ eyebrow, title, aside }: { eyebrow: string; title: string; aside?: string }) {
  const { t, language } = useLanguage();
  return (
    <div className="mb-10 grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-end">
      <div>
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 className="text-4xl md:text-5xl">{title}</h2>
      </div>
      {aside && <p className="text-muted-foreground md:text-right">{aside}</p>}
    </div>
  );
}
