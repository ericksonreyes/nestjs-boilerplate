FROM node:18-alpine

RUN npm install jest --global

WORKDIR /var/www/html

COPY . .

RUN npm install

ENTRYPOINT [ "npm" ]