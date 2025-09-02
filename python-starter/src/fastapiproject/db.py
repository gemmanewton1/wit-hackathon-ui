from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

# Load environment variables from .env file if present
load_dotenv()

# Get MongoDB credentials and connection info from environment variables
MONGODB_USERNAME = os.getenv("MONGODB_USERNAME")
MONGODB_PASSWORD = os.getenv("MONGODB_PASSWORD")
MONGODB_HOST = os.getenv("MONGODB_HOST", "localhost")
MONGODB_PORT = os.getenv("MONGODB_PORT", "27017")
DB_NAME = os.getenv("DB_NAME", "hackathon")

if MONGODB_USERNAME and MONGODB_PASSWORD:
    MONGODB_URI = f"mongodb://{MONGODB_USERNAME}:{MONGODB_PASSWORD}@{MONGODB_HOST}:{MONGODB_PORT}/{DB_NAME}?authSource=admin"
else:
    MONGODB_URI = f"mongodb://{MONGODB_HOST}:{MONGODB_PORT}/{DB_NAME}?authSource=admin"

# Create a global MongoDB client
client = AsyncIOMotorClient(MONGODB_URI)

def get_database(db_name: str = None):
    """
    Returns a reference to the specified MongoDB database.
    Uses DB_NAME from environment if not provided.
    """
    return client[db_name or DB_NAME]
