# Despliegue — Toto Partner Inmobiliario

Guía para alojar este sitio en un servidor propio con un contenedor (Docker).

## Stack

- **TanStack Start v1** (React 19, SSR) + **Vite 8** + **Tailwind CSS v4**.
- Build de servidor con **Nitro**. Por defecto, la configuración de Lovable compila para **Cloudflare Workers**; para un contenedor hay que compilar con el preset `node-server` (ver abajo).
- Sin base de datos, sin backend propio, sin autenticación. Todo el contenido (propiedades, textos, precios) está en `src/data/*.ts`, y las fotos y fichas PDF en `public/`.

## 1. Versiones requeridas

| Herramienta | Versión |
|---|---|
| Bun (gestor de paquetes, recomendado; el proyecto usa `bun.lock`) | **1.2+** (probado con 1.4.4) |
| Node.js (para ejecutar el servidor compilado) | **22 LTS** (mínimo 20.19, requisito de Vite 8) |

> Usa `bun install` para respetar `bun.lock`. Con npm se generaría otro lockfile y las versiones podrían variar.

## 2. Instalar, compilar y ejecutar

### Local (desarrollo)

```bash
bun install
bun run dev          # http://localhost:8080 (o el puerto que indique Vite)
bun run test         # pruebas (vitest)
```

### Producción (servidor Node)

```bash
bun install --frozen-lockfile
NITRO_PRESET=node-server bun run build
PORT=3000 HOST=0.0.0.0 node .output/server/index.mjs
```

- Salida del build: `.output/` (`.output/server/index.mjs` = servidor SSR, `.output/public/` = estáticos, incluye `public/images` y `public/fichas`).
- Solo hace falta copiar `.output/` al contenedor final; no necesita `node_modules`.
- Comprueba tras compilar que existe `.output/server/index.mjs`. Si el build sigue generando la salida de Cloudflare, ver la sección 4.

### Dockerfile de referencia

```dockerfile
# --- build ---
FROM oven/bun:1.2 AS build
WORKDIR /app
COPY package.json bun.lock bunfig.toml ./
RUN bun install --frozen-lockfile
COPY . .
ENV NITRO_PRESET=node-server
RUN bun run build

# --- runtime ---
FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/.output ./.output
ENV NODE_ENV=production HOST=0.0.0.0 PORT=3000
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
```

```bash
docker build -t toto-partner .
docker run -p 3000:3000 toto-partner
```

Pon delante un proxy inverso (Nginx, Caddy, Traefik) para HTTPS y el dominio.

## 3. Variables de entorno y servicios externos

**No hay variables de entorno obligatorias** ni archivo `.env`. Solo las del servidor Node:

| Variable | Uso | Valor por defecto |
|---|---|---|
| `NITRO_PRESET` | Solo en build: destino de compilación | Cloudflare (poner `node-server`) |
| `PORT` | Puerto del servidor | `3000` |
| `HOST` | Interfaz de escucha | poner `0.0.0.0` en contenedores |

Servicios externos que usa el sitio:

| Servicio | Para qué | Dónde se configura |
|---|---|---|
| **Formspree** (`https://formspree.io/f/mqppbrdy`) | Envío de los dos formularios de contacto al correo del propietario | `src/lib/contact-delivery.ts` (constante `endpoint`, escrita en el código, no en variable de entorno). Los correos destino y antispam se gestionan en la cuenta de Formspree. Si cambia el dominio, añádelo en Formspree → Settings → allowed domains si está restringido. |
| **WhatsApp** (`wa.me`) | Botón flotante, “Preguntar por WhatsApp”, pedir ficha | Número y enlace en `src/data/properties.ts` / componentes en `src/components/site/` |
| **Google Fonts** | Tipografías Playfair Display, Figtree, JetBrains Mono | `<link>` en `src/routes/__root.tsx` |
| **Instagram** | Enlace al perfil en el pie de página | `src/components/site/Sections.tsx` |
| Almacenamiento del navegador (`localStorage`) | Recordar idioma EN/ESP | `src/lib/language.tsx` |

**No usa**: base de datos, almacenamiento en la nube, analítica, autenticación ni pagos. Las fotos de propiedades (`public/images/<slug>/`) y las fichas PDF (`public/fichas/<slug>.pdf`) se sirven como archivos estáticos.

## 4. Dependencias de la plataforma Lovable a reemplazar

1. **`@lovable.dev/vite-tanstack-config`** (en `vite.config.ts`): envuelve la configuración de Vite (plugins TanStack Start, React, Tailwind, alias `@`, Nitro con destino Cloudflare). Funciona fuera de Lovable; basta con `NITRO_PRESET=node-server`. Si el preset no se respeta, sustitúyelo por un `vite.config.ts` estándar:

   ```ts
   import { defineConfig } from "vite";
   import { tanstackStart } from "@tanstack/react-start/plugin/vite";
   import { nitro } from "nitro/vite";
   import viteReact from "@vitejs/plugin-react";
   import tailwindcss from "@tailwindcss/vite";
   import tsConfigPaths from "vite-tsconfig-paths";

   export default defineConfig({
     plugins: [
       tsConfigPaths(),
       tailwindcss(),
       tanstackStart({ server: { entry: "server" } }),
       nitro({ preset: "node-server" }),
       viteReact(),
     ],
   });
   ```

2. **Imágenes alojadas en el CDN de Lovable** (archivos `*.asset.json`). Estas imágenes apuntan a rutas `/__l5e/assets-v1/...` que **solo existen en el hosting de Lovable** y darán 404 en otro servidor:
   - `src/assets/toto-logo-compact.jpg.asset.json` → logo del encabezado (`src/components/site/Header.tsx`)
   - `src/assets/toto.jpg.asset.json` → foto de Toto en “Sobre Toto” y en la tarjeta del asesor (`src/data/images.ts`)
   - `src/assets/toto-logo-original.png.asset.json` → no se importa actualmente

   **Reemplazo:** descarga cada imagen desde el sitio publicado (`https://screenshot-to-webcraft-34.lovable.app` + el campo `url` del JSON) antes de migrar, guárdala en `src/assets/` (p. ej. `toto.jpg`, `toto-logo-compact.jpg`) y cambia el import por la imagen local, por ejemplo `import toto from "@/assets/toto.jpg";`, usando ese valor donde antes se usaba `totoAsset.url`.

3. **`src/lib/lovable-error-reporting.ts`**: envía errores a `window.__lovableEvents`, que solo existe dentro del editor de Lovable. Fuera de Lovable no hace nada (es seguro dejarlo); opcionalmente reemplázalo por Sentry u otro servicio.

4. **Dominio y HTTPS**: en Lovable los gestiona la plataforma; en tu servidor configúralos en el proxy inverso. El favicon (`public/favicon.png`) y las demás imágenes de `src/assets/*.jpg` ya son locales y no requieren cambios.
