from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.admin import Admin
from app.models.contact import ContactMessage
from app.schemas.contact import ContactCreate, ContactResponse
from app.services.auth import get_current_admin

router = APIRouter(prefix="/api/contact", tags=["contact"])


@router.post("", response_model=ContactResponse, status_code=201)
def submit_contact(payload: ContactCreate, db: Session = Depends(get_db)):
    message = ContactMessage(
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        message=payload.message,
    )
    db.add(message)
    db.commit()
    db.refresh(message)
    return message


@router.get("", response_model=list[ContactResponse])
def list_contact_messages(
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    return db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).all()
