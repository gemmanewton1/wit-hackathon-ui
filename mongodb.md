## 🗄️ How to Start and Stop the Database (MongoDB with Docker)

1. Make sure you have Docker and Docker Compose installed. [Docker & Rancher Desktop](./DOCKER_RANCHER_DESKTOP)  

2. **Start MongoDB:**
   - At the root of your project (where `docker-compose.yml` is), run:
     ```sh
     docker compose up -d
     ```
   - Or:
     ```sh
     docker-compose up -d
     ```
   - This starts MongoDB as a background service.

3. **Stop MongoDB:**
    ```sh
    docker compose down
    ```
   or
    ```sh
    docker-compose down
    ```

## optional
If you would like to create collections, enforce schema validation, and seed initial data into your project, see [MongoDB Dummy Data Setup](./mongo-init/initialization-scripts.md)  

[⬅️ Back](README.md)