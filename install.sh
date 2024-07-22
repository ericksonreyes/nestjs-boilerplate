#!/bin/sh
green='\e[1;32m%s\e[0m\n'

set -e

clear
printf "$green" "#############################################################################"
printf "$green" "# "
printf "$green" "# NestJS Prisma Installer."
printf "$green" "# "
printf "$green" "# Do you want to install NestJS Prisma in your computer? [Y/n]?"
printf "$green" "# "
printf "$green" "#############################################################################"
read -p "" choice

if [ "$choice" = "Y" ]; then

  printf "$green" "#######################################################################"
  printf "$green" "# "
  printf "$green" "# Do you want a fresh installation? [Y/n]"
  printf "$green" "# "
  printf "$green" "# This will:"
  printf "$green" "# 1. Delete node_modules/ folder."
  printf "$green" "# 2. Delete the existing database."
  printf "$green" "# "
  printf "$green" "#######################################################################"
  read -p "" fresh_installation

  echo ""
  echo ""
  printf "$green" "#########################################################################"
  printf "$green" "# "
  printf "$green" "# [1/7] Copying default configuration files "
  printf "$green" "# "

  if [[ ! -f .env ]]; then
    cp .env.docker .env
    printf "$green" "# Copied .env"
  else
    printf "$green" "# File .env already exists."
  fi

  if [[ ! -f docker-compose.yml ]]; then
    cp docker-compose.yml.dist docker-compose.yml
    printf "$green" "# Copied docker-compose.yml"
  else
    printf "$green" "# File docker-compose.yml already exists."
  fi

  printf "$green" "# "
  printf "$green" "#########################################################################"


  echo ""
  echo ""
  printf "$green" "#########################################################################"
  printf "$green" "# "
  printf "$green" "# [2/7] Shut down existing NestJS Prisma containers."
  printf "$green" "# "
  printf "$green" "#########################################################################"

  if [ "$fresh_installation" = "Y" ]; then
    docker-compose down -v
  else
    docker-compose down
  fi

  echo ""
  echo ""
  if [ "$fresh_installation" = "Y" ]; then
    printf "$green" "#########################################################################"
    printf "$green" "# "
    printf "$green" "# [3/7] Delete node_modules/ folder."
    printf "$green" "# "
    printf "$green" "#########################################################################"
    rm -Rf node_modules/
  else
    printf "$green" "#########################################################################"
    printf "$green" "# "
    printf "$green" "# [3/7] Delete node_modules/ folder. Skipped"
    printf "$green" "# "
    printf "$green" "#########################################################################"
  fi

  echo ""
  echo ""
  printf "$green" "#########################################################################"
  printf "$green" "# "
  printf "$green" "# [4/7] Build docker images."
  printf "$green" "# "
  printf "$green" "#########################################################################"
  docker-compose build

  echo ""
  echo ""
  printf "$green" "#########################################################################"
  printf "$green" "# "
  printf "$green" "# [5/7] Start new NestJS Prisma containers as daemons."
  printf "$green" "# "
  printf "$green" "#########################################################################"
  docker-compose up -d app

  echo ""
  echo ""
  if [[ ! -f package.json ]]; then
    printf "$green" "#########################################################################"
    printf "$green" "# "
    printf "$green" "# [6/7] Install Javascript libraries. Skipped. Missing package.json file."
    printf "$green" "# "
    printf "$green" "#########################################################################"
  else
    printf "$green" "#########################################################################"
    printf "$green" "# "
    printf "$green" "# [6/7] Install Javascript libraries."
    printf "$green" "# "
    printf "$green" "#########################################################################"
    docker-compose run --rm npm install
    docker-compose run --rm prisma generate
  fi

  echo ""
  echo ""
  printf "$green" "#########################################################################"
  printf "$green" "# "
  printf "$green" "# [7/7] Initialize database."
  printf "$green" "# "
  printf "$green" "#########################################################################"
  docker-compose run --rm prisma migrate dev
  docker-compose run --rm prisma db seed

  echo ""
  echo ""
  printf "$green" "#########################################################################"
  printf "$green" "# "
  printf "$green" "# NestJS Prisma installed!"
  printf "$green" "# "
  printf "$green" "#########################################################################"

fi
