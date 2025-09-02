from pydantic import BaseModel, Field
from typing import Optional

class Product(BaseModel):
    name: str = Field(..., max_length=100, description="Product name is required")
    price: float = Field(..., ge=0, description="Price must be non-negative")
