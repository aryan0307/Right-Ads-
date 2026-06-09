import os
import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any

router = APIRouter(prefix="/api/chat", tags=["chat"])

class ChatRequest(BaseModel):
    contents: List[Dict[str, Any]]

@router.post("")
async def chat_with_gemini(payload: ChatRequest):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY not configured")

    endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                endpoint,
                json={
                    "contents": payload.contents,
                    "generationConfig": {
                        "temperature": 0.2,
                        "maxOutputTokens": 350
                    }
                },
                timeout=30.0
            )
            
            if response.status_code != 200:
                return response.json()
                
            return response.json()
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
