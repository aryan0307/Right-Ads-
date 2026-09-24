from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.schemas.auth import AdminLoginRequest, AdminLoginResponse
from app.services.auth import authenticate_admin, create_access_token

router = APIRouter(prefix="/api/admin", tags=["auth"])


@router.post("/login", response_model=AdminLoginResponse)
def admin_login(payload: AdminLoginRequest, db: Session = Depends(get_db)):
    admin = authenticate_admin(db, payload.username, payload.password)
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )

    token = create_access_token(admin.username)
    return AdminLoginResponse(access_token=token, username=admin.username)
