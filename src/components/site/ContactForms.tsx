import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { whatsappLink as waLink } from "@/data/properties";
import { Reveal } from "./Reveal";

const phone = z.string().trim().regex(/^[0-9 +]{7,15}$/, "Celular inválido");
const buyerSchema = z.object({
  nombre: z.string().trim().min(2, "Escriba su nombre").max(80),
  celular: phone,
  objetivo: z.enum(["Vivir", "Invertir", "Desarrollar"]),
  presupuesto: z.string().min(1, "Seleccione un rango"),
  mensaje: z.string().trim().max(800).optional(),
});
const ownerSchema = z.object({
  nombre: z.string().trim().min(2, "Escriba su nombre").max(80),
  celular: phone,
  tipo: z.enum(["Lote", "Casa", "Apartamento", "Bodega"]),
  municipio: z.string().trim().min(2, "Indique el municipio").max(60),
  area: z.string().trim().max(40).optional(),
});

const inputCls = "mt-1 w-full rounded-sm border bg-field px-3 py-2.5 text-sm focus:border-gold focus:outline-none";

function Field({ label, error, children }: { label: string; error?: string | undefined; children: ReactNode }) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

// Hoy se envía por WhatsApp; para migrar a Lovable Cloud reemplace esta función.
function submitLead(msg: string) {
  window.open(waLink(msg), "_blank", "noopener");
  toast.success("¡Listo! Abrimos WhatsApp con su mensaje para Toto.");
}

function BuyerForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof buyerSchema>>({ resolver: zodResolver(buyerSchema), defaultValues: { objetivo: "Vivir", presupuesto: "" } });
  return (
    <form className="space-y-4" onSubmit={handleSubmit((d) => {
      submitLead(`Hola Toto, soy ${d.nombre} (${d.celular}). Objetivo: ${d.objetivo}. Presupuesto: ${d.presupuesto}.${d.mensaje ? ` ${d.mensaje}` : ""}`);
      reset();
    })}>
      <Field label="Nombre" error={errors.nombre?.message}><input className={inputCls} {...register("nombre")} /></Field>
      <Field label="Celular" error={errors.celular?.message}><input className={inputCls} inputMode="tel" {...register("celular")} /></Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Objetivo"><select className={inputCls} {...register("objetivo")}><option>Vivir</option><option>Invertir</option><option>Desarrollar</option></select></Field>
        <Field label="Presupuesto" error={errors.presupuesto?.message}>
          <select className={inputCls} {...register("presupuesto")}>
            <option value="">Seleccione</option>
            <option>Menos de $500 millones</option><option>$500 – $1.000 millones</option>
            <option>$1.000 – $2.000 millones</option><option>Más de $2.000 millones</option>
          </select>
        </Field>
      </div>
      <Field label="Mensaje"><textarea rows={3} className={inputCls} {...register("mensaje")} /></Field>
      <Button type="submit" className="w-full">Enviar a Toto</Button>
    </form>
  );
}

function OwnerForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof ownerSchema>>({ resolver: zodResolver(ownerSchema), defaultValues: { tipo: "Lote" } });
  return (
    <form className="space-y-4" onSubmit={handleSubmit((d) => {
      submitLead(`Hola Toto, soy ${d.nombre} (${d.celular}). Quiero vender: ${d.tipo} en ${d.municipio}${d.area ? `, área aprox. ${d.area}` : ""}. Solicito avalúo.`);
      reset();
    })}>
      <Field label="Nombre" error={errors.nombre?.message}><input className={inputCls} {...register("nombre")} /></Field>
      <Field label="Celular" error={errors.celular?.message}><input className={inputCls} inputMode="tel" {...register("celular")} /></Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Tipo"><select className={inputCls} {...register("tipo")}><option>Lote</option><option>Casa</option><option>Apartamento</option><option>Bodega</option></select></Field>
        <Field label="Municipio" error={errors.municipio?.message}><input className={inputCls} {...register("municipio")} /></Field>
      </div>
      <Field label="Área aproximada"><input className={inputCls} placeholder="Ej. 3.000 m²" {...register("area")} /></Field>
      <Button type="submit" variant="outline" className="w-full">Solicitar avalúo</Button>
    </form>
  );
}

export function ContactForms() {
  return (
    <section id="contacto" className="py-24">
      <div className="container-site grid gap-6 lg:grid-cols-2">
        <Reveal className="border bg-card p-8">
          <p className="eyebrow mb-3">Compradores</p>
          <h2 className="text-3xl md:text-4xl">Cuénteme qué está buscando</h2>
          <p className="mb-8 mt-3 text-muted-foreground">Le respondo personalmente por WhatsApp el mismo día.</p>
          <BuyerForm />
        </Reveal>
        <Reveal className="border bg-card p-8">
          <p className="eyebrow mb-3">Propietarios</p>
          <h2 className="text-3xl md:text-4xl">¿Quiere vender su propiedad?</h2>
          <p className="mb-8 mt-3 text-muted-foreground">Avalúo comercial orientativo y estrategia de venta con fotos con dron y pauta digital.</p>
          <OwnerForm />
        </Reveal>
      </div>
    </section>
  );
}
