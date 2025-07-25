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
db.customers.insertOne({
    firstName: "Jane",
    lastName: "Doe",
    email: "[email protected]",
    phone: "1234567890",
    address: "1 Main St"
});

// Insert a sample product document into the 'product' collection.
db.products.insertOne({
    name: "Sample Widget",
    price: 19.99
});