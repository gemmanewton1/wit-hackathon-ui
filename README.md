## 🚀 Welcome to the WiT Hackathon Repository!

This repository contains multiple project starters you can explore and use freely.
For the hackathon, your project will need three key components:

### 🧩 Project Structure

- **Frontend** – The user interface (UI). This is what users see and interact with.
- **Backend** – Handles business logic and communicates with the database.
- **Database** – Stores all your app’s data.


### 🛠 Choosing Your Tech Stack
You’re free to choose any combination of technologies. However, due to time constraints, we recommend picking a stack in a language you're already comfortable with.

If you're **new to coding** , we suggest using either:

**Next.js**
- It’s all in **JavaScript** and is good for interactive UIs.
- Combines frontend and backend in one framework.
- Requires minimal setup, so you can focus on building.

**Streamlit**
- It's all in **Python** and is used to make dashboards
- Good for prototyping if you're new to coding
- Requires minimal setup

### 🎯 Project Starters

#### 🖥️ Frontend
- React - good for interactive user interfaces (javascript, needs node)
- Streamlit - good for data visualisation and quick prototypes (needs Python 3)
    - **👉 If you choose Streamlit as your frontend, you do not need a separate backend or database.**
    - Streamlit runs as a single Python script and handles logic internally.
    - However, this means you won’t be able to store data persistently unless you connect it to a database manually.

- Next.js app - Combines React frontend and backend API routes (javascript, needs node)
   -  **👉 If you choose Next.js as your frontend, you are also choosing it as your backend.**


#### ⚙️ Backend
- Java - Use for robust backend services (needs Java 17)
- Python, FastAPI - Lightweight and fast (needs Python 3)
- Next.js app - Includes backend API routes (javascript, needs node)
    - **👉 If you choose Next.js as your backend, you are also choosing it as your frontend.**

#### 🗄️ Database
- MongoDB - Flexible NoSQL database (Requires Docker or Rancher Desktop to run locally)

## 📚 Getting Started

Click on the links below for instructions on how to run your chosen tech stack.

#### Frontend project starters
| Section 1 | Description                                                   |
| --------- | ------------------------------------------------------------- |
| 1         | [React](./react-starter/README.md)                            |
| 2         | [Streamlit](./streamlit-python-starter/README.md)             |
| 3         | [Next.js](./next-js.starter/README.md)                        |


#### Backend project starters

| Section 2 | Description                                                   |
| --------- | ------------------------------------------------------------- |
| 4         | [Java ](./java-starter/README.md)                             |
| 5         | [Python](./python-starter/README.md)                          |
| 6         | [Next.js](./next-js.starter/README.md)                        |


#### Database (Install Docker/Rancher Desktop to run MongoDB)

| Section 3 | Description                                                   |
| --------- | ------------------------------------------------------------- |
| 7         | [Docker/Rancher](./docker-rancher-installation.md)            |
| 8         | [MongoDB ](./mongodb.md)                                      | 
| 9         | [MongoDB scripts*](./mongo-init/initialization-scripts.md)    | 

* Not essential, useful if you want to have data already loaded into your database, automatically create collections, enforce schema validation 

Happy coding!
