# ── Stage 1: build the Vite frontend ─────────────────────────────────────────
FROM node:22-alpine AS build-frontend
WORKDIR /app
COPY app/package*.json ./
RUN npm ci
COPY app/ ./
RUN npm run build

# ── Stage 2: install server production deps ──────────────────────────────────
FROM node:22-alpine AS server-deps
WORKDIR /server
COPY server/package*.json ./
RUN npm install --omit=dev

# ── Stage 3: runtime — Node serves the API and the built frontend ────────────
FROM node:22-alpine AS runtime
WORKDIR /srv

ENV NODE_ENV=production
ENV PORT=8080

COPY server/ ./server/
COPY --from=server-deps /server/node_modules ./server/node_modules
COPY --from=build-frontend /app/dist ./public

EXPOSE 8080

CMD ["node", "server/index.js"]
