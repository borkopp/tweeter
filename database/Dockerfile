FROM postgres:latest

COPY sql /docker-entrypoint-initdb.d/sql
COPY ./init.sh /docker-entrypoint-initdb.d/init.sh

ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
ENV POSTGRES_DB=${POSTGRES_DB}