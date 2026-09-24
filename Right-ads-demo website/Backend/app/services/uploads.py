import os
import uuid
from pathlib import Path

from fastapi import HTTPException, UploadFile, status

ALLOWED_RESUME_EXTENSIONS = {".pdf", ".docx"}
ALLOWED_CERTIFICATE_EXTENSIONS = {".pdf"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

BASE_DIR = Path(__file__).resolve().parent.parent.parent
UPLOAD_DIR = Path(os.getenv("UPLOAD_DIR", "./uploads"))
if not UPLOAD_DIR.is_absolute():
    UPLOAD_DIR = BASE_DIR / UPLOAD_DIR

RESUME_DIR = UPLOAD_DIR / "resumes"
CERTIFICATE_DIR = UPLOAD_DIR / "certificates"


def _ensure_dirs():
    RESUME_DIR.mkdir(parents=True, exist_ok=True)
    CERTIFICATE_DIR.mkdir(parents=True, exist_ok=True)


def _validate_extension(filename: str, allowed: set[str]) -> str:
    ext = Path(filename).suffix.lower()
    if ext not in allowed:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid file type. Allowed: {', '.join(sorted(allowed))}",
        )
    return ext


async def save_resume(file: UploadFile) -> str:
    _ensure_dirs()
    if not file.filename:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Resume file is required")

    ext = _validate_extension(file.filename, ALLOWED_RESUME_EXTENSIONS)
    content = await file.read()

    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="File exceeds 10 MB limit")

    if not content:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Empty file uploaded")

    unique_name = f"{uuid.uuid4().hex}{ext}"
    file_path = RESUME_DIR / unique_name
    file_path.write_bytes(content)

    return str(file_path.relative_to(BASE_DIR)).replace("\\", "/")


async def save_certificate_pdf(file: UploadFile) -> str:
    _ensure_dirs()
    if not file.filename:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Certificate PDF is required")

    ext = _validate_extension(file.filename, ALLOWED_CERTIFICATE_EXTENSIONS)
    content = await file.read()

    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="File exceeds 10 MB limit")

    if not content:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Empty file uploaded")

    unique_name = f"{uuid.uuid4().hex}{ext}"
    file_path = CERTIFICATE_DIR / unique_name
    file_path.write_bytes(content)

    return str(file_path.relative_to(BASE_DIR)).replace("\\", "/")
