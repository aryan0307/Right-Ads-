from datetime import date

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.admin import Admin
from app.models.certificate import Certificate
from app.schemas.certificate import CertificateResponse, CertificateVerifyRequest
from app.services.auth import get_current_admin, get_optional_admin
from app.services.uploads import save_certificate_pdf

router = APIRouter(prefix="/api/certificates", tags=["certificates"])


@router.post("", response_model=CertificateResponse)
async def handle_certificate_request(
    request: Request,
    db: Session = Depends(get_db),
    admin: Admin | None = Depends(get_optional_admin),
):
    content_type = request.headers.get("content-type", "")

    if "multipart/form-data" in content_type:
        if not admin:
            raise HTTPException(status_code=401, detail="Admin authentication required")
        form = await request.form()
        certificate_id = form.get("certificate_id")
        name = form.get("name")
        if not certificate_id or not name:
            raise HTTPException(status_code=400, detail="certificate_id and name are required")

        pdf = form.get("pdf")
        pdf_path = None
        if pdf and hasattr(pdf, "filename") and pdf.filename:
            pdf_path = await save_certificate_pdf(pdf)

        issue_date_raw = form.get("issue_date")
        parsed_date = None
        if issue_date_raw:
            try:
                parsed_date = date.fromisoformat(str(issue_date_raw))
            except ValueError:
                raise HTTPException(status_code=400, detail="Invalid issue_date format. Use YYYY-MM-DD")

        return _create_certificate(
            db=db,
            certificate_id=str(certificate_id),
            name=str(name),
            domain=str(form.get("domain")) if form.get("domain") else None,
            duration=str(form.get("duration")) if form.get("duration") else None,
            issue_date=parsed_date,
            cert_status=str(form.get("status") or "Valid"),
            pdf_path=pdf_path,
        )

    payload = await request.json()
    if admin and payload.get("name"):
        issue_date_raw = payload.get("issue_date")
        parsed_date = None
        if issue_date_raw:
            try:
                parsed_date = date.fromisoformat(str(issue_date_raw))
            except ValueError:
                raise HTTPException(status_code=400, detail="Invalid issue_date format. Use YYYY-MM-DD")

        return _create_certificate(
            db=db,
            certificate_id=str(payload["certificate_id"]),
            name=str(payload["name"]),
            domain=payload.get("domain"),
            duration=payload.get("duration"),
            issue_date=parsed_date,
            cert_status=payload.get("status", "Valid"),
            pdf_path=None,
        )

    verify = CertificateVerifyRequest(**payload)
    return _verify_certificate(db, verify.certificate_id)


def _create_certificate(
    db: Session,
    certificate_id: str,
    name: str,
    domain: str | None,
    duration: str | None,
    issue_date: date | None,
    cert_status: str,
    pdf_path: str | None,
) -> Certificate:
    existing = db.query(Certificate).filter(Certificate.certificate_id == certificate_id).first()
    if existing:
        raise HTTPException(status_code=409, detail="Certificate ID already exists")

    cert = Certificate(
        certificate_id=certificate_id,
        name=name,
        domain=domain,
        duration=duration,
        issue_date=issue_date,
        pdf_path=pdf_path,
        status=cert_status,
    )
    db.add(cert)
    db.commit()
    db.refresh(cert)
    return cert


def _verify_certificate(db: Session, certificate_id: str) -> Certificate:
    cert = db.query(Certificate).filter(Certificate.certificate_id == certificate_id).first()
    if not cert:
        raise HTTPException(status_code=404, detail="Certificate not found")
    if cert.status != "Valid":
        raise HTTPException(status_code=403, detail="Certificate has been revoked")
    return cert


@router.get("", response_model=list[CertificateResponse])
def list_certificates(
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    return db.query(Certificate).order_by(Certificate.id.desc()).all()
