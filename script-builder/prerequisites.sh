RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

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

check_prerequisites