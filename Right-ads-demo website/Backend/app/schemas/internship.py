from pydantic import BaseModel, Field


class InternshipResponse(BaseModel):
    id: int
    name: str
    college: str
    branch: str | None
    year: str | None
    skills: str | None
    domain: str | None
    resume_path: str | None
    status: str

    model_config = {"from_attributes": True}
