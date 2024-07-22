FROM node:18-alpine

RUN npm i -g @nestjs/cli

WORKDIR /var/www/html

COPY . .

RUN npm install

ENTRYPOINT [ "nest" ]