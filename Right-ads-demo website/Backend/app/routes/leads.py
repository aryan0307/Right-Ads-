from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.admin import Admin
from app.models.lead import ServiceLead
from app.schemas.lead import LeadCreate, LeadResponse
from app.services.auth import get_current_admin

router = APIRouter(prefix="/api/leads", tags=["leads"])


@router.post("", response_model=LeadResponse, status_code=201)
def submit_lead(payload: LeadCreate, db: Session = Depends(get_db)):
    lead = ServiceLead(
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        service_required=payload.service_required,
        budget=payload.budget,
        message=payload.message,
        status="New",
    )
    db.add(lead)
    db.commit()
    db.refresh(lead)
    return lead


@router.get("", response_model=list[LeadResponse])
def list_leads(
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    return db.query(ServiceLead).order_by(ServiceLead.created_at.desc()).all()
