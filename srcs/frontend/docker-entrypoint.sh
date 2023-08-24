#!/bin/sh

set -e

if [ ! -d "./app/.next" ]; then
  npm run build
fi

exec "$@"
