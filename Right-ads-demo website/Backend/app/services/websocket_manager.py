from __future__ import annotations

import json
import logging
from typing import Any

from fastapi import WebSocket
from sqlalchemy.orm import Session

from app.services.room_service import get_meeting_messages, save_meeting_message

logger = logging.getLogger(__name__)


class MeetingConnectionManager:
    def __init__(self) -> None:
        self.active_connections: dict[str, dict[str, WebSocket]] = {}

    async def connect(self, room_id: str, email: str, websocket: WebSocket) -> None:
        await websocket.accept()
        self.active_connections.setdefault(room_id, {})[email] = websocket
        logger.info("WS connected: room=%s email=%s", room_id, email)

    def disconnect(self, room_id: str, email: str) -> None:
        room = self.active_connections.get(room_id, {})
        room.pop(email, None)
        if not room:
            self.active_connections.pop(room_id, None)
        logger.info("WS disconnected: room=%s email=%s", room_id, email)

    async def broadcast(self, room_id: str, payload: dict[str, Any]) -> None:
        room = self.active_connections.get(room_id, {})
        dead: list[str] = []
        for email, ws in room.items():
            try:
                await ws.send_json(payload)
            except Exception:
                dead.append(email)
        for email in dead:
            self.disconnect(room_id, email)

    async def send_history(self, db: Session, room_id: str, websocket: WebSocket) -> None:
        messages = get_meeting_messages(db, room_id)
        await websocket.send_json({
            "type": "history",
            "messages": [
                {
                    "id": m.id,
                    "sender_email": m.sender_email,
                    "message": m.message,
                    "timestamp": m.timestamp.isoformat(),
                }
                for m in messages
            ],
        })

    async def handle_message(
        self,
        db: Session,
        *,
        room_id: str,
        sender_email: str,
        message: str,
    ) -> dict[str, Any]:
        saved = save_meeting_message(
            db,
            room_id=room_id,
            sender_email=sender_email,
            message=message,
        )
        payload = {
            "type": "message",
            "id": saved.id,
            "sender_email": saved.sender_email,
            "message": saved.message,
            "timestamp": saved.timestamp.isoformat(),
        }
        await self.broadcast(room_id, payload)
        return payload


meeting_ws_manager = MeetingConnectionManager()
