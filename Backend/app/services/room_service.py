from __future__ import annotations

import uuid
from datetime import date, datetime, timedelta

from sqlalchemy.orm import Session

from app.models.meeting import Meeting, MeetingMessage


def generate_meeting_id() -> str:
    return f"RA-{uuid.uuid4().hex[:8].upper()}"


def generate_room_id() -> str:
    return f"room-{uuid.uuid4().hex[:12]}"


def default_meeting_schedule() -> tuple[date, str]:
    scheduled = datetime.utcnow() + timedelta(days=1)
    return scheduled.date(), scheduled.strftime("%H:%M")


def create_meeting_record(
    db: Session,
    *,
    client_name: str,
    client_email: str,
    admin_email: str | None = None,
    source_type: str | None = None,
    source_id: int | None = None,
    status: str = "Scheduled",
) -> Meeting:
    meeting_date, meeting_time = default_meeting_schedule()
    meeting = Meeting(
        meeting_id=generate_meeting_id(),
        client_email=client_email.lower().strip(),
        client_name=client_name,
        admin_email=admin_email,
        status=status,
        meeting_date=meeting_date,
        meeting_time=meeting_time,
        room_id=generate_room_id(),
        source_type=source_type,
        source_id=source_id,
    )
    db.add(meeting)
    db.commit()
    db.refresh(meeting)
    return meeting


def get_meeting_by_room(db: Session, room_id: str) -> Meeting | None:
    return db.query(Meeting).filter(Meeting.room_id == room_id).first()


def get_meeting_messages(db: Session, room_id: str) -> list[MeetingMessage]:
    return (
        db.query(MeetingMessage)
        .filter(MeetingMessage.room_id == room_id)
        .order_by(MeetingMessage.timestamp.asc())
        .all()
    )


def save_meeting_message(db: Session, *, room_id: str, sender_email: str, message: str) -> MeetingMessage:
    msg = MeetingMessage(
        room_id=room_id,
        sender_email=sender_email.lower().strip(),
        message=message[:2000],
    )
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg
