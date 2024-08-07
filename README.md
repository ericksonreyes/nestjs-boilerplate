<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

---
# Using docker-compose.yml and bash installation script

## Installation
```bash
# Execute in the root directory
$ sh install.sh
```

## Using the docker utility containers
```bash
# NPM
$ docker-compose run --rm npm <command>

# Nest CLI
$ docker-compose run --rm nest <command>

$ Prisma CLI
$ docker-compose run --rm prisma <command>
```

## Navigating the containers when installed used the installation script and ran using docker-compose.yml
- NestJS REST API - [http://localhost:3000](http://localhost:3000)
- [Adminer PostgreSQL Admin](https://www.adminer.org) - [http://localhost:8080](http://localhost:8080)
- NestJS REST API Swagger Documentation - [http://localhost:8000/swagger]

## Customizing exposed ports.
You can customize the exposed ports to prevent it from conflicting with other running containers or services. 
So that you can use multiple instances of the service but on different ports. 
Just modify the following entries in the `.env` file.

```dotenv
# PostgreSQL
DOCKER_POSTGRESQL_PUBLIC_PORT=5432

# Adminer
DOCKER_ADMINER_PUBLIC_PORT=8080

# NestJS REST API
DOCKER_APPLICATION_PUBLIC_PORT=8000
```
Then restart the docker services (if running).
```bash
$ docker-compose down
$ docker-compose up -d app
```

## Customizing docker container names
If you want to customize your container names. For example, renaming a container
from `nestjs-prisma-postgresql` to `awesome-app-postgresql`.
```dotenv
# DOCKER_CONTAINER_PREFIX=nestjs-prisma
DOCKER_CONTAINER_PREFIX=awesome-app
```
Then restart the docker services (if running).
```bash
$ docker-compose down
$ docker-compose up -d app
```

## Customizing docker network name
If you want to customize your container network name. For example, renaming the network 
name from `nestjs-prisma-postgresql` to `awesome-app-postgresql`.
```dotenv
# DOCKER_NETWORK_NAME=nestjs-prisma-network
DOCKER_NETWORK_NAME=nestjs-prisma-network
```
Then restart the docker services (if running).
```bash
$ docker-compose down
$ docker-compose up -d app
```