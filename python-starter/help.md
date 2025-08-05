# FastAPIProject Setup Guide

This guide explains how to install and run the FastAPIProject on your local machine.

## Prerequisites
- Python 3.8 or newer
- pip (Python package manager)

### How to Install Python and pip

1. **Download Python**
   - Go to the official Python website: https://www.python.org/downloads/
   - Download the latest version for your operating system (Windows, macOS, or Linux).

2. **Install Python**
   - Run the installer and follow the instructions.
   - On Windows, make sure to check the box that says "Add Python to PATH" during installation.

3. **Verify Python and pip Installation**
   - Open a terminal (Command Prompt or PowerShell on Windows).
   - Check Python version:
     ```bash
     python --version
     ```
   - Check pip version:
     ```bash
     pip --version
     ```
   - If both commands show a version number, Python and pip are installed correctly.

## Installation Steps

1. **Clone or Download the Repository**
   - Download the project files or clone the repository to your local machine.

2. **Navigate to the Project Directory**
   - Open a terminal and change to the project folder:
     ```bash
     cd path/to/FastAPIProject
     ```

3. **Install Dependencies**
   - Install required Python packages using pip:
     ```bash
     pip install -r requirements.txt
     ```

## Running the FastAPI Application

1. **Start the Server**
   - Run the following command in your terminal:
     ```bash
     uvicorn src.fastapiproject.main:app --reload
     ```
   - The server will start at `http://127.0.0.1:8000/`

2. **Access the API Documentation**
   - Open your browser and go to:
     - Swagger UI: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
     - ReDoc: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

## Running Tests

1. **Run the Tests**
   - In your terminal, execute:
     ```bash
     pytest tests/test_main.py
     ```
   - This will run all tests in the tests/test_main.py file and show the results.

## Manual API Testing with test_main.http

This project includes a test_main.http file for manual API testing. You can use this file with the [REST Client extension for VS Code](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) or other compatible tools to send HTTP requests directly to your FastAPI server and view responses.

Example requests in test_main.http:
- `GET http://127.0.0.1:8000/` — Checks if the server is running.
- `GET http://127.0.0.1:8000/hello/User` — Example endpoint for greeting a user (if implemented).

To use:
1. Open test_main.http in VS Code.
2. Install the REST Client extension.
3. Click the 'Send Request' link above each request to test your API endpoints interactively.

This is useful for quickly verifying endpoint responses and debugging your API during development.

## MongoDB Integration
This project uses MongoDB as its database for storing and retrieving customer and product data. All CRUD operations for these resources are performed using MongoDB, providing persistent and scalable data storage.

### How MongoDB is Used
- The MongoDB connection is managed in `src/fastapiproject/db.py` using the async Motor driver.
- The connection URI is loaded from an environment variable (`MONGODB_URI`) or a `.env` file for security and flexibility.
- Each API router (for customers and products) interacts with MongoDB collections using async methods for high performance.
- Data is validated and serialized using Pydantic models before being stored or returned.

### Setting Up MongoDB
1. **Install and Start MongoDB**
   - Download and install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community).
   - Start the MongoDB server locally or use a cloud-hosted MongoDB instance.

2. **Configure the Connection**
   - Create a `.env` file in your project root with:
     ```
     MONGODB_URI=mongodb://localhost:27017
     ```
   - Update the URI if using a remote or cloud MongoDB.

3. **Install Motor and python-dotenv**
   - These are listed in `requirements.txt` and should be installed with:
     ```
     pip install -r requirements.txt
     ```

### How Data Flows
- When you create, update, or delete a customer or product, the API endpoints interact directly with MongoDB collections.
- All queries and updates are performed asynchronously for scalability.
- The database name defaults to `fastapi_db` but can be changed in the code or via environment variables.

### Benefits
- **Persistence:** Data is not lost when the server restarts.
- **Scalability:** MongoDB can handle large datasets and concurrent requests.
- **Security:** Connection details are managed via environment variables, not hardcoded.

## Notes
- This project uses an in-memory database, so data will be lost when the server restarts.
- For production use, consider integrating a persistent database.

## What is FastAPI?
FastAPI is a modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints. It is designed for building robust and scalable RESTful APIs quickly and easily, with automatic data validation, interactive documentation, and support for asynchronous programming. FastAPI is widely used in commercial and open-source projects for its speed, ease of use, and automatic generation of OpenAPI and JSON Schema documentation.

## Models Used in This Project

### Customer Model
Represents a customer with the following fields:
- `id` (Optional[str]): Unique identifier for the customer, generated by the server.
- `name` (str): The customer's name.
- `email` (str): The customer's email address.

### Product Model
Represents a product with the following fields:
- `id` (Optional[str]): Unique identifier for the product, generated by the server.
- `name` (str): The product's name.
- `description` (str): A description of the product.
- `price` (float): The price of the product.

Both models use Pydantic for data validation and serialization, ensuring that incoming and outgoing data matches the expected structure and types.

## References and Tutorials for Beginners
- [FastAPI Official Tutorial](https://fastapi.tiangolo.com/tutorial/): The official step-by-step guide to building APIs with FastAPI.
- [FastAPI Crash Course (YouTube)](https://www.youtube.com/watch?v=0sOvCWFmrtA): A video introduction to FastAPI for beginners.
- [Real Python: FastAPI Basics](https://realpython.com/fastapi-python-web-apis/): A beginner-friendly article explaining FastAPI concepts and usage.
- [Test-Driven Development with FastAPI](https://testdriven.io/blog/fastapi-crud/): A practical guide to building and testing CRUD APIs with FastAPI.
- [Pydantic Documentation](https://docs.pydantic.dev/latest/): Learn about data validation and serialization in FastAPI using Pydantic models.
- [VS Code REST Client Extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client): How to use the REST Client extension for testing your API endpoints from VS Code.

---
For further help, refer to the FastAPI documentation: https://fastapi.tiangolo.com/
