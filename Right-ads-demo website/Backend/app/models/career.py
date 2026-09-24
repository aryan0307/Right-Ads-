from sqlalchemy import Column, Integer, String, Text

from app.database.connection import Base


class CareerApplication(Base):
    __tablename__ = "career_applications"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=True)
    skills = Column(Text, nullable=True)
    experience = Column(String(255), nullable=True)
    resume_path = Column(String(500), nullable=True)
    status = Column(String(50), default="Pending", nullable=False)
