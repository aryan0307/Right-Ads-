from fastapi import APIRouter, Depends, File, Form, UploadFile
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.admin import Admin
from app.models.career import CareerApplication
from app.schemas.career import CareerResponse
from app.services.auth import get_current_admin
from app.services.uploads import save_resume

router = APIRouter(prefix="/api/careers", tags=["careers"])


@router.post("", response_model=CareerResponse, status_code=201)
async def submit_career_application(
    name: str = Form(...),
    email: str = Form(...),
    phone: str | None = Form(None),
    skills: str | None = Form(None),
    experience: str | None = Form(None),
    resume: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    resume_path = await save_resume(resume)

    application = CareerApplication(
        name=name,
        email=email,
        phone=phone,
        skills=skills,
        experience=experience,
        resume_path=resume_path,
        status="Pending",
    )
    db.add(application)
    db.commit()
    db.refresh(application)
    return application


@router.get("", response_model=list[CareerResponse])
def list_career_applications(
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    return db.query(CareerApplication).order_by(CareerApplication.id.desc()).all()
