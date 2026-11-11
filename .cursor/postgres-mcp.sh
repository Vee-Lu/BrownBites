#!/bin/sh
# Starts the BrownBites Postgres MCP server using DATABASE_URL from server/.env.
set -eu

ROOT="$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)"

set -a
# shellcheck disable=SC1091
. "$ROOT/server/.env"
set +a

if [ -z "${DATABASE_URL:-}" ]; then
  echo "DATABASE_URL is missing from server/.env" >&2
  exit 1
fi

exec npx -y @bytebase/dbhub@latest --transport stdio --config "$ROOT/.cursor/dbhub.toml"
