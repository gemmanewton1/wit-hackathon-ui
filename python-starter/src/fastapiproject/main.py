# Import necessary modules from FastAPI
from fastapi import FastAPI
from .routers.customer_router import router as customer_router  # Import the customer router
from .routers.product_router import router as product_router  # Import the product router

# Create a FastAPI app instance
app = FastAPI()

# Include the customer and product routers
app.include_router(customer_router)
app.include_router(product_router)
