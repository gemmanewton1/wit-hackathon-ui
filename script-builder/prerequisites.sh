RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

check_prerequisites() {
    echo -e "${CYAN}--- Checking Prerequisites ---${NC}"
    local all_found=true
    
    # Check for non-Java prerequisites
    local prerequisites=("docker" "docker-compose" "python3" "pip3" "git" "npm")
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

check_prerequisites