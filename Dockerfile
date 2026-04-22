FROM caddy:alpine

# Copy site files
COPY preview.html /srv/preview.html
COPY ["Feminine Floral wedding studio logo.png", "/srv/Feminine Floral wedding studio logo.png"]
COPY images/ /srv/images/

# Copy Caddy config
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 8080
