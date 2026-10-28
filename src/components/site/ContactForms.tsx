import { useLanguage } from "@/lib/language";
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
  const { t } = useLanguage();
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{t(error)}</span>}
    </label>
  );
}

// Hoy se envía por WhatsApp; para migrar a Lovable Cloud reemplace esta función.
function submitLead(msg: string, success: string) {
  window.open(waLink(msg), "_blank", "noopener");
  toast.success(success);
}

function BuyerForm() {
  const { t } = useLanguage();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof buyerSchema>>({ resolver: zodResolver(buyerSchema), defaultValues: { objetivo: "Vivir", presupuesto: "" } });
  return (
    <form className="flex flex-1 flex-col gap-4" onSubmit={handleSubmit((d) => {
      submitLead(`Hola Toto, soy ${d.nombre} (${d.celular}). Objetivo: ${d.objetivo}. Presupuesto: ${d.presupuesto}.${d.mensaje ? ` ${d.mensaje}` : ""}`, t("¡Listo! Abrimos WhatsApp con su mensaje para Toto."));
      reset();
    })}>
      <Field label={t("Nombre")} error={errors.nombre?.message ? t(errors.nombre.message) : undefined}><input className={inputCls} {...register("nombre")} /></Field>
      <Field label={t("Celular")} error={errors.celular?.message ? t(errors.celular.message) : undefined}><input className={inputCls} inputMode="tel" {...register("celular")} /></Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("Objetivo")}><select className={inputCls} {...register("objetivo")}><option value="Vivir">{t("Vivir")}</option><option value="Invertir">{t("Invertir")}</option><option value="Desarrollar">{t("Desarrollar")}</option></select></Field>
        <Field label={t("Presupuesto")} error={errors.presupuesto?.message ? t(errors.presupuesto.message) : undefined}>
          <select className={inputCls} {...register("presupuesto")}>
            <option value="">{t("Seleccione")}</option>
            <option value="Menos de $500 millones">{t("Menos de $500 millones")}</option><option value="$500 – $1.000 millones">{t("$500 – $1.000 millones")}</option>
            <option value="$1.000 – $2.000 millones">{t("$1.000 – $2.000 millones")}</option><option value="Más de $2.000 millones">{t("Más de $2.000 millones")}</option>
          </select>
        </Field>
      </div>
      <Field label={t("Mensaje")}><textarea rows={3} className={inputCls} {...register("mensaje")} /></Field>
      <Button type="submit" className="mt-auto w-full">{t("Enviar a Toto")}</Button>
    </form>
  );
}

function OwnerForm() {
  const { t } = useLanguage();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof ownerSchema>>({ resolver: zodResolver(ownerSchema), defaultValues: { tipo: "Lote" } });
  return (
    <form className="flex flex-1 flex-col gap-4" onSubmit={handleSubmit((d) => {
      submitLead(`Hola Toto, soy ${d.nombre} (${d.celular}). Quiero vender: ${d.tipo} en ${d.municipio}${d.area ? `, área aprox. ${d.area}` : ""}. Solicito avalúo.`, t("¡Listo! Abrimos WhatsApp con su mensaje para Toto."));
      reset();
    })}>
      <Field label={t("Nombre")} error={errors.nombre?.message ? t(errors.nombre.message) : undefined}><input className={inputCls} {...register("nombre")} /></Field>
      <Field label={t("Celular")} error={errors.celular?.message ? t(errors.celular.message) : undefined}><input className={inputCls} inputMode="tel" {...register("celular")} /></Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("Tipo")}><select className={inputCls} {...register("tipo")}><option value="Lote">{t("Lote")}</option><option value="Casa">{t("Casa")}</option><option value="Apartamento">{t("Apartamento")}</option><option value="Bodega">{t("Bodega")}</option></select></Field>
        <Field label={t("Municipio")} error={errors.municipio?.message ? t(errors.municipio.message) : undefined}><input className={inputCls} {...register("municipio")} /></Field>
      </div>
      <Field label={t("Área aproximada")}><input className={inputCls} placeholder={t("Ej. 3.000 m²")} {...register("area")} /></Field>
      <Button type="submit" variant="outline" className="mt-auto w-full">{t("Solicitar avalúo")}</Button>
    </form>
  );
}

export function ContactForms() {
  const { t } = useLanguage();
  return (
    <section id="contacto" className="py-24">
      <div className="container-site grid gap-6 lg:grid-cols-2">
        <Reveal className="flex flex-col border bg-card p-8">
          <p className="eyebrow mb-3">{t("Compradores")}</p>
          <h2 className="text-3xl md:text-4xl">{t("Cuénteme qué está buscando")}</h2>
          <p className="mb-8 mt-3 text-muted-foreground">{t("Le respondo personalmente por WhatsApp el mismo día.")}</p>
          <BuyerForm />
        </Reveal>
        <Reveal className="flex flex-col border bg-card p-8">
          <p className="eyebrow mb-3">{t("Propietarios")}</p>
          <h2 className="text-3xl md:text-4xl">{t("¿Quiere vender su propiedad?")}</h2>
          <p className="mb-8 mt-3 text-muted-foreground">{t("Avalúo comercial orientativo y estrategia de venta con fotos con dron y pauta digital.")}</p>
          <OwnerForm />
        </Reveal>
      </div>
    </section>
  );
}
