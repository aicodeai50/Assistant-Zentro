import os
from fastapi import Header, HTTPException
from app.security.abuse import is_locked

def require_backend_key(x_api_key: str = Header(default="")):
    expected = os.getenv("BACKEND_API_KEY", "")
    if expected and x_api_key != expected:
        raise HTTPException(status_code=401, detail="Unauthorized")

    if is_locked(x_api_key):
        raise HTTPException(
            status_code=403,
            detail="API key temporarily locked due to abuse"
        )
