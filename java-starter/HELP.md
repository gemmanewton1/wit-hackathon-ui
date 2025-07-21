# Hackathon Java Starter

This is a simple Spring Boot backend starter for hackathon projects.

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

   The server will start on [http://localhost:8080](http://localhost:8080) by default.
4. **Access the H2 console until database connections are built**
    - Open your browser and go to [http://localhost:8080/h2-console](http://localhost:8080/h2-console)

   - JDBC URL: jdbc:h2:mem:testdb
   - Username: sa
   - Password: (leave blank)

4. **Project Structure**

    - **Main entry point:**  
      `src/main/java/com/example/demo/HackathonStarterApplication.java`
    - **Application configuration and resources:**  
      `src/main/resources/`

5. **Customizing**

    - Add your REST controllers, services, entities, etc. in the package:  
      `com.example.demo`

## 🔧 Requirements

- JDK 17 or higher
- Gradle or Maven (or use the included wrapper scripts)

## 📄 Example

To run with Gradle wrapper:

```sh
cd java-starter
./gradlew bootRun
```

## 📄 How to test out noSql database works
- First, make sure you have Docker installed and running. Go to the root of the project and:
- Run the MongoDB container with docker compose up -d
- docker exec -it hackathon-mongodb mongosh -u root -p example --authenticationDatabase admin --host localhost --port 27017
- Type in: show collections
- If you see customer and products, the db works