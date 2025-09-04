Multi-Codebase Project Setup
============================

This repository contains multiple codebases that you can explore:

-   Java backend
-   Python backend
-   React frontend
-   Next.js app
-   Docker Compose setup for MongoDB database

Refer to the `README.md` inside each codebase for more detailed instructions about code usage, frameworks, and additional info.

Quick Start Guide
-----------------

### 1\. Prerequisites

-   Docker & Docker Compose\
    Download: [Get Docker](https://www.docker.com/get-started)
-   Node.js\
    Download: [Get Node.js](https://nodejs.org/en/download/)
-   Homebrew (macOS only, optional for installing Node.js)\
    Download: [Get Homebrew](https://brew.sh/)

* * * * *

### 2\. MongoDB Database Setup

To start the MongoDB database (ensure Docker & Compose are installed):


# Start MongoDB (add -d to run in background)

docker compose up

# Stop MongoDB (add -v to remove the database volume)

docker compose down

* * * * *

### 3\. React Frontend Setup

1.  Ensure Node.js (`node` and `npm`) is installed:
    -   Install via official site (see Prerequisites above)\
        OR
    -   macOS:

        brew install npm

2.  Install dependencies and start the React app:

    sh

    npm install

    npm start

* * * * *

### 4\. Backend Codebase Setup

Choose one or more of the following depending on your needs.

#### Python Backend

-   See the README inside the Python backend folder for full instructions.

#### Java Backend

-   See the README inside the Java backend folder for full instructions.

#### Node Backend

-   See the README inside the Node backend folder for full instructions.

* * * * *

Additional Information
----------------------

Each codebase contains a `README.md` with:

-   Detailed setup steps
-   Usage instructions
-   Frameworks and dependencies
-   Advanced configuration

* * * * *

Quick Reference
---------------

-   MongoDB:\
    `docker compose up` --- Start database\
    `docker compose down` --- Stop database

-   React Frontend:\
    `npm install` --- Install dependencies\
    `npm start` --- Run frontend

* * * * *

Feel free to use any or all of the codebases as needed.
