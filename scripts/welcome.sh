#!/bin/sh

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

URL=$(eval "eval gp url 3000")

echo "👋 ${GREEN}Welcome to Devparty${NC}\n"
echo "Visit: ${BLUE}${URL}${NC}"
