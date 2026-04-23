FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM caddy:alpine

# The upstream image grants caddy cap_net_bind_service so it can bind low ports.
# Kubernetes runs this container with no privilege escalation, so remove the
# file capability and serve on 8080 instead.
RUN setcap -r /usr/bin/caddy

COPY --from=build /app/dist /srv
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 8080
