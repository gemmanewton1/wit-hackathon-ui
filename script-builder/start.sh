RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
NC='\033[0m'

source prerequisites.sh
source docker.sh
source python-start.sh
source start-frontend.sh

check_prerequisites
start_docker_containers
sleep 5
start_docker_containers &
start_backend &
start_frontend