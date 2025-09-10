This next.js project has been set up so that you can write Frontend and Backend code

## 1 - PREREQUISITES & INITIAL SETUP

### Requirements
* node v20.3+ (install here: nodejs.org)
* npm v9.6+ (installed when you install node) 
* docker v24+ (install docker desktop https://docs.docker.com/desktop/)
    Alternatively use Rancher Desktop (https://rancherdesktop.io/)
* visual studio code (code.visualstudio.com)

### Installation
1. Clone this repo
2. In the terminal type `cd wit-hackathon-ui` and press enter 
3. In the terminal type `cd next-js.starter` and press enter
4. Run `npm i` to install all the npm packages.

### env variables
1. create a .env file and ask for the env variables from your tech lead

## 2 - RUNNING THE APPLICATION

### Run the database
1. Open 'docker desktop' or 'Rancher Desktop' and keep it running in the background
2. Open a new terminal and cd into `wit-hackathon-ui`
3. Enter in the terminal: `docker compose up --build`
4. You can view your database using mongo-express which should be running on `[port:](http://localhost:8081)`

### Run nextjs 
1. Check your directory in your terminal is `next-js.starter`
2. Enter `npm run dev`
3. The project should be running on `[port:](http://localhost:3000)`

## 3 - HOW TO USE NEXT.JS 

### Creating a page
1. Create a folder inside the `app` directory
2. Inside this folder create a `page.js` file

### How to Add, View, Update, or Delete Data (CRUD)
1. Create an actions.ts file
    - Go to the folder of the page you're working on.
    - Create a file called actions.ts.
    - At the top of the file, add this line: `use server`;

This tells the app that the code in this file runs securely on the server.

2. Write your server actions
    Server actions are functions that do things like:
    - Add a new customer or product
    - Get a list of items
    - Update details
    - Delete something
    - You can copy examples from other actions.ts files in the project to get started.
    create a model inside models and add the schema (see how it is done on Customer.ts and Product.ts)

3. Create a model for your data
    - Go to the models folder.
    - Add a new file for your data type (e.g. Customer.ts or Product.ts).
    - Inside the file, define what fields your data should have — like name, email, price, etc.
    - This helps keep your data organized and consistent.


