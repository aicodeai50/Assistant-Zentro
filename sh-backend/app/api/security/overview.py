from fastapi import APIRouter
import json
from pathlib import Path
from app.security.abuse import LOCKED_KEYS
from app.utils.usage import get_usage

router = APIRouter(prefix="/security", tags=["Security"])

AUDIT_LOG_PATH = Path("audit.log")

@router.get("/overview")
def security_overview():
    anomalies = []
    audit_tail = []

    if AUDIT_LOG_PATH.exists():
        with open(AUDIT_LOG_PATH, "r") as f:
            lines = f.readlines()[-200:]
            for line in lines:
                try:
                    e = json.loads(line)
                except Exception:
                    continue

                if e.get("event") in ("ANOMALY_LLM_REPORT", "ANOMALY_DETECTED", "ANOMALY_LLM_DETECTED"):
                    anomalies.append(e)

                audit_tail.append(e)

    return {
        "locked_keys": list(LOCKED_KEYS),
        "anomalies": anomalies[-20:],
        "audit_tail": audit_tail[-50:],
        "usage": get_usage()[-50:],
    }
