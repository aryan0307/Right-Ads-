from fastapi import APIRouter, Depends, File, Form, UploadFile
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.admin import Admin
from app.models.internship import InternshipApplication
from app.schemas.internship import InternshipResponse
from app.services.auth import get_current_admin
from app.services.uploads import save_resume

router = APIRouter(prefix="/api/internships", tags=["internships"])


@router.post("", response_model=InternshipResponse, status_code=201)
async def submit_internship_application(
    name: str = Form(...),
    college: str = Form(...),
    branch: str | None = Form(None),
    year: str | None = Form(None),
    skills: str | None = Form(None),
    domain: str | None = Form(None),
    resume: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    resume_path = await save_resume(resume)

    application = InternshipApplication(
        name=name,
        college=college,
        branch=branch,
        year=year,
        skills=skills,
        domain=domain,
        resume_path=resume_path,
        status="Pending",
    )
    db.add(application)
    db.commit()
    db.refresh(application)
    return application


@router.get("", response_model=list[InternshipResponse])
def list_internship_applications(
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    return db.query(InternshipApplication).order_by(InternshipApplication.id.desc()).all()
