import json
import logging

from fastapi import APIRouter, Query, WebSocket, WebSocketDisconnect

from app.database.connection import SessionLocal
from app.services.meeting_manager import verify_meeting_access
from app.services.websocket_manager import meeting_ws_manager

logger = logging.getLogger(__name__)

router = APIRouter(tags=["websocket"])


@router.websocket("/ws/meeting/{room_id}")
async def meeting_websocket(
    websocket: WebSocket,
    room_id: str,
    email: str = Query(...),
):
    db = SessionLocal()
    normalized_email = email.lower().strip()

    try:
        allowed, message, _ = verify_meeting_access(db, email=normalized_email, room_id=room_id)
        if not allowed:
            await websocket.close(code=4003, reason=message[:120])
            return

        await meeting_ws_manager.connect(room_id, normalized_email, websocket)
        await meeting_ws_manager.send_history(db, room_id, websocket)

        while True:
            raw = await websocket.receive_text()
            try:
                payload = json.loads(raw)
            except json.JSONDecodeError:
                continue

            if payload.get("type") == "message" and payload.get("message", "").strip():
                await meeting_ws_manager.handle_message(
                    db,
                    room_id=room_id,
                    sender_email=normalized_email,
                    message=payload["message"].strip(),
                )
    except WebSocketDisconnect:
        logger.info("Client disconnected from room %s", room_id)
    except Exception as exc:
        logger.exception("WebSocket error in room %s: %s", room_id, exc)
    finally:
        meeting_ws_manager.disconnect(room_id, normalized_email)
        db.close()
