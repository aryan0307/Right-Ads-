"""
Future WebRTC peer connection manager.

This module is a placeholder for UDP/WebRTC integration.
Do not implement video streaming yet.
"""

from __future__ import annotations

import logging
from typing import Any

logger = logging.getLogger(__name__)


class PeerManager:
    """Manages peer connections for future WebRTC sessions."""

    def __init__(self) -> None:
        self._peers: dict[str, dict[str, Any]] = {}

    def register_peer(self, room_id: str, peer_id: str, metadata: dict[str, Any] | None = None) -> None:
        self._peers.setdefault(room_id, {})[peer_id] = metadata or {}
        logger.debug("Peer registered: room=%s peer=%s", room_id, peer_id)

    def remove_peer(self, room_id: str, peer_id: str) -> None:
        room = self._peers.get(room_id, {})
        room.pop(peer_id, None)
        if not room:
            self._peers.pop(room_id, None)
        logger.debug("Peer removed: room=%s peer=%s", room_id, peer_id)

    def get_room_peers(self, room_id: str) -> dict[str, dict[str, Any]]:
        return dict(self._peers.get(room_id, {}))

    def prepare_ice_servers(self) -> list[dict[str, str]]:
        """Return STUN/TURN config placeholder for future WebRTC setup."""
        return [{"urls": "stun:stun.l.google.com:19302"}]


peer_manager = PeerManager()
