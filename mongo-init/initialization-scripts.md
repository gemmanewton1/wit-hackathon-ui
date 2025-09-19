# MongoDB Initialization Scripts Guide

This guide explains how to use the MongoDB setup scripts (`.js` files) with your Docker-based development environment. These scripts help you automatically create collections, enforce schema validation, and seed initial data for your hackathon project. Setup.js is connected tp the database but dummySetup.js is just another example of the kind of data schema you could have.

---

## 🚀 What Are Setup Scripts?

- **Setup scripts** are JavaScript (`.js`) files placed in a folder (`mongo-init`, for example) that is mounted into your MongoDB container.
- On the first database initialization, MongoDB will execute all scripts in this directory, allowing you to:
    - Create collections
    - Configure schema validation
    - Insert sample data
- The setup.js, which is what the starter apps use, do not enforce any schema validation, but it is generally good practice in software development to do so. setupDummy.js has examples of this.
---

## 📦 Where to Put Setup Scripts

- Place your scripts (e.g. `setup.js`) in a directory called `mongo-init` in the root of your project.

- Absolutely! Let's expand your guide with a **technical section explaining how to add data into MongoDB using scripts and the shell**. Here’s an additional, markdown-formatted section you can add to your guide:

---

## 🛠️ How to Add Data to MongoDB

There are several ways to add documents (“rows”) to your collections in MongoDB. The most common approaches when using Docker and initialization scripts are:

### 1. Using Initialization Scripts (`*.js` files)

You can insert documents directly into your collections inside your setup scripts. For example:

```js
// File: mongo-init/setup.js

db.createCollection('customers');
db.customers.insertMany([
  { name: 'Alice', email: 'alice@example.com', age: 23 },
  { name: 'Bob', email: 'bob@example.com', age: 29 }
]);
```

- **`db.createCollection('customers')`**: Creates the 'customers' collection.
- **`db.customers.insertMany([...])`**: Inserts multiple customer documents.

For a single document:

```js
db.customers.insertOne({ name: 'Charlie', email: 'charlie@example.com', age: 35 });
```

### 2. Using the MongoDB Shell (`mongo` CLI)

If you want to manually add data, connect to your running MongoDB container and use the shell:

```bash
docker exec -it <CONTAINER_NAME> mongosh
```

Inside the shell:

```js
use <your_db_name>
db.customers.insertOne({ name: 'Dana', email: 'dana@example.com', age: 28 });
```

### 3. Programmatically from App Code (Next.js Example)

Suppose you have a Next.js API route in `pages/api/customers.js` (or `app/api/customers/route.js` for Next.js App Router) that adds customers to the database:

```js
// pages/api/customers.js (for Next.js pages router)
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Set in your .env file

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      const db = client.db(process.env.MONGODB_DB); // Set in your .env
      const collection = db.collection('customers');
      const result = await collection.insertOne(req.body); // { name, email, age }
      res.status(201).json({ insertedId: result.insertedId });
    } catch (e) {
      res.status(500).json({ error: e.message });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
```

- Send a POST request with customer data (`{ name, email, age }`) to `/api/customers` to add a customer.

---

**TIP:**  
If your setup scripts are mounted into the container with Docker (see your `docker-compose.yaml`), they will be run automatically **when the container initializes**. To re-run them, you’ll need to recreate the container (e.g. `docker compose down && docker compose up`).

---



[⬅️ Back](../README.md)
