FROM postgres:latest

# Add the initialization SQL script
COPY ./sql/users.sql /docker-entrypoint-initdb.d/

# Set environment variables for PostgreSQL
ENV POSTGRES_USER=borko
ENV POSTGRES_PASSWORD=borko
ENV POSTGRES_DB=tweeter
