from fastapi import APIRouter
from app.security.abuse import LOCKED_KEYS, LOCK_EXPIRY

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/locked-keys")
def locked_keys():
    return {
        "locked": list(LOCKED_KEYS),
        "expiry": LOCK_EXPIRY,
    }

@router.post("/unlock/{api_key}")
def unlock(api_key: str):
    LOCKED_KEYS.discard(api_key)
    LOCK_EXPIRY.pop(api_key, None)
    return {"status": "unlocked"}
