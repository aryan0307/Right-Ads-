from __future__ import annotations

import logging

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.career import CareerApplication
from app.models.contact import ContactMessage
from app.models.lead import ServiceLead
from app.models.meeting import Meeting
from app.services.email_service import (
    send_meeting_approved,
    send_meeting_cancelled,
    send_meeting_created,
)
from app.services.room_service import create_meeting_record, get_meeting_by_room

logger = logging.getLogger(__name__)

APPROVED_STATUSES = {"Approved", "Converted", "Selected", "Valid"}
DECLINED_STATUSES = {"Declined", "Rejected", "Revoked", "Closed"}


def normalize_record_status(status: str | None) -> str:
    if not status:
        return "Pending"
    if status in APPROVED_STATUSES:
        return "Approved"
    if status in DECLINED_STATUSES:
        return "Declined"
    return "Pending"


def email_exists_in_system(db: Session, email: str) -> bool:
    normalized = email.lower().strip()
    if db.query(ContactMessage).filter(ContactMessage.email.ilike(normalized)).first():
        return True
    if db.query(ServiceLead).filter(ServiceLead.email.ilike(normalized)).first():
        return True
    if db.query(CareerApplication).filter(CareerApplication.email.ilike(normalized)).first():
        return True
    return False


def verify_meeting_access(db: Session, *, email: str, room_id: str) -> tuple[bool, str, Meeting | None]:
    normalized = email.lower().strip()
    meeting = get_meeting_by_room(db, room_id)

    if not meeting:
        return False, "Meeting not found", None

    if meeting.status == "Cancelled":
        return False, "This meeting has been cancelled", meeting

    if meeting.status == "Completed":
        return False, "This meeting has already been completed", meeting

    if meeting.client_email.lower() != normalized:
        return False, "Unauthorized Meeting Access", meeting

    if not email_exists_in_system(db, normalized):
        return False, "Unauthorized Meeting Access", meeting

    return True, "Access granted", meeting


def create_meeting_for_approval(
    db: Session,
    *,
    client_name: str,
    client_email: str,
    admin_email: str | None,
    source_type: str,
    source_id: int,
) -> Meeting:
    existing = (
        db.query(Meeting)
        .filter(Meeting.source_type == source_type, Meeting.source_id == source_id)
        .first()
    )
    if existing:
        return existing

    meeting = create_meeting_record(
        db,
        client_name=client_name,
        client_email=client_email,
        admin_email=admin_email,
        source_type=source_type,
        source_id=source_id,
        status="Scheduled",
    )

    send_meeting_created(
        client_email=meeting.client_email,
        client_name=meeting.client_name,
        room_id=meeting.room_id,
        meeting_date=str(meeting.meeting_date),
    )
    send_meeting_approved(
        client_email=meeting.client_email,
        client_name=meeting.client_name,
        room_id=meeting.room_id,
    )
    logger.info("Meeting created: %s for %s", meeting.meeting_id, meeting.client_email)
    return meeting


def update_meeting_status(db: Session, meeting: Meeting, new_status: str) -> Meeting:
    allowed = {"Pending", "Scheduled", "Completed", "Cancelled"}
    if new_status not in allowed:
        raise HTTPException(status_code=400, detail=f"Invalid status. Allowed: {', '.join(sorted(allowed))}")

    meeting.status = new_status
    db.commit()
    db.refresh(meeting)

    if new_status == "Scheduled":
        send_meeting_approved(
            client_email=meeting.client_email,
            client_name=meeting.client_name,
            room_id=meeting.room_id,
        )
    elif new_status == "Cancelled":
        send_meeting_cancelled(
            client_email=meeting.client_email,
            client_name=meeting.client_name,
            room_id=meeting.room_id,
        )

    return meeting
