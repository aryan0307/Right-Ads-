from typing import Literal

from pydantic import BaseModel, EmailStr, Field

CareerStatus = Literal["Pending", "Reviewed", "Shortlisted", "Selected", "Rejected"]


class CareerResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: str | None
    skills: str | None
    experience: str | None
    resume_path: str | None
    status: str

    model_config = {"from_attributes": True}
