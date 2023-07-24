FROM postgres:15.3-alpine3.17

HEALTHCHECK \
  --interval=2s \
  --timeout=5s \
  --retries=5 \
  CMD pg_isready -U "${POSTGRES_USER:-postgres}" -d "${POSTGRES_DB:-postgres}" || exit 1
