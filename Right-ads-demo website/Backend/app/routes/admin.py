import os

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.admin import Admin
from app.models.lead import ServiceLead
from app.models.meeting import Meeting
from app.schemas.meeting import (
    AnalyticsResponse,
    MeetingResponse,
    MeetingStatusUpdate,
    RecordStatusUpdate,
)
from app.services.auth import get_current_admin
from app.services.meeting_manager import update_meeting_status
from app.services.status_service import count_requests_by_status, update_record_status

router = APIRouter(prefix="/api/admin", tags=["admin"])

APP_URL = os.getenv("APP_URL", "https://right-ads-ten.vercel.app")


@router.get("/analytics", response_model=AnalyticsResponse)
def get_analytics(
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    counts = count_requests_by_status(db)
    scheduled = db.query(Meeting).filter(Meeting.status == "Scheduled").count()
    completed = db.query(Meeting).filter(Meeting.status == "Completed").count()
    total_leads = db.query(ServiceLead).count()

    return AnalyticsResponse(
        total_leads=total_leads,
        pending_requests=counts["pending_requests"],
        approved_requests=counts["approved_requests"],
        declined_requests=counts["declined_requests"],
        scheduled_meetings=scheduled,
        completed_meetings=completed,
    )


@router.get("/meetings", response_model=list[MeetingResponse])
def list_meetings(
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    return db.query(Meeting).order_by(Meeting.created_at.desc()).all()


@router.patch("/meetings/{meeting_id}/status", response_model=MeetingResponse)
def patch_meeting_status(
    meeting_id: int,
    payload: MeetingStatusUpdate,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    return update_meeting_status(db, meeting, payload.status)


@router.patch("/records/{module}/{record_id}/status")
def patch_record_status(
    module: str,
    record_id: int,
    payload: RecordStatusUpdate,
    db: Session = Depends(get_db),
    admin: Admin = Depends(get_current_admin),
):
    admin_email = os.getenv("ADMIN_EMAIL", f"{admin.username}@rightadsdigital.com")
    record = update_record_status(
        db,
        module=module,
        record_id=record_id,
        new_status=payload.status,
        admin_email=admin_email,
        create_meeting=payload.create_meeting,
    )
    return {
        "id": record.id,
        "module": module,
        "status": getattr(record, "status", payload.status),
    }
