from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import date, datetime
from pydantic_mongo import AbstractRepository, PydanticObjectId


class Customer(BaseModel):
    id: Optional[PydanticObjectId] = Field(None, alias="_id", readOnly=True)
    firstName: str = Field(..., max_length=50, description="First name is required")
    lastName: str = Field(..., max_length=50, description="Last name is required")
    email: Optional[str]= Field(..., max_length=50, description="Email is required")
    phone: Optional[str] = Field(None, pattern=r'^[+]?[0-9\- ]{7,15}$', description="Phone number format is invalid")
    address: Optional[str] = None
    dateOfBirth: Optional[date] = Field(None, description="Date of birth must be in the past")
    active: Optional[bool] = True
    createdAt: Optional[datetime] = None
    updatedAt: Optional[datetime] = None
