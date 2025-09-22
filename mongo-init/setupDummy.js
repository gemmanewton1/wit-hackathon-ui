// Switch to (or create) a database named 'hackathon'.
db = db.getSiblingDB('hackathon');

/*
Create a new collection (like a folder for similar records) called 'members'.
We set up rules to ensure every member has certain required details:
- First name
- Last name
- Email address (must look like an email)
- Health data (must include heart rate records)
Each heart rate record must have:
- A time when it was measured
- The beats per minute (between 25 and 220)
- The activity (optional: e.g. resting, walking)
*/
db.createCollection('members', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["firstName", "lastName", "email", "healthData"], // These fields are required for each member
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
                    pattern: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$", // Must look like a valid email
                    description: "Valid email required"
                },
                phone: {
                    bsonType: "string",
                    description: "member phone number (optional)"
                },
                address: {
                    bsonType: "string",
                    description: "member address (optional)"
                },
                healthData: {
                    bsonType: "object",
                    required: ["heartRateRecords"], // Must have at least heart rate records
                    properties: {
                        heartRateRecords: {
                            bsonType: "array",
                            minItems: 1, // At least one record required
                            description: "Heart rate data array, required",
                            items: {
                                bsonType: "object",
                                required: ["timestamp", "bpm"], // Core measurements
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

// Create another collection named 'products'.
// This is just used to store information about products. No special rules are set.
db.createCollection('products');

// Add a MEMBER record with all the required details and some heart rate readings.
db.members.insertOne({
    firstName: "Alice",
    lastName: "Wong",
    email: "[email protected]",
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

// Add a PRODUCT record with name, price, and some features.
db.products.insertOne({
    name: "Heart Rate Monitor",
    price: 49.99,
    features: [
        "Continuous heart rate measurement",
        "Activity logging",
        "Wireless sync"
    ]
});
