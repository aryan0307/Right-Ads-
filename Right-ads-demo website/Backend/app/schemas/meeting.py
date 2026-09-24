from datetime import date, datetime
from typing import Literal

from pydantic import BaseModel, EmailStr, Field

MeetingStatus = Literal["Pending", "Scheduled", "Completed", "Cancelled"]
RecordStatus = Literal["Pending", "Approved", "Declined"]


class MeetingResponse(BaseModel):
    id: int
    meeting_id: str
    client_email: str
    client_name: str
    admin_email: str | None
    status: str
    meeting_date: date | None
    meeting_time: str | None
    room_id: str
    source_type: str | None
    source_id: int | None
    created_at: datetime

    model_config = {"from_attributes": True}


class MeetingStatusUpdate(BaseModel):
    status: MeetingStatus


class MeetingAccessRequest(BaseModel):
    email: EmailStr
    room_id: str = Field(..., min_length=1)


class MeetingAccessResponse(BaseModel):
    allowed: bool
    message: str
    client_name: str | None = None
    room_id: str | None = None


class MeetingMessageResponse(BaseModel):
    id: int
    room_id: str
    sender_email: str
    message: str
    timestamp: datetime

    model_config = {"from_attributes": True}


class RecordStatusUpdate(BaseModel):
    status: RecordStatus
    create_meeting: bool = True


class AnalyticsResponse(BaseModel):
    total_leads: int
    pending_requests: int
    approved_requests: int
    declined_requests: int
    scheduled_meetings: int
    completed_meetings: int
