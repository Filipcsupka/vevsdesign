#!/bin/bash
# Run this ONCE on the server after DNS is pointed to your IP.
# Usage: ./init-letsencrypt.sh

DOMAIN="vevsdesign.sk"
EMAIL="veronika.csupkova@gmail.com"   # <-- change if needed

set -e

echo ">>> Starting nginx (HTTP only) to serve ACME challenge..."
docker compose up -d web

echo ">>> Requesting Let's Encrypt certificate..."
docker compose run --rm certbot \
  certonly \
  --webroot \
  -w /var/www/certbot \
  --email "$EMAIL" \
  -d "$DOMAIN" \
  -d "www.$DOMAIN" \
  --agree-tos \
  --no-eff-email

echo ">>> Reloading nginx with SSL config..."
docker compose exec web nginx -s reload

echo ""
echo "Done! Site is live at https://$DOMAIN"
echo "Certbot will auto-renew every 12h."
