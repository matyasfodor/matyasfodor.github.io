#!/bin/sh

set -eu

if [ ! -f .env.local ]; then
  echo "Missing .env.local. Create it with: cp .env.example .env.local"
  exit 1
fi

cleanup() {
  docker compose down
}

trap cleanup EXIT INT TERM

docker compose up -d --wait --remove-orphans

export UPSTASH_REDIS_REST_REDIS_URL=redis://localhost:6379

npm run dev
