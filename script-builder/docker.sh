RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
NC='\033[0m'

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

start_docker_containers