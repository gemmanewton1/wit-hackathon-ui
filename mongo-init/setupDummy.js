// Switch to (or create) the 'hackathon' database.
db = db.getSiblingDB('hackathon');

// Create 'members' collection with schema validation.
db.createCollection('members', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["firstName", "lastName", "email", "healthData"],
            properties: {
                firstName: {
                    bsonType: "string",
                    description: "member's first name, required"
                },
                lastName: {
                    bsonType: "string",
                    description: "member's last name, required"
                },
                email: {
                    bsonType: "string",
                    pattern: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
                    description: "Valid email required"
                },
                phone: {
                    bsonType: "string",
                    description: "member phone number"
                },
                address: {
                    bsonType: "string",
                    description: "member address"
                },
                healthData: {
                    bsonType: "object",
                    required: ["heartRateRecords"],
                    properties: {
                        heartRateRecords: {
                            bsonType: "array",
                            minItems: 1,
                            description: "Heart rate data array, required",
                            items: {
                                bsonType: "object",
                                required: ["timestamp", "bpm"],
                                properties: {
                                    timestamp: {
                                        bsonType: "date",
                                        description: "Time of reading"
                                    },
                                    bpm: {
                                        bsonType: "int",
                                        minimum: 25,
                                        maximum: 220,
                                        description: "Heart rate in bpm (reasonable range)"
                                    },
                                    activity: {
                                        bsonType: "string",
                                        description: "Activity during measurement"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});

// Create 'products' collection (sample, no validation here).
db.createCollection('products');

// Insert a sample member document that follows the schema.
db.members.insertOne({
    firstName: "Alice",
    lastName: "Wong",
    email: "[email protected]",
    phone: "0123456789",
    address: "42 Wellness Road",
    healthData: {
        heartRateRecords: [
            {
                timestamp: ISODate("2025-07-25T08:00:00Z"),
                bpm: 78,
                activity: "resting"
            },
            {
                timestamp: ISODate("2025-07-25T09:30:00Z"),
                bpm: 110,
                activity: "walking"
            },
            {
                timestamp: ISODate("2025-07-25T11:00:00Z"),
                bpm: 140,
                activity: "running"
            }
        ]
    }
});

// Insert a sample product.
db.products.insertOne({
    name: "Heart Rate Monitor",
    price: 49.99,
    features: [
        "Continuous heart rate measurement",
        "Activity logging",
        "Wireless sync"
    ]
});