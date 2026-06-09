import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.database.connection import Base, SessionLocal, engine
from app.database.migrations import run_migrations
from app.models import Admin
from app.routes import admin, auth, careers, certificates, contact, internships, leads, meeting_access, websocket
from app.services.auth import hash_password

load_dotenv()

Base.metadata.create_all(bind=engine)
run_migrations()

app = FastAPI(
    title="Right Ads API",
    description="Business API for Right Ads Digital",
    version="2.0.0",
)

_cors_origins = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:5173,http://localhost:5000",
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in _cors_origins if o.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(contact.router)
app.include_router(meeting_access.router)
app.include_router(leads.router)
app.include_router(careers.router)
app.include_router(internships.router)
app.include_router(certificates.router)
app.include_router(admin.router)
app.include_router(websocket.router)


def seed_default_admin():
    db: Session = SessionLocal()
    try:
        if db.query(Admin).count() == 0:
            username = os.getenv("ADMIN_USERNAME", "admin")
            password = os.getenv("ADMIN_PASSWORD", "admin123")
            admin_user = Admin(username=username, password_hash=hash_password(password))
            db.add(admin_user)
            db.commit()
            print(f"Default admin created: {username}")
    finally:
        db.close()


@app.on_event("startup")
def on_startup():
    seed_default_admin()


@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "right-ads-api"}
