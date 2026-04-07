#!/bin/bash
# Deploy vevsdesign to Hetzner server
# Usage:
#   First time:  ./deploy.sh YOUR_SERVER_IP --init
#   Updates:     ./deploy.sh YOUR_SERVER_IP

SERVER_IP="${1:?Usage: ./deploy.sh SERVER_IP [--init]}"
INIT="${2:-}"
REMOTE_DIR="/opt/vevsdesign"
SSH="ssh root@$SERVER_IP"

echo ">>> Uploading files to $SERVER_IP..."
ssh root@$SERVER_IP "mkdir -p $REMOTE_DIR"
scp -r \
  preview.html \
  "Feminine Floral wedding studio logo.png" \
  Dockerfile \
  docker-compose.yml \
  nginx.conf \
  .dockerignore \
  init-letsencrypt.sh \
  root@$SERVER_IP:$REMOTE_DIR/

if [ "$INIT" = "--init" ]; then
  echo ">>> First-time setup: installing Docker and getting SSL cert..."
  $SSH bash -s << 'ENDSSH'
    set -e
    apt-get update -q
    apt-get install -y -q docker.io docker-compose-plugin
    systemctl enable docker
    systemctl start docker
    cd /opt/vevsdesign
    chmod +x init-letsencrypt.sh
    ./init-letsencrypt.sh
ENDSSH
else
  echo ">>> Rebuilding and restarting containers..."
  $SSH "cd $REMOTE_DIR && docker compose up --build -d"
fi

echo ""
echo "Done!"
