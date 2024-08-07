FROM node:18-alpine

RUN npm i -g @nestjs/cli

WORKDIR /var/www/html

COPY . .

RUN npm install

RUN npx prisma generate

CMD ["npm", "run", "start:dev"]

EXPOSE 3000

