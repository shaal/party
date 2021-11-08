#!/bin/sh

yarn install --frozen-lockfile --silent --network-timeout 100000
cp .env.example .env
gp await-port 3306
yarn prisma:migrate
yarn prisma:seed
yarn prisma:testseed
yarn prepare
