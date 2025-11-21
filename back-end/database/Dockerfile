FROM mysql:latest

COPY schema.sql /docker-entrypoint-initdb.d/
# Temporary seed data for testing
# This should be removed in production
COPY seed_data.sql /docker-entrypoint-initdb.d/
