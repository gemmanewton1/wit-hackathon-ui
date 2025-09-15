# Hackathon Java Starter

This is a simple Spring Boot backend starter for hackathon projects, now configured to use MongoDB (NoSQL) and featuring a health checker via Spring Boot Actuator.

---

## 
**Some useful reading:**
- https://spring.io/guides/tutorials/rest
- https://spring.io/guides/gs/rest-service
- https://docs.spring.io/spring-data/mongodb/reference/mongodb/repositories/repositories.html


## 💻 How to Run

1. **Navigate to the project directory**
    ```sh
    cd java-starter
    ```

2. **Build and run using Gradle**

   If using the Gradle wrapper (recommended):
    ```sh
    ./gradlew bootRun
    ```

3. **Access the Application**
   - The server will start on [http://localhost:8080](http://localhost:8080) by default.

4. **Health Checker (Actuator Health Endpoint)**
   - Make sure your `build.gradle` includes:
     ```groovy
     implementation 'org.springframework.boot:spring-boot-starter-actuator'
     ```
   - Enable and configure the endpoint in `src/main/resources/application.properties`:
     ```properties
     management.endpoints.web.exposure.include=health
     management.endpoint.health.show-details=always
     ```
   - To check if your application and MongoDB DB are up, open:
      - [http://localhost:8080/actuator/health](http://localhost:8080/actuator/health)
      - If MongoDB is properly connected, you'll see `"mongo" : { "status" : "UP" }`
      - If not, it will show an error and `"status": "DOWN"` under the mongo component.

---

## 🗄️ How to Start and Stop the Database (MongoDB with Docker)

1. Make sure you have Docker and Docker Compose installed.

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

---

## 📄 How to Test Out NoSQL Database Works

1. **Start MongoDB with Docker Compose** (see above).

2. **Verify the database is running and seeded:**
    ```sh
    docker exec -it hackathon-mongodb mongosh -u root -p example --authenticationDatabase admin --host localhost --port 27017
    ```
   In the shell, select the correct DB and type:
    ```js
    use hackathon
    show collections
    ```
   - If you see `customer` and `product`, the DB is initialized.

3. **Check from the Spring Boot application:**
   - Call your REST API endpoints for `/customers` or `/products`.
   - Or check [http://localhost:8080/actuator/health](http://localhost:8080/actuator/health) for mongo status.

---

## 📦 Project Structure

- **Main entry point:**  
  `src/main/java/com/example/demo/HackathonStarterApplication.java`
- **Application configuration and resources:**  
  `src/main/resources/`
- **Customizing:**  
  Add your REST controllers, services, entities, etc. in the package:  
  `com.example.demo`

---

## 🔧 Requirements

- JDK 17 or higher
- Gradle or Maven (or use the included wrapper scripts)
- Docker & Docker Compose

---

## 📗 Example

To run with Gradle wrapper:
```sh
cd java-starter
./gradlew bootRun
```

[⬅️ Back](../README.md)
