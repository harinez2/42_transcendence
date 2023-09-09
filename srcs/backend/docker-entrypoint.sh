#!/bin/sh

set -e

npm run db:deploy
npm run db:generate
npm run db:seed

exec "$@"
