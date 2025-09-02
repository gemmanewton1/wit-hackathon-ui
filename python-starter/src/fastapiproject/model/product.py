from pydantic import BaseModel, Field
from typing import Optional
from pydantic_mongo import AbstractRepository, PydanticObjectId

class Product(BaseModel):
    id: Optional[PydanticObjectId] = Field(None, alias="_id", readOnly=True)
    name: str = Field(..., max_length=100, description="Product name is required")
    price: float = Field(..., ge=0, description="Price must be non-negative")
