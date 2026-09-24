from datetime import date, datetime

from sqlalchemy import Column, Date, DateTime, Integer, String

from app.database.connection import Base


class Meeting(Base):
    __tablename__ = "meetings"

    id = Column(Integer, primary_key=True, index=True)
    meeting_id = Column(String(100), unique=True, nullable=False, index=True)
    client_email = Column(String(255), nullable=False, index=True)
    client_name = Column(String(200), nullable=False)
    admin_email = Column(String(255), nullable=True)
    status = Column(String(50), default="Pending", nullable=False)
    meeting_date = Column(Date, nullable=True)
    meeting_time = Column(String(20), nullable=True)
    room_id = Column(String(100), unique=True, nullable=False, index=True)
    source_type = Column(String(50), nullable=True)
    source_id = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class MeetingMessage(Base):
    __tablename__ = "meeting_messages"

    id = Column(Integer, primary_key=True, index=True)
    room_id = Column(String(100), nullable=False, index=True)
    sender_email = Column(String(255), nullable=False)
    message = Column(String(2000), nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False)
