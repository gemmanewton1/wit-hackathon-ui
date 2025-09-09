RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
NC='\033[0m'

# Function to start Docker containers with improved user messaging
start_docker_containers() {
    echo -e "\n${CYAN}==========================================${NC}"
    echo -e "${CYAN}  Starting Docker Containers (MongoDB) 🐳${NC}"
    echo -e "${CYAN}==========================================${NC}"

    # Check if containers are already running to avoid unnecessary steps
    if docker-compose ps --services --filter "status=running" | grep -q "database"; then
        echo -e "  ${YELLOW}✔ It looks like the database container is already running. We'll skip starting it.${NC}"
        echo -e "    If you need to rebuild, please run 'docker-compose down' first."
    else
        echo -e "  Bringing up the MongoDB database... This might take a moment."
        # Attempt to start the containers in the background
        if docker-compose up -d --build; then
            echo -e "  ${GREEN}✔ Success! The Docker containers are now running.${NC}"
            echo -e "    You're ready to connect to your database. 🎉"
        else
            echo -e "  ${RED}✖ Failed to start the Docker containers.${NC}"
            echo -e "    ${RED}Something went wrong. Please check your Docker setup or view the logs for more details.${NC}"
            exit 1
        fi
    fi
    echo -e "${CYAN}==========================================${NC}"
}