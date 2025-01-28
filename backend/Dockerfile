# Tahap 1: Build Stage
FROM node:18-alpine AS builder

# Set ARG untuk build time variables
ARG NODE_ENV=production
ARG MONGODB_URI
ARG REDIS_HOST
ARG SESSION_SECRET

# Set environment variables
ENV NODE_ENV=$NODE_ENV
ENV MONGODB_URI=$MONGODB_URI
ENV REDIS_HOST=$REDIS_HOST
ENV SESSION_SECRET=$SESSION_SECRET

# Set working directory
WORKDIR /usr/src/app

# Copy dependencies untuk caching layer dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua file source code ke dalam container
COPY . .

# Build TypeScript jika mode production atau staging
RUN npm run build:$NODE_ENV

# Tahap 2: Production Stage
FROM node:18-alpine

ARG NODE_ENV=production
ARG MONGODB_URI
ARG REDIS_HOST
ARG SESSION_SECRET

# Set environment variables
ENV NODE_ENV=$NODE_ENV
ENV MONGODB_URI=$MONGODB_URI
ENV REDIS_HOST=$REDIS_HOST
ENV SESSION_SECRET=$SESSION_SECRET

# Set working directory
WORKDIR /usr/src/app

# Copy hanya hasil build dan dependencies production
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist

# Install hanya dependencies production
RUN npm install --only=production

# Expose port backend
EXPOSE 5000

# Jalankan aplikasi
CMD ["node", "dist/server.js"]