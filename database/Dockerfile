FROM postgres:latest

COPY ./sql/users.sql /docker-entrypoint-initdb.d/

ENV POSTGRES_USER=borko
ENV POSTGRES_PASSWORD=borko
ENV POSTGRES_DB=tweeter
