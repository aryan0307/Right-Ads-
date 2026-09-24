from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String, Text

from app.database.connection import Base


class ServiceLead(Base):
    __tablename__ = "service_leads"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=True)
    service_required = Column(String(255), nullable=False)
    budget = Column(String(100), nullable=True)
    message = Column(Text, nullable=True)
    status = Column(String(50), default="New", nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
