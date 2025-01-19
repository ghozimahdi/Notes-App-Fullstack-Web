#!/bin/bash

GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${GREEN}Installing root dependencies...${NC}"
npm install

echo -e "${GREEN}Installing frontend dependencies...${NC}"
cd frontend
npm install

echo -e "${GREEN}Installing backend dependencies...${NC}"
cd ../backend
npm install

echo -e "${GREEN}All dependencies installed successfully!${NC}"