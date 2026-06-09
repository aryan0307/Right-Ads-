import logging
import os

logger = logging.getLogger(__name__)

FROM_EMAIL = os.getenv("FROM_EMAIL", "noreply@rightadsdigital.com")
APP_URL = os.getenv("APP_URL", "http://localhost:5173")


def send_meeting_created(*, client_email: str, client_name: str, room_id: str, meeting_date: str | None) -> None:
    """Prepare meeting-created notification (email sending not yet enabled)."""
    join_url = f"{APP_URL}/meeting/{room_id}"
    logger.info(
        "[EMAIL STUB] sendMeetingCreated → %s | client=%s | room=%s | date=%s | url=%s",
        client_email,
        client_name,
        room_id,
        meeting_date,
        join_url,
    )


def send_meeting_approved(*, client_email: str, client_name: str, room_id: str) -> None:
    """Prepare meeting-approved notification (email sending not yet enabled)."""
    join_url = f"{APP_URL}/meeting/{room_id}"
    logger.info(
        "[EMAIL STUB] sendMeetingApproved → %s | client=%s | url=%s",
        client_email,
        client_name,
        join_url,
    )


def send_meeting_cancelled(*, client_email: str, client_name: str, room_id: str) -> None:
    """Prepare meeting-cancelled notification (email sending not yet enabled)."""
    logger.info(
        "[EMAIL STUB] sendMeetingCancelled → %s | client=%s | room=%s",
        client_email,
        client_name,
        room_id,
    )
