FROM node:lts-alpine

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

COPY vite.config.js ./vite.config.js

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host"]
