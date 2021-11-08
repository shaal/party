#!/bin/bash

yarn install --frozen-lockfile --silent --network-timeout 100000
gp sync-done yarn
cp .env.example .env
gp sync-done env
gp await-port 3306
yarn prisma:migrate
gp sync-done migrate
yarn prisma:seed
gp sync-done seed
yarn prisma:testseed
gp sync-done testseed
yarn prepare
gp sync-done prepare
