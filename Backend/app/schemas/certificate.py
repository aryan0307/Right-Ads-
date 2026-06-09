from datetime import date
from typing import Literal

from pydantic import BaseModel, Field

CertificateStatus = Literal["Valid", "Revoked"]


class CertificateVerifyRequest(BaseModel):
    certificate_id: str = Field(..., min_length=1, max_length=100)


class CertificateCreate(BaseModel):
    certificate_id: str = Field(..., min_length=1, max_length=100)
    name: str = Field(..., min_length=1, max_length=200)
    domain: str | None = Field(None, max_length=255)
    duration: str | None = Field(None, max_length=100)
    issue_date: date | None = None
    status: CertificateStatus = "Valid"


class CertificateResponse(BaseModel):
    id: int
    certificate_id: str
    name: str
    domain: str | None
    duration: str | None
    issue_date: date | None
    pdf_path: str | None
    status: str

    model_config = {"from_attributes": True}
