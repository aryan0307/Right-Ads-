from datetime import datetime
from typing import Literal

from pydantic import BaseModel, EmailStr, Field

LeadStatus = Literal["New", "Contacted", "In Progress", "Converted", "Closed"]


class LeadCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    email: EmailStr
    phone: str | None = Field(None, max_length=50)
    service_required: str = Field(..., min_length=1, max_length=255)
    budget: str | None = Field(None, max_length=100)
    message: str | None = None


class LeadResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: str | None
    service_required: str
    budget: str | None
    message: str | None
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}
