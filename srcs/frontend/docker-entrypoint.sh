#!/bin/sh

set -e

if [ ! -d "./.next" ]; then
  npm run build
fi

exec "$@"
