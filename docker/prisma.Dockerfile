FROM node:18-alpine

WORKDIR /var/www/html

COPY . .

RUN npm install

RUN npm install prisma --save-dev

ENTRYPOINT [ "npx", "prisma" ]