RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m'

start_frontend() {
    echo -e "\n${CYAN}==========================================${NC}"
    echo -e "${CYAN}  Starting the React Frontend ⚛️${NC}"
    echo -e "${CYAN}==========================================${NC}"

    # Change directory to the client folder where the React app lives
    cd ../react-starter || { echo -e "${RED}✖ Error: The 'client' directory was not found. Please ensure you are in the correct directory.${NC}"; exit 1; }
    
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