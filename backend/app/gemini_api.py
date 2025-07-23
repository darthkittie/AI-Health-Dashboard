import httpx
import os
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + GEMINI_API_KEY

async def get_health_advice(prompt: str) -> str:
    headers = {"Content-Type": "application/json"}
    data = {
        "contents": [{"parts": [{"text": prompt}]}]
    }
    async with httpx.AsyncClient() as client:
        response = await client.post(GEMINI_API_URL, json=data, headers=headers)
        try:
            response.raise_for_status()
        except Exception as e:
            print("Gemini API error:", response.text)
            raise
        result = response.json()
        print("Gemini API response:", result)
        # Defensive extraction
        try:
            return result["candidates"][0]["content"]["parts"][0]["text"]
        except Exception as e:
            raise Exception(f"Unexpected Gemini API response format: {result}")