FROM postgres:16.0-alpine3.18

HEALTHCHECK \
  --interval=2s \
  --timeout=5s \
  --retries=5 \
  CMD pg_isready -U "${POSTGRES_USER:-postgres}" -d "${POSTGRES_DB:-postgres}" || exit 1
