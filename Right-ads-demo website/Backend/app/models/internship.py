from sqlalchemy import Column, Integer, String, Text

from app.database.connection import Base


class InternshipApplication(Base):
    __tablename__ = "internship_applications"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    college = Column(String(255), nullable=False)
    branch = Column(String(255), nullable=True)
    year = Column(String(50), nullable=True)
    skills = Column(Text, nullable=True)
    domain = Column(String(255), nullable=True)
    resume_path = Column(String(500), nullable=True)
    status = Column(String(50), default="Pending", nullable=False)
