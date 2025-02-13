#!/bin/bash

# ==============================================================
# 🚀 Docker Compose Management Script
# 📌 Supports: Dev, Staging, Production
# 📌 Auto Restart, SSL Auto Renew Setup
# ==============================================================

# 📌 Restart All Environments Before Running New Instances
echo "🔄 Restarting all Docker services..."
docker-compose -f docker-compose.yml -f docker-compose.nginx.yml -f docker-compose.dev.yml -f docker-compose.staging.yml -f docker-compose.prod.yml down

# ==============================================================
# 🔹 Start Environments
# ==============================================================

echo "🚀 Starting Dev Environment..."
docker-compose -f docker-compose.yml -f docker-compose.nginx.yml -f docker-compose.dev.yml up -d --build

echo "🚀 Starting Staging Environment..."
docker-compose -f docker-compose.yml -f docker-compose.nginx.yml -f docker-compose.staging.yml up -d --build

echo "🚀 Starting Production Environment..."
docker-compose -f docker-compose.yml -f docker-compose.nginx.yml -f docker-compose.prod.yml up -d --build

# ==============================================================
# 🔒 Setup Auto Renew SSL (Manual Configuration Required)
# ==============================================================

echo "🔐 Setting up SSL auto-renew task..."
echo "Let's Encrypt SSL certificates expire every 90 days."
echo "Ensure the auto-renewal process is set up correctly."

# Check if SSL certificate exists
if [ -d "./certbot/conf/live" ]; then
    echo "✅ SSL certificate exists. Proceeding with auto-renew setup."
else
    echo "⚠️ No SSL certificate found! Run Certbot manually before enabling auto-renew."
    echo "Run the following command:"
    echo ""
    echo "docker-compose -f docker-compose.nginx.yml run certbot certonly --webroot --webroot-path=/var/www/certbot --email admin@example.com --agree-tos --no-eff-email --force-renewal -d gm.gamechanger.my.id"
    exit 1
fi

echo "📌 Open crontab manually: sudo crontab -e"
echo "📌 Add the following line at the bottom to auto-renew SSL:"
echo ""
echo "0 3 * * * docker-compose -f /path/to/docker-compose.nginx.yml run certbot renew && docker-compose -f /path/to/docker-compose.nginx.yml restart nginx"
echo ""
echo "🔹 Replace '/path/to/' with the actual location of 'docker-compose.nginx.yml'."