from fastapi import APIRouter
import json
from pathlib import Path

router = APIRouter(prefix="/security", tags=["Security"])

@router.get("/anomalies")
def anomalies():
    path = Path("audit.log")
    if not path.exists():
        return []

    results = []
    with open(path) as f:
        for line in f:
            e = json.loads(line)
            if e["event"] == "ANOMALY_DETECTED":
                results.append(e)

    return results
