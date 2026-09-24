from __future__ import annotations

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.career import CareerApplication
from app.models.certificate import Certificate
from app.models.contact import ContactMessage
from app.models.internship import InternshipApplication
from app.models.lead import ServiceLead
from app.services.meeting_manager import create_meeting_for_approval, normalize_record_status

MODULE_MAP = {
    "contact": (ContactMessage, "contact"),
    "lead": (ServiceLead, "lead"),
    "career": (CareerApplication, "career"),
    "internship": (InternshipApplication, "internship"),
    "certificate": (Certificate, "certificate"),
}

STATUS_FIELD = {
    "contact": "status",
    "lead": "status",
    "career": "status",
    "internship": "status",
    "certificate": "status",
}


def get_record(db: Session, module: str, record_id: int):
    if module not in MODULE_MAP:
        raise HTTPException(status_code=404, detail="Unknown module")
    model, _ = MODULE_MAP[module]
    record = db.query(model).filter(model.id == record_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")
    return record


def _map_status_for_module(module: str, new_status: str) -> str:
    if module == "certificate":
        if new_status == "Approved":
            return "Valid"
        if new_status == "Declined":
            return "Revoked"
        return "Pending"
    return new_status


def update_record_status(
    db: Session,
    *,
    module: str,
    record_id: int,
    new_status: str,
    admin_email: str | None = None,
    create_meeting: bool = True,
):
    record = get_record(db, module, record_id)
    setattr(record, "status", _map_status_for_module(module, new_status))
    db.commit()
    db.refresh(record)

    if new_status == "Approved" and create_meeting and module in {"contact", "lead"}:
        client_email = getattr(record, "email", None)
        client_name = getattr(record, "name", "Client")
        if client_email:
            create_meeting_for_approval(
                db,
                client_name=client_name,
                client_email=client_email,
                admin_email=admin_email,
                source_type=module,
                source_id=record_id,
            )

    return record


def count_requests_by_status(db: Session) -> dict[str, int]:
    pending = approved = declined = 0

    def tally(status_value: str | None):
        nonlocal pending, approved, declined
        normalized = normalize_record_status(status_value)
        if normalized == "Approved":
            approved += 1
        elif normalized == "Declined":
            declined += 1
        else:
            pending += 1

    for row in db.query(ContactMessage).all():
        tally(getattr(row, "status", "Pending"))
    for row in db.query(ServiceLead).all():
        tally(row.status)
    for row in db.query(CareerApplication).all():
        tally(row.status)
    for row in db.query(InternshipApplication).all():
        tally(row.status)
    for row in db.query(Certificate).all():
        tally(row.status)

    return {
        "pending_requests": pending,
        "approved_requests": approved,
        "declined_requests": declined,
    }
