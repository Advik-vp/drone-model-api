#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚁 Drone Model API - Quick Start Script${NC}\n"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+ first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js version: $(node --version)${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ npm version: $(npm --version)${NC}\n"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
    echo -e "${GREEN}✓ Dependencies installed${NC}\n"
else
    echo -e "${GREEN}✓ Dependencies already installed${NC}\n"
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚙️  Creating .env file...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✓ .env file created${NC}\n"
else
    echo -e "${GREEN}✓ .env file exists${NC}\n"
fi

# Check if MongoDB is running
echo -e "${BLUE}Checking MongoDB...${NC}"
if command -v mongod &> /dev/null; then
    if pgrep -x "mongod" > /dev/null; then
        echo -e "${GREEN}✓ MongoDB is running${NC}\n"
    else
        echo -e "${YELLOW}⚠️  MongoDB is installed but not running${NC}"
        echo -e "${YELLOW}   Start it with: mongod --dbpath /path/to/data${NC}\n"
    fi
else
    echo -e "${YELLOW}⚠️  MongoDB not found in PATH${NC}"
    echo -e "${YELLOW}   You can use Docker: docker run -d -p 27017:27017 mongo:6.0${NC}\n"
fi

# Run linter
echo -e "${BLUE}🔍 Running linter...${NC}"
npm run lint
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Linting passed${NC}\n"
else
    echo -e "${RED}❌ Linting failed${NC}\n"
    exit 1
fi

# Ask user what to do
echo -e "${BLUE}What would you like to do?${NC}"
echo "1) Start the backend API"
echo "2) Start the frontend"
echo "3) Start both backend and frontend"
echo "4) Run tests"
echo "5) Start with Docker"
echo "6) Exit"
echo ""
read -p "Enter your choice [1-6]: " choice

case $choice in
    1)
        echo -e "\n${GREEN}🚀 Starting backend API...${NC}"
        npm start
        ;;
    2)
        echo -e "\n${GREEN}🌐 Starting frontend...${NC}"
        node frontend/server.js
        ;;
    3)
        echo -e "\n${GREEN}🚀 Starting backend API in background...${NC}"
        npm start &
        API_PID=$!
        sleep 3
        echo -e "${GREEN}🌐 Starting frontend...${NC}"
        echo -e "${YELLOW}Press Ctrl+C to stop both servers${NC}\n"
        trap "kill $API_PID 2>/dev/null" EXIT
        node frontend/server.js
        ;;
    4)
        echo -e "\n${GREEN}🧪 Running tests...${NC}"
        npm test
        ;;
    5)
        echo -e "\n${GREEN}🐳 Starting with Docker...${NC}"
        if ! command -v docker &> /dev/null; then
            echo -e "${RED}❌ Docker is not installed.${NC}"
            exit 1
        fi
        docker-compose up --build
        ;;
    6)
        echo -e "\n${BLUE}Goodbye!${NC}"
        exit 0
        ;;
    *)
        echo -e "\n${RED}Invalid choice${NC}"
        exit 1
        ;;
esac
