FROM nginx:stable-alpine

# Copy custom nginx config
COPY nginx.prod.conf /etc/nginx/conf.d/default.conf

# Copy SSL certificates (opsional jika certbot sudah menghasilkannya)
COPY certbot/conf /etc/letsencrypt
COPY certbot/www /var/www/certbot

# Set permissions (opsional, jika butuh)
RUN chmod -R 755 /etc/letsencrypt /var/www/certbot

# Expose ports
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]