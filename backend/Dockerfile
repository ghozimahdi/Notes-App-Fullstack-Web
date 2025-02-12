# ==============================
# Tahap 1: Build Stage
# ==============================
FROM node:20-alpine AS builder

# Set ARG untuk build time variables
ARG NODE_ENV=production

# Set environment variables
ENV NODE_ENV=$NODE_ENV

# Set working directory
WORKDIR /usr/src/app

# Copy package.json dan package-lock.json untuk caching dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua file source code ke dalam container
COPY . .

# Build TypeScript jika mode production atau staging
RUN npm run build:$NODE_ENV

# ==============================
# Tahap 2: Production Stage
# ==============================
FROM node:20-alpine

ARG NODE_ENV=production

# Set environment variables
ENV NODE_ENV=$NODE_ENV

# Set working directory
WORKDIR /usr/src/app

# Copy hanya hasil build dan dependencies production
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# Expose port backend
EXPOSE 5000

# Jalankan aplikasi
CMD ["node", "dist/server.js"]