#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

BOLD=$(tput bold)
NORMAL=$(tput sgr0)

clear

echo -e "\n✅ ${GREEN}${BOLD}VS Code is ready${NORMAL}${NC}"

if [ "$(eval "gp sync-await yarn")" == "yarn done" ]; then
    echo -e "✅ ${GREEN}${BOLD}Installed yarn dependencies${NORMAL}${NC}"
else
    echo "Hello"
fi

if [ "$(eval "gp sync-await env")" == "env done" ]; then
    echo -e "✅ ${GREEN}${BOLD}Global environment variable setup done${NORMAL}${NC}"
fi

if [ "$(eval "gp sync-await migrate")" == "migrate done" ]; then
    echo -e "✅ ${GREEN}${BOLD}Database migration is completed${NORMAL}${NC}"
fi

if [ "$(eval "gp sync-await seed")" == "seed done" ]; then
    echo -e "✅ ${GREEN}${BOLD}Database seeding is completed${NORMAL}${NC}"
fi

if [ "$(eval "gp sync-await testseed")" == "testseed done" ]; then
    echo -e "✅ ${GREEN}${BOLD}Database test seeding is completed${NORMAL}${NC}"
fi

if [ "$(eval "gp sync-await prepare")" == "prepare done" ]; then
    echo -e "✅ ${GREEN}${BOLD}Final preparation done${NORMAL}${NC}"
fi

if [ "$(eval "gp sync-await redis")" == "redis done" ]; then
    echo -e "✅ ${GREEN}${BOLD}Redis server started${NORMAL}${NC}"
fi

if [ "$(eval "gp sync-await codegen")" == "codegen done" ]; then
    echo -e "✅ ${GREEN}${BOLD}GraphQL Codegen server started${NORMAL}${NC}"
fi

if [ "$(eval "gp await-port 3000")" == "Awaiting port 3000... ok" ]; then
    echo -e "✅ ${GREEN}${BOLD}Development server started${NORMAL}${NC}"
fi

URL=$(eval "eval gp url 3000")

curl -s "$URL/api/graphql?warmup=true" > /dev/null
echo -e "✅ ${GREEN}${BOLD}GraphQL Server warmed up${NORMAL}${NC}"

echo -e "\n👋 ${GREEN}${BOLD}Welcome to Devparty${NORMAL}${NC}\n"
echo -e "💻 ${BOLD}Commands:${NORMAL}\n"
awk -F':' '{printf "%s%s", $2, (/^Description/)?"\n":"\t\t"}' ./scripts/commands.txt
echo -e "\nAdmin username: ${CYAN}${BOLD}admin${NORMAL}${NC}"
echo -e "Admin password: ${CYAN}${BOLD}admin${NORMAL}${NC}\n"
echo -e "Visit: ${BLUE}${URL}${NC}\n"
echo -e "${PURPLE}${BOLD}Happy coding${NORMAL}${NC} 😍\n"
