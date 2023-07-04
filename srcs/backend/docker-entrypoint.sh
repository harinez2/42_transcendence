#!/bin/sh

set -e

npm run db:migrate
npm run db:generate

exec "$@"
