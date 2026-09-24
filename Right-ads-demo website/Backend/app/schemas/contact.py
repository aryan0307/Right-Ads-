from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class ContactCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    email: EmailStr
    phone: str | None = Field(None, max_length=50)
    message: str = Field(..., min_length=1)


class ContactResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: str | None
    message: str
    status: str = "Pending"
    created_at: datetime

    model_config = {"from_attributes": True}
