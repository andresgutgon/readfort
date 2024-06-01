#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    SELECT 'CREATE DATABASE readfort_development'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'readfort_development')\gexec
    SELECT 'CREATE DATABASE readfort_test'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'readfort_test')\gexec
EOSQL
