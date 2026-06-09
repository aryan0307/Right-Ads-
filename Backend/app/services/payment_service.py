"""
Future payment gateway integration layer.

Razorpay / bank verification are NOT implemented.
This module only defines the architecture for future integration.
"""

from __future__ import annotations

import logging
from typing import Any

logger = logging.getLogger(__name__)


class PaymentService:
    """Placeholder for future payment gateway operations."""

    def create_payment_intent(self, *, amount: float, currency: str, metadata: dict[str, Any]) -> dict[str, Any]:
        logger.info("[PAYMENT STUB] create_payment_intent amount=%s currency=%s", amount, currency)
        return {"status": "not_implemented", "metadata": metadata}

    def verify_bank_account(self, *, account_number: str, ifsc: str) -> dict[str, Any]:
        logger.info("[PAYMENT STUB] verify_bank_account ifsc=%s", ifsc)
        return {"verified": False, "reason": "Bank verification not yet enabled"}

    def handle_webhook(self, payload: dict[str, Any]) -> None:
        logger.info("[PAYMENT STUB] handle_webhook received")


payment_service = PaymentService()
