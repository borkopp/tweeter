#!/bin/bash

# Create root .env file
cat << EOF > .env
POSTGRES_USER=borko
POSTGRES_PASSWORD=borko
POSTGRES_DB=tweeter
DB_HOST=database
DB_PORT=5432
PORT=4000
EOF

echo "Root .env file created successfully!"

# Create backend .env file
mkdir -p backend
cat << EOF > backend/.env
DB_USER=borko
DB_HOST=database
DB_NAME=tweeter
DB_PASSWORD=borko
DB_PORT=5432
PORT=4000
EOF

echo "Backend .env file created successfully!"