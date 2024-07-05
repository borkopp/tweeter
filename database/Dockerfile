FROM postgres:latest

COPY ./sql/users.sql /docker-entrypoint-initdb.d/
COPY ./init.sh /docker-entrypoint-initdb.d/init.sh

ENV POSTGRES_USER=borko
ENV POSTGRES_PASSWORD=borko
ENV POSTGRES_DB=tweeter