RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
NC='\033[0m'

start_backend() {
    echo -e "\n${CYAN}==========================================${NC}"
    echo -e "${CYAN}  Setting Up & Starting the Python Backend 🐍${NC}"
    echo -e "${CYAN}==========================================${NC}"

    # Change directory to the backend folder
    cd ../python-starter || { echo -e "${RED}✖ Error: The 'backend' directory was not found. Please ensure you are in the correct directory.${NC}"; exit 1; }
    
    # Set up and activate the virtual environment
    if [ ! -d "venv" ]; then
        echo -e "  Virtual environment not found. Setting it up... ⏳"
        if python -m venv venv; then
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

start_backend