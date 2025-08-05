from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

# Load environment variables from .env file if present
load_dotenv()

# Get MongoDB URI and database name from environment variables, fallback to defaults
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "fastapi_db")

# Create a global MongoDB client
client = AsyncIOMotorClient(MONGODB_URI)

def get_database(db_name: str = None):
    """
    Returns a reference to the specified MongoDB database.
    Uses DB_NAME from environment if not provided.
    """
    return client[db_name or DB_NAME]
