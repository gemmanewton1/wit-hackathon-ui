# MongoDB Initialization Scripts Guide

This guide explains how to use the MongoDB setup scripts (`.js` files) with your Docker-based development environment. These scripts help you automatically create collections, enforce schema validation, and seed initial data for your hackathon project.

---

## 🚀 What Are Setup Scripts?

- **Setup scripts** are JavaScript (`.js`) files placed in a folder (`mongo-init`, for example) that is mounted into your MongoDB container.
- On the first database initialization, MongoDB will execute all scripts in this directory, allowing you to:
    - Create collections
    - Configure schema validation
    - Insert sample data

---

## 📦 Where to Put Setup Scripts

- Place your scripts (e.g. `setup.js`) in a directory called `mongo-init` in the root of your project.
- The directory structure should look like: