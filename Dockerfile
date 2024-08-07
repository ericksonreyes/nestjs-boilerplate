FROM node:18-alpine

RUN npm i -g @nestjs/cli

WORKDIR /var/www/html

COPY . .

RUN npm install

RUN npm run build

RUN npx prisma generate

CMD ["npm", "run", "start:prod"]

EXPOSE 3000

