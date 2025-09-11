# Quick Start Guide: React + Python App
#
# This script helps you launch the React-Python application with minimal setup.
#
# How to run:
# 1. Open your terminal.
# 2. Execute the command: sh startup-react-python.sh
# 3. Wait for the application to start.
# 4. Verify it's working by navigating to the "Products" page and checking for dummy data.

RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m'

# Determine the operating system for specific instructions
OS=$(uname -s)

get_install_link() {
    local cmd="$1"
    local os_type="$2"
    case "$cmd" in
        "docker" | "docker-compose")
            case "$os_type" in
                "Linux") echo "https://docs.docker.com/engine/install/" ;;
                "Darwin") echo "https://docs.docker.com/desktop/install/mac-install/" ;;
                "MINGW"*|"MSYS"*) echo "https://docs.docker.com/desktop/install/windows-install/" ;;
            esac
            ;;
        "python3" | "pip3")
            echo "https://www.python.org/downloads/" ;;
        "git")
            echo "https://git-scm.com/downloads" ;;
        "npm")
            echo "https://docs.npmjs.com/downloading-and-installing-node-js-and-npm" ;;
        "java")
            echo "https://www.oracle.com/java/technologies/downloads/" ;;
        *)
            echo "No official link found for $cmd" ;;
    esac
}

check_prerequisites() {
    echo -e "${CYAN}==========================================${NC}"
    echo -e "${CYAN}  Checking for Required Software 🛠️${NC}"
    echo -e "${CYAN}==========================================${NC}"
    local all_found=true
    
    # Check for non-Java prerequisites
    local prerequisites=("docker" "docker-compose" "python3" "pip3" "git" "npm")
    for cmd in "${prerequisites[@]}"; do
        if ! command -v "$cmd" &> /dev/null; then
            echo -e "  ${RED}✖ Not found: ${cmd}${NC}"
            echo -e "    ${RED}Please install it from: $(get_install_link "$cmd" "$OS")${NC}"
            all_found=false
        else
            echo -e "  ${GREEN}✔ Found: ${cmd}${NC}"
        fi
    done
    
    # Check specifically for Java 17
    echo -e "${CYAN}------------------------------------------${NC}"
    if command -v java &> /dev/null; then
        if java -version 2>&1 | grep -q "version \"17\." ; then
            echo -e "  ${GREEN}✔ Found Java 17.${NC}"
        else
            echo -e "  ${RED}✖ Found Java, but version 17 is required.${NC}"
            echo -e "    ${RED}You can download Java 17 from: $(get_install_link "java" "$OS")${NC}"
            all_found=false
        fi
    else
        echo -e "  ${RED}✖ Not found: Java 17${NC}"
        echo -e "    ${RED}Please install it from: $(get_install_link "java" "$OS")${NC}"
        all_found=false
    fi

    echo -e "${CYAN}==========================================${NC}"
    if [ "$all_found" = false ]; then
        echo -e "\n${RED}Looks like we're missing some things. Please install the software listed above and try again.${NC}"
        exit 1
    fi
    echo -e "${GREEN}All checks passed! You're ready to go. 🎉${NC}"
    echo -e "${CYAN}==========================================${NC}"
}
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

start_backend() {
    echo -e "\n${CYAN}==========================================${NC}"
    echo -e "${CYAN}  Setting Up & Starting the Python Backend 🐍${NC}"
    echo -e "${CYAN}==========================================${NC}"

    # Change directory to the backend folder
    pwd
    cd python-starter || { echo -e "${RED}✖ Error: The 'backend' directory was not found. Please ensure you are in the correct directory.${NC}"; exit 1; }
    
    # Set up and activate the virtual environment
    if [ ! -d "venv" ]; then
        echo -e "  Virtual environment not found. Setting it up... ⏳"
        if python3 -m venv venv; then
            echo -e "  ${GREEN}✔ Virtual environment created successfully.${NC}"
        else
            echo -e "  ${RED}✖ Failed to create virtual environment. Do you have Python 3 installed?${NC}"
            cd ..
            exit 1
        fi
    else
        echo -e "  ${GREEN}✔ Virtual environment found. Skipping setup.${NC}"
    fi

    echo -e "  Activating the virtual environment..."
    # Activate the virtual environment based on the operating system
    if [[ "$OS" == "MINGW"* || "$OS" == "MSYS"* || "$OS" == *"NT"* ]]; then
        # For Windows (e.g., Git Bash, MSYS)
        ./venv/Scripts/activate || { echo -e "${RED}✖ Failed to activate virtual environment. Please check your path.${NC}"; cd ..; exit 1; }
    else
        # For Linux and macOS
        source venv/bin/activate || { echo -e "${RED}✖ Failed to activate virtual environment. Please check your path.${NC}"; cd ..; exit 1; }
    fi
    echo -e "  ${GREEN}✔ Virtual environment activated.${NC}"

    # Install Python packages
    if [ -f "requirements.txt" ]; then
        echo -e "  Installing required Python packages... 📦"
        if pip install -r requirements.txt; then
            echo -e "  ${GREEN}✔ All packages installed successfully.${NC}"
        else
            echo -e "  ${RED}✖ Failed to install Python packages. Please check the 'requirements.txt' file.${NC}"
            cd ..
            exit 1
        fi
    else
        echo -e "  ${YELLOW}ℹ Warning: No 'requirements.txt' file found. Skipping package installation.${NC}"
    fi
    
    # Change directory to src and start the server
    cd src || { echo -e "${RED}✖ Error: 'src' directory not found inside the backend folder.${NC}"; cd ../..; exit 1; }
    echo -e "  Starting the server... 🚀"
    echo -e "    Press ${YELLOW}CTRL+C${NC} to stop the server later."
    
    if uvicorn fastapiproject.main:app --reload --port 8080; then
        echo -e "  ${GREEN}✔ The backend server has stopped.${NC}"
    else
        echo -e "  ${RED}✖ Failed to start the backend server. Please check the logs.${NC}"
        cd ..
        exit 1
    fi

    # Deactivate the virtual environment
    deactivate

    # Return to the original directory
    cd ..
    echo -e "${CYAN}==========================================${NC}"
}

start_frontend() {
    echo -e "\n${CYAN}==========================================${NC}"
    echo -e "${CYAN}  Starting the React Frontend ⚛️${NC}"
    echo -e "${CYAN}==========================================${NC}"

    # Change directory to the client folder where the React app lives
    cd react-starter || { echo -e "${RED}✖ Error: The 'client' directory was not found. Please ensure you are in the correct directory.${NC}"; exit 1; }
    
    # Check if node modules are installed
    if [ ! -d "node_modules" ]; then
        echo -e "  Node packages not found. Installing now... this may take a few moments. ⏳"
        if npm install; then
            echo -e "  ${GREEN}✔ Node packages installed successfully.${NC}"
        else
            echo -e "  ${RED}✖ Failed to install Node packages. Please check your npm and internet connection.${NC}"
            cd ..
            exit 1
        fi
    else
        echo -e "  ${GREEN}✔ Node packages already installed. Skipping 'npm install'.${NC}"
    fi

    echo -e "  Starting the React development server... 🚀"
    if npm start > react-app.log 2>&1; then
        echo -e "  ${GREEN}✔ The frontend server has started. Open your browser and navigate to the provided address.${NC}"
    else
        echo -e "  ${RED}✖ Failed to start the React server.${NC}"
        cd ..
        exit 1
    fi

    # Return to the original directory after the script is done
    cd ..
}

#Start
check_prerequisites

start_docker_containers
sleep 5

start_docker_containers &
start_backend &
start_frontend