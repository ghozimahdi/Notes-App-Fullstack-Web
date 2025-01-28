# Tahap 1: Build Stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /usr/src/app

# Salin file konfigurasi package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh source code ke container
COPY . .

# Build aplikasi sesuai mode environment
# Gunakan ARG untuk menentukan environment mode
ARG NODE_ENV=production
RUN npm run build:$NODE_ENV

# Tahap 2: Production Stage
FROM nginx:stable-alpine

# Salin hasil build dari tahap sebelumnya
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Expose port untuk Nginx
EXPOSE 80

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]