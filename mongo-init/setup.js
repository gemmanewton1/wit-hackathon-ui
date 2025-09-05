// Switch to (or create) the 'hackathon' database.
// This ensures all following operations happen in the 'hackathon' DB.
db = db.getSiblingDB('hackathon');

// Explicitly create a 'customer' collection.
// Collections are like "tables" in relational databases—but more flexible.
// Creating explicitly allows you to add options or validation if needed.
db.createCollection('customers');

// Explicitly create a 'product' collection.
db.createCollection('products');

// Insert a sample customer document into the 'customer' collection.
db.customers.insert({
    firstName: "Jane",
    lastName: "Doe",
    email: "doejanedoe@hotmail.com",
    phone: "1234567890",
    address: "1 Main St",
    dateOfBirth: "1990-01-01",

}, {"address":"6308 Highmeadow Lane, Springfield, Illinois, United States, 62794","date_of_birth":"1949-10-23","email":"kimbell.hiscoe@yahoo.com","first_name":"Kimbell","id":1,"last_name":"Hiscoe","phone":"(217) 869-7351"}
);

// Insert a sample product document into the 'product' collection.
db.products.insertOne({
    name: "Sample Widget",
    price: 19.99
});