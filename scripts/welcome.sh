#!/bin/sh

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

BOLD=$(tput bold)
NORMAL=$(tput sgr0)

URL=$(eval "eval gp url 3000")

echo "\n👋 ${GREEN}${BOLD}Welcome to Devparty${NORMAL}${NC}\n"
echo "💻 ${BOLD}Commands:${NORMAL}\n"
awk -F':' '{printf "%s%s", $2, (/^Description/)?"\n":"\t\t"}' ./scripts/commands.txt
echo "\nDevelopment admin username: ${CYAN}${BOLD}admin${NORMAL}${NC}"
echo "Development admin password: ${CYAN}${BOLD}admin${NORMAL}${NC}\n"
echo "Visit: ${BLUE}${URL}${NC}\n"
echo "${PURPLE}${BOLD}Happy coding${NORMAL}${NC} 😍\n"
