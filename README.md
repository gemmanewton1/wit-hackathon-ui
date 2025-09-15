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
- It’s all in **JavaScript**.
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
- Next.js app - Combines React frontend and backend API routes (javascript, needs node)

**Note:** If you choose **Streamlit** for your frontend, you do **not** need to set up a separate backend or database. Streamlit runs as a single Python script and can handle logic internally.
However, this means you won’t be able to store data persistently unless you connect it to a database manually.

#### ⚙️ Backend
- Java - Use for robust backend services (needs Java 17)
- Python, FastAPI - Lightweight and fast (needs Python 3)
- Next.js app - Includes backend API routes (javascript, needs node)

#### 🗄️ Database
- MongoDB - Flexible NoSQL database (Requires Docker or Rancher Desktop to run locally)

## 📚 Getting Started

Click on the links below for instructions on how to run your chosen tech stack.

#### Frontend project starters (Choose 1)
| Section 1 | Description                                                   |
| --------- | ------------------------------------------------------------- |
| 1         | [React](./docs/REACT.md)                                      |
| 2         | [Streamlit](./docs/STREAMLIT.md)                              |
| 3         | [Next.js*](./docs/NEXTJS.md)                                  |

* Next.js is also a backend project

#### Backend project starters (Choose 1)

| Section 2 | Description                                                   |
| --------- | ------------------------------------------------------------- |
| 4         | [Java ](./docs/JAVA.md)                                       |
| 5         | [Python](./docs/PYTHON.md)                                    |
| 6         | [Next.js*](./docs/NEXTJS.md)                                  |

* Next.js is also a frontend project

#### Database (Install Docker/Rancher Desktop to run MongoDB)

| Section 3 | Description                                                   |
| --------- | ------------------------------------------------------------- |
| 7         | [Docker & Rancher Desktop](./docs/DOCKER_RANCHER_DESKTOP)     |
| 8         | [MongoDB ](./docs/MONGODB.md)                                 | 
| 9         | [MongoDB Dummy Data Setup*](./docs/MONGODB_DATA_SETUP.md)     | 

* Not essential, useful if you want to have data already loaded into your database 

Happy coding!