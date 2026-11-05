# --- Fase de Compilación ---
FROM oven/bun:1.4 AS build
WORKDIR /app

COPY package.json bun.lock bunfig.toml ./
RUN bun install --frozen-lockfile

COPY . .
ENV NITRO_PRESET=node-server
RUN bun run build

# --- Fase de Ejecución (Servidor Node) ---
FROM node:22-alpine
WORKDIR /app

COPY --from=build /app/.output ./.output
ENV NODE_ENV=production HOST=0.0.0.0 PORT=3000
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
