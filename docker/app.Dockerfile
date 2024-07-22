FROM node:18-alpine

RUN npm i -g @nestjs/cli

RUN npm i -g jest

WORKDIR /var/www/html

COPY . .

RUN npm install

RUN npx prisma generate

RUN npm run build

CMD ["npm", "run", "start:dev"]

EXPOSE 3000

