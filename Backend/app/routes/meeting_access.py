from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.schemas.meeting import (
    MeetingAccessRequest,
    MeetingAccessResponse,
    MeetingMessageResponse,
)
from app.services.meeting_manager import verify_meeting_access
from app.services.room_service import get_meeting_messages

router = APIRouter(prefix="/api/contact", tags=["meeting-access"])


@router.post("/meeting-access", response_model=MeetingAccessResponse)
def verify_access(payload: MeetingAccessRequest, db: Session = Depends(get_db)):
    allowed, message, meeting = verify_meeting_access(
        db,
        email=str(payload.email),
        room_id=payload.room_id,
    )
    if not allowed:
        return MeetingAccessResponse(allowed=False, message=message)
    return MeetingAccessResponse(
        allowed=True,
        message=message,
        client_name=meeting.client_name if meeting else None,
        room_id=meeting.room_id if meeting else None,
    )


@router.get("/meeting-messages/{room_id}", response_model=list[MeetingMessageResponse])
def get_messages(
    room_id: str,
    email: str = Query(...),
    db: Session = Depends(get_db),
):
    allowed, message, _ = verify_meeting_access(db, email=email, room_id=room_id)
    if not allowed:
        raise HTTPException(status_code=403, detail=message)
    return get_meeting_messages(db, room_id)
