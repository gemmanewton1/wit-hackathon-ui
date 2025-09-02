from fastapiproject.db import get_database
from fastapi import APIRouter, HTTPException, Path, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from typing import List
from ..model.customer import Customer
import logging
from datetime import datetime
from bson import ObjectId


router = APIRouter()
logger = logging.getLogger("customer_router")
logging.basicConfig(level=logging.ERROR)

# Endpoint to create a new customer
@router.post("/customers", response_model=Customer, status_code=201)
async def create_customer(customer: Customer, request: Request):
    raw_body = await request.body()  # Get the raw request body
    logger.info(f"Raw request body: {raw_body.decode('utf-8')}")
    db = get_database()  # Get MongoDB database reference
    current_time = datetime.utcnow()
    customer_dict = customer.model_dump(exclude={"id"})  # Convert Pydantic model to dict

    # Convert dateOfBirth to datetime if it exists
    if customer_dict.get("dateOfBirth"):
        customer_dict["dateOfBirth"] = datetime.combine(customer_dict["dateOfBirth"], datetime.min.time())

    customer_dict.update({
        "createdAt": current_time,
        "updatedAt": current_time
    })  # Add generated ID and timestamps to customer data
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
    id_obj = convert_to_obj_id(id)
    customer = await db["customers"].find_one({"_id": id_obj})  # Find customer by ID
    if not customer:
        logger.warning(f"Customer not found: {id}")  # Log warning if customer not found
        raise HTTPException(status_code=404, detail="Customer not found")  # Raise 404 error
    logger.info(f"Fetched customer: {customer}")  # Log successful fetch
    return Customer(**customer)  # Return the found customer

# Endpoint to update a customer by ID
@router.put("/customers/{id}", response_model=Customer)
async def update_customer(id: str, customer: Customer):
    db = get_database()  # Get MongoDB database reference
    id_obj = convert_to_obj_id(id)
    customer_dict = customer.model_dump(exclude={"id"})  # Convert Pydantic model to dict
    customer_dict.update({
        "updated_at": datetime.utcnow()
    })  # Ensure the ID in the data matches the URL and update timestamp
    result = await db["customers"].replace_one({"_id": id_obj}, customer_dict)  # Update the customer in MongoDB
    if result.matched_count == 0:
        logger.warning(f"Customer not found for update: {id}")  # Log warning if customer not found
        raise HTTPException(status_code=404, detail="Customer not found")  # Raise 404 error
    logger.info(f"Customer updated: {customer_dict}")  # Log successful update
    return Customer(**customer_dict)  # Return the updated customer

# Endpoint to delete a customer by ID
@router.delete("/customers/{id}", status_code=204)
async def delete_customer(id: str):
    db = get_database()
    id_obj = convert_to_obj_id(id)
    result = await db["customers"].delete_one({"_id": id_obj})
    if result.deleted_count == 0:
        logger.warning(f"Customer not found for deletion: {id}")  # Log warning if customer not found
        raise HTTPException(status_code=404, detail="Customer not found")  # Raise 404 error
    logger.info(f"Customer deleted: {id}")  # Log successful deletion

def convert_to_obj_id(id: str):
    try:
        object_id = ObjectId(id)
        return object_id
    except Exception:
        logger.warning(f"Invalid ObjectId for deletion: {id}")
        raise HTTPException(status_code=400, detail="Invalid customer ID format")

