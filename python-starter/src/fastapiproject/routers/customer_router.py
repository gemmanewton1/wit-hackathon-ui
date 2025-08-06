from fastapiproject.db import get_database
from fastapi import APIRouter, HTTPException, Path
from typing import List
from ..model.customer import Customer
import uuid
import logging

router = APIRouter()
logger = logging.getLogger("customer_router")
logging.basicConfig(level=logging.INFO)

# Endpoint to create a new customer
@router.post("/customers", response_model=Customer, status_code=201)
async def create_customer(customer: Customer):
    db = get_database()  # Get MongoDB database reference
    customer_id = str(uuid.uuid4())  # Generate a unique customer ID
    customer_dict = customer.model_dump()  # Convert Pydantic model to dict
    customer_dict["id"] = customer_id  # Add generated ID to customer data
    await db["customers"].insert_one(customer_dict)  # Insert customer into MongoDB
    logger.info(f"Customer created: {customer_dict}")  # Log creation
    return Customer(**customer_dict)  # Return the created customer

# Endpoint to get all customers
@router.get("/customers", response_model=List[Customer])
async def get_all_customers():
    db = get_database()  # Get MongoDB database reference
    customers_cursor = db["customers"].find()  # Query all customers
    customers = [Customer(**doc) async for doc in customers_cursor]  # Convert each MongoDB doc to Customer model
    logger.info(f"Fetched {len(customers)} customers")  # Log fetch count
    return customers  # Return list of customers

# Endpoint to get a customer by ID
@router.get("/customers/{id}", response_model=Customer)
async def get_customer_by_id(id: str = Path(...)):
    db = get_database()  # Get MongoDB database reference
    customer = await db["customers"].find_one({"id": id})  # Find customer by ID
    if not customer:
        logger.warning(f"Customer not found: {id}")  # Log warning if customer not found
        raise HTTPException(status_code=404, detail="Customer not found")  # Raise 404 error
    logger.info(f"Fetched customer: {customer}")  # Log successful fetch
    return Customer(**customer)  # Return the found customer

# Endpoint to update a customer by ID
@router.put("/customers/{id}", response_model=Customer)
async def update_customer(id: str, customer: Customer):
    db = get_database()  # Get MongoDB database reference
    customer_dict = customer.model_dump()  # Convert Pydantic model to dict
    customer_dict["id"] = id  # Ensure the ID in the data matches the URL
    result = await db["customers"].replace_one({"id": id}, customer_dict)  # Update the customer in MongoDB
    if result.matched_count == 0:
        logger.warning(f"Customer not found for update: {id}")  # Log warning if customer not found
        raise HTTPException(status_code=404, detail="Customer not found")  # Raise 404 error
    logger.info(f"Customer updated: {customer_dict}")  # Log successful update
    return Customer(**customer_dict)  # Return the updated customer

# Endpoint to delete a customer by ID
@router.delete("/customers/{id}", status_code=204)
async def delete_customer(id: str):
    db = get_database()  # Get MongoDB database reference
    result = await db["customers"].delete_one({"id": id})  # Delete the customer from MongoDB
    if result.deleted_count == 0:
        logger.warning(f"Customer not found for deletion: {id}")  # Log warning if customer not found
        raise HTTPException(status_code=404, detail="Customer not found")  # Raise 404 error
    logger.info(f"Customer deleted: {id}")  # Log successful deletion
