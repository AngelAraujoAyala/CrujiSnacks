# === PASO 1: Dependencias y Compilación ===
FROM node:22-alpine AS builder
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependencias y generar el cliente de Prisma
RUN npm ci
RUN npx prisma generate

# Copiar el resto del código y compilar NestJS
COPY . .
RUN npm run build

# Eliminar dependencias de desarrollo para dejar solo las de producción
RUN npm prune --production

# === PASO 2: Entorno de Ejecución Ligero ===
FROM node:22-alpine AS runner
WORKDIR /app

# Copiar solo lo estrictamente necesario desde el paso anterior
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Exponer el puerto que usará NestJS
EXPOSE 3000

# Comando para arrancar la aplicación en producción
CMD ["node", "dist/src/main"]