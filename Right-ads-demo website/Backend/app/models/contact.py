from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String, Text

from app.database.connection import Base


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=True)
    message = Column(Text, nullable=False)
    status = Column(String(50), default="Pending", nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
