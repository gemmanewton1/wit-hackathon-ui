// Switch to (or create) the 'hackathon' database.
// This ensures all following operations happen in the 'hackathon' DB.
db = db.getSiblingDB('hackathon');

// Create users collection
// Stores user login and profile info
// Example fields: username, email, passwordHash, createdAt
// (Do not store plaintext passwords in production)
db.createCollection('users');
db.users.insertOne({
    username: "testuser",
    email: "testuser@example.com",
    passwordHash: "hashedpassword123", // Use real hash in production
    createdAt: new Date(),
    consent_health_data: true, // Consent to health data processing
    consent_data_storage: true, // Consent to data storage
    wants_recommendations: true, // Wants personalized recommendations
    enable_biometric_login: false, // Biometric login enabled
    joined_communities: [
        "Mindfulness Group",
        "Wellness Warriors",
        "Cycle Support",
        "Health Hackers"
    ] // List of community IDs/names the user is part of
});

// Create journal_entries collection
// Stores each user's journal entry with 5 questions and answers
db.createCollection('journal_entries');
db.journal_entries.insertMany([
    {
        userId: "testuser",
        createdAt: new Date(),
        symptoms: ["period cramps", "heavy period", "tiredness"],
        pain_scale: 7,
        pad_change_frequency: 4
    },
    {
        userId: "testuser",
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        symptoms: ["anxiety", "tiredness"],
        pain_scale: 3,
        pad_change_frequency: 2
    },
    {
        userId: "testuser",
        createdAt: new Date(Date.now() - 2*86400000), // 2 days ago
        symptoms: ["ovulation pain", "spotting or bleeding between periods"],
        pain_scale: 5,
        pad_change_frequency: 1
    },
    {
        userId: "testuser",
        createdAt: new Date(Date.now() - 3*86400000), // 3 days ago
        symptoms: ["low mood or depression", "back pain"],
        pain_scale: 2,
        pad_change_frequency: 0
    },
    {
        userId: "testuser",
        createdAt: new Date(Date.now() - 4*86400000), // 4 days ago
        symptoms: ["pain during or after sex", "nausea"],
        pain_scale: 6,
        pad_change_frequency: 3
    }
]);

// Create communities collection
// Stores community group info
db.createCollection('communities');
db.communities.insertMany([
    {
        name: "Mindfulness Group",
        description: "A group for mindfulness enthusiasts",
        createdAt: new Date()
    },
    {
        name: "Wellness Warriors",
        description: "Support and motivation for your wellness journey",
        createdAt: new Date()
    },
    {
        name: "Cycle Support",
        description: "Discuss all things related to menstrual health",
        createdAt: new Date()
    },
    {
        name: "Health Hackers",
        description: "Share and discover health hacks and tips",
        createdAt: new Date()
    },
    {
        name: "Hormone Harmony",
        description: "Balancing hormones together",
        createdAt: new Date()
    }
]);

// Create community_posts collection
// Stores posts in each community, linked to users and communities
db.createCollection('community_posts');
db.community_posts.insertMany([
    {
        communityId: "Mindfulness Group",
        userId: "testuser",
        content: "Welcome to the Mindfulness Group! Let's support each other.",
        createdAt: new Date()
    },
    {
        communityId: "Wellness Warriors",
        userId: "testuser",
        content: "What are your favorite wellness routines?",
        createdAt: new Date(Date.now() - 3600000)
    },
    {
        communityId: "Cycle Support",
        userId: "testuser",
        content: "Anyone have tips for managing cramps?",
        createdAt: new Date(Date.now() - 2*3600000)
    },
    {
        communityId: "Health Hackers",
        userId: "testuser",
        content: "Share your best health hack!",
        createdAt: new Date(Date.now() - 3*3600000)
    },
    {
        communityId: "Hormone Harmony",
        userId: "testuser",
        content: "How do you keep your hormones balanced?",
        createdAt: new Date(Date.now() - 4*3600000)
    }
]);

// Optionally, store the fixed symptom list for future flexibility
db.createCollection('journal_symptoms');
db.journal_symptoms.insertOne({
    period_related: [
        "period cramps",
        "ovulation pain",
        "heavy period",
        "spotting or bleeding between periods",
        "old or dark blood before your period"
    ],
    mood_related: [
        "anxiety",
        "low mood or depression",
        "tiredness"
    ],
    other_symptoms: [
        "pain during or after sex",
        "Tummy pain",
        "back pain",
        "pain when going to the toilet",
        "nausea",
        "vomiting",
        "shortness of breath or chest pain",
        "constipation"
    ]
});

// Create journal_questions collection
// Stores onboarding and daily journal questions for flexibility
// Onboarding (signup) questions
// Each question can have a type (e.g., boolean, text, single-choice, multi-choice)
db.createCollection('journal_questions');
db.journal_questions.insertMany([
  {
    category: "onboarding",
    order: 1,
    question: "Do you consent to the collection and processing of your personal health data (e.g. menstrual cycle, symptoms, medications) for personalised insights and app functionality?",
    field: "consent_health_data",
    type: "boolean"
  },
  {
    category: "onboarding",
    order: 2,
    question: "Do you consent to securely storing your data and understand that you can access, correct, or delete it at any time?",
    field: "consent_data_storage",
    type: "boolean"
  },
  {
    category: "onboarding",
    order: 3,
    question: "Would you like to receive personalised health recommendations and reminders based on your journal entries?",
    field: "wants_recommendations",
    type: "boolean"
  },
  {
    category: "onboarding",
    order: 4,
    question: "Would you like to enable biometric login (e.g. fingerprint or face ID) for added security?",
    field: "enable_biometric_login",
    type: "boolean"
  },
  // Daily journal chatbot questions
  {
    category: "daily",
    order: 1,
    question: "Hi! Tell me how you’re feeling today? Please select all that apply.",
    field: "symptoms",
    type: "multi-choice",
    options: [
      { section: "Period related", values: ["period cramps", "ovulation pain", "heavy period", "spotting or bleeding between periods", "old or dark blood before your period"] },
      { section: "Mood related", values: ["anxiety", "low mood or depression", "tiredness"] },
      { section: "Other symptoms", values: ["pain during or after sex", "Tummy pain", "back pain", "pain when going to the toilet", "nausea", "vomiting", "shortness of breath or chest pain", "constipation"] }
    ]
  },
  {
    category: "daily",
    order: 2,
    question: "On a scale of 1 to 10 (1 being not at all painful and 10 extremely painful), how painful are your period cramps today?",
    field: "pain_scale",
    type: "scale",
    min: 1,
    max: 10
  },
  {
    category: "daily",
    order: 3,
    question: "How often are you having to change your pads or tampons today?",
    field: "pad_change_frequency",
    type: "number"
  }
]);
