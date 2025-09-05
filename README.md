Multi-Codebase Project Starters
============================

This repository contains multiple codebases that you can explore and use freely:

-   Java backend (needs Java 17)
-   Python backend (needs Python 3)
-   React frontend (needs npm, hooks into the Java/Python backends)
-   Next.js app (TBA)
-   Streamlit Python dashboard (TBA, needs Python 3)
-   Docker Compose setup for a MongoDB database (necessary for the React + backend app to work)

Refer to the briefing document for a general intro  and the `README.md` for more detailed guides


Quick Start Guide
-----------------
* * * * *

### 1\. MongoDB Database Setup

To start the MongoDB database (ensure Docker/Rancher are installed):


# Start MongoDB (add -d to run in background)

docker compose up

# Stop MongoDB (add -v to remove the database volume)

docker compose down

* * * * *

### 4\. Codebases Quick Start

Use one or more of the following depending on your needs.

#### React Frontend

-   Refer to the [README inside the React backend folder](react-starter/README.md) for full instructions.

#### Python Backend

-   Refer to the [README inside the Python backend folder](python-starter/README.md) for full instructions.

#### Java Backend

-   Refer to [README inside the Java backend folder](java-starter/README.md) for full instructions.

* * * * *

Feel free to use any or all of the codebases as needed.
