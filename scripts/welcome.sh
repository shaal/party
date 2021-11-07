#!/bin/sh

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

BOLD=$(tput bold)
NORMAL=$(tput sgr0)

URL=$(eval "eval gp url 3000")

echo "👋 ${GREEN}${BOLD}Welcome to Devparty${NORMAL}${NC}\n"
echo "💻 ${BOLD}Commands:${NORMAL}\n"
awk -F':' '{printf "%s%s", $2, (/^Description/)?"\n":"\t\t\t"}' ./scripts/commands.txt
echo "\nDevelopment admin username: admin"
echo "Development admin password: admin\n"
echo "Visit: ${BLUE}${URL}${NC}"
