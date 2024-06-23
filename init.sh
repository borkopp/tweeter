#!/bin/bash

set -e

psql -v ON_ERROR_STOP=1 --username "borko" --dbname "tweeter" <<-EOSQL
    CREATE EXTENSION IF NOT EXISTS pgcrypto;
EOSQL