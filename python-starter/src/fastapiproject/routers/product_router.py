from fastapiproject.db import get_database
from fastapi import APIRouter, HTTPException, Path
from typing import List
from ..model.product import Product
import uuid
import logging

router = APIRouter()
logger = logging.getLogger("product_router")
logging.basicConfig(level=logging.INFO)

# Endpoint to create a new product
@router.post("/products", response_model=Product, status_code=201)
async def create_product(product: Product):
    db = get_database()  # Get MongoDB database reference
    product_id = str(uuid.uuid4())  # Generate a unique product ID
    product_dict = product.model_dump()  # Convert Pydantic model to dict
    product_dict["id"] = product_id  # Add generated ID to product data
    await db["products"].insert_one(product_dict)  # Insert product into MongoDB
    logger.info(f"Product created: {product_dict}")  # Log creation
    return Product(**product_dict)  # Return the created product

# Endpoint to get all products
@router.get("/products", response_model=List[Product])
async def get_all_products():
    db = get_database()  # Get MongoDB database reference
    products_cursor = db["products"].find()  # Query all products
    products = [Product(**doc) async for doc in products_cursor]  # Convert each MongoDB doc to Product model
    logger.info(f"Fetched {len(products)} products")  # Log fetch count
    return products  # Return list of products

# Endpoint to get a product by ID
@router.get("/products/{id}", response_model=Product)
async def get_product_by_id(id: str = Path(...)):
    db = get_database()  # Get MongoDB database reference
    product = await db["products"].find_one({"id": id})  # Find product by ID
    if not product:
        logger.warning(f"Product not found: {id}")  # Log warning if product not found
        raise HTTPException(status_code=404, detail="Product not found")  # Raise 404 error
    logger.info(f"Fetched product: {product}")  # Log successful fetch
    return Product(**product)  # Return the found product

# Endpoint to update a product by ID
@router.put("/products/{id}", response_model=Product)
async def update_product(id: str, product: Product):
    db = get_database()  # Get MongoDB database reference
    product_dict = product.model_dump()  # Convert Pydantic model to dict
    product_dict["id"] = id  # Ensure the ID in the data matches the URL
    result = await db["products"].replace_one({"id": id}, product_dict)  # Update the product in MongoDB
    if result.matched_count == 0:
        logger.warning(f"Product not found for update: {id}")  # Log warning if product not found
        raise HTTPException(status_code=404, detail="Product not found")  # Raise 404 error
    logger.info(f"Product updated: {product_dict}")  # Log successful update
    return Product(**product_dict)  # Return the updated product

# Endpoint to delete a product by ID
@router.delete("/products/{id}", status_code=204)
async def delete_product(id: str):
    db = get_database()  # Get MongoDB database reference
    result = await db["products"].delete_one({"id": id})  # Delete the product from MongoDB
    if result.deleted_count == 0:
        logger.warning(f"Product not found for deletion: {id}")  # Log warning if product not found
        raise HTTPException(status_code=404, detail="Product not found")  # Raise 404 error
    logger.info(f"Product deleted: {id}")  # Log successful deletion
