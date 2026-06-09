from datetime import date

from sqlalchemy import Column, Date, Integer, String

from app.database.connection import Base


class Certificate(Base):
    __tablename__ = "certificates"

    id = Column(Integer, primary_key=True, index=True)
    certificate_id = Column(String(100), unique=True, nullable=False, index=True)
    name = Column(String(200), nullable=False)
    domain = Column(String(255), nullable=True)
    duration = Column(String(100), nullable=True)
    issue_date = Column(Date, nullable=True)
    pdf_path = Column(String(500), nullable=True)
    status = Column(String(50), default="Valid", nullable=False)
