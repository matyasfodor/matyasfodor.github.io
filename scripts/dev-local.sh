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

docker compose up -d --wait

export UPSTASH_REDIS_REST_URL=http://localhost:8079
export UPSTASH_REDIS_REST_TOKEN=local-dev-token

npm run dev
