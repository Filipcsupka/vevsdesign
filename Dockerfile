FROM caddy:alpine

# The upstream image grants caddy cap_net_bind_service so it can bind low ports.
# Kubernetes runs this container with no privilege escalation, so remove the
# file capability and serve on 8080 instead.
RUN setcap -r /usr/bin/caddy

# Copy site files
COPY preview.html /srv/preview.html
COPY logo.png /srv/logo.png
COPY images/ /srv/images/

# Copy Caddy config
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 8080
