#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE readfort_development;
    CREATE DATABASE readfort_test;
EOSQL
