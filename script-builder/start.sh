#!/bin/bash

# ==============================================================================
# Service Startup Script
# ==============================================================================
# This script automates the startup process for the WIT-Hackathon application.
# It performs the following steps:
# 1. Checks for required prerequisites (Docker, Java, Python 3).
# 2. Starts the Docker containers using docker-compose.
# 3. Starts specified backend services, skipping any that are already running.
#
# Usage:
#   ./start_services.sh                  (Runs all services)
#   ./start_services.sh java-service     (Runs only the Java service)
#   ./start_services.sh python-service   (Runs only the Python service)
#
# ==============================================================================

# ==============================================================================
# --- Configuration Section ---
#
# To add a new service, simply add a new block of variables below.
# Each service requires:
# - A unique name
# - The port it runs on
# - The command to execute to start it
# ==============================================================================

# ANSI color codes for readable output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Define services with their names, ports, and start commands
# Note: The command should be runnable from the root of the repository.
SERVICES=(
    "react-service 3000 npm start"
    "python-service 8080 uvicorn fastapiproject.main:app --reload --port 8080"
)

# ==============================================================================
# --- Functions ---
# ==============================================================================

# Function to check for required commands
check_prerequisites() {
    echo -e "${CYAN}--- Checking Prerequisites ---${NC}"
    local all_found=true
    
    # Check for non-Java prerequisites
    local prerequisites=("docker" "docker-compose" "python3")
    for cmd in "${prerequisites[@]}"; do
        if ! command -v "$cmd" &> /dev/null; then
            echo -e "  ${RED}✖ Missing prerequisite: ${cmd}${NC}"
            all_found=false
        else
            echo -e "  ${GREEN}✔ Found: ${cmd}${NC}"
        fi
    done
    
    # Check specifically for Java 17
    if command -v java &> /dev/null; then
        if java -version 2>&1 | grep -q "version \"17\." ; then
            echo -e "  ${GREEN}✔ Found Java 17.${NC}"
        else
            echo -e "  ${RED}✖ Found Java, but version 17 is required.${NC}"
            all_found=false
        fi
    else
        echo -e "  ${RED}✖ Missing prerequisite: java 17 (or not found in PATH).${NC}"
        all_found=false
    fi

    if [ "$all_found" = false ]; then
        echo -e "\n${RED}Please install the missing prerequisites before running the script.${NC}"
        exit 1
    fi
    echo -e "${GREEN}All prerequisites found.${NC}"
}

# Function to check if a service is already running on a specific port
is_service_running() {
    local port=$1
    if [ -z "$(lsof -i :$port -t 2>/dev/null)" ]; then
        return 1 # Not running
    else
        return 0 # Running
    fi
}

# Function to start Docker containers
start_docker_containers() {
    echo -e "\n${CYAN}--- Starting Docker Containers (MongoDB) ---${NC}"
    if docker-compose ps --services --filter "status=running" | grep -q "database"; then
        echo -e "  ${YELLOW}✔ Docker containers are already running. Skipping.${NC}"
    else
        if docker-compose up -d --build; then
            echo -e "  ${GREEN}✔ Docker containers started successfully.${NC}"
        else
            echo -e "  ${RED}✖ Failed to start Docker containers. Check docker-compose logs.${NC}"
            exit 1
        fi
    fi
}

# Function to run a single service
run_service() {
    local service_name=$1
    local service_port=$2
    local service_cmd=$3

    echo -e "\n${CYAN}--- Starting ${service_name} ---${NC}"
    if is_service_running "$service_port"; then
        echo -e "  ${YELLOW}✔ ${service_name} is already running on port ${service_port}. Skipping.${NC}"
    else
        echo -e "  ${GREEN}Starting ${service_name}...${NC}"
        # Start the service in the background and redirect output to a log file
        $service_cmd &> "logs/${service_name}.log" &
        sleep 2 # Give it a moment to start
        if is_service_running "$service_port"; then
            echo -e "  ${GREEN}✔ ${service_name} started successfully on port ${service_port}.${NC}"
        else
            echo -e "  ${RED}✖ Failed to start ${service_name}. Check the log file: logs/${service_name}.log${NC}"
        fi
    fi
}

# ==============================================================================
# --- Main Script Logic ---
# ==============================================================================

# Create a logs directory if it doesn't exist
mkdir -p logs

# Step 1: Check for all necessary commands
check_prerequisites

# Step 2: Start the Docker containers
start_docker_containers

# Step 3: Parse arguments and run services
requested_service=$1
if [ -z "$requested_service" ]; then
    echo -e "\n${CYAN}--- No specific service requested. Starting all services. ---${NC}"
    for service_line in "${SERVICES[@]}"; do
        read -r name port cmd <<< "$service_line"
        run_service "$name" "$port" "$cmd"
    done
else
    echo -e "\n${CYAN}--- Starting specified service: ${requested_service} ---${NC}"
    service_found=false
    for service_line in "${SERVICES[@]}"; do
        read -r name port cmd <<< "$service_line"
        if [ "$name" == "$requested_service" ]; then
            run_service "$name" "$port" "$cmd"
            service_found=true
            break
        fi
    done

    if [ "$service_found" = false ]; then
        echo -e "${RED}✖ Error: Service '${requested_service}' not found in the configuration.${NC}"
        exit 1
    fi
fi

echo -e "\n${GREEN}Script execution finished.${NC}"
echo -e "${YELLOW}You can monitor services in the 'logs' directory.${NC}"