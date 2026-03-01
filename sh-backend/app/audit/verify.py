import json
import hashlib
from pathlib import Path

AUDIT_LOG_PATH = Path("audit.log")

def _hash(data: str) -> str:
    return hashlib.sha256(data.encode()).hexdigest()

def verify_audit_log() -> bool:
    if not AUDIT_LOG_PATH.exists():
        return True

    prev_hash = "GENESIS"

    with open(AUDIT_LOG_PATH, "r") as f:
        for line in f:
            entry = json.loads(line)

            expected_prev = entry["prev_hash"]
            if expected_prev != prev_hash:
                print("❌ Chain broken")
                return False

            payload = {
                k: entry[k]
                for k in entry
                if k not in ("hash",)
            }

            calculated = _hash(
                json.dumps(payload, sort_keys=True)
            )

            if calculated != entry["hash"]:
                print("❌ Hash mismatch")
                return False

            prev_hash = entry["hash"]

    print("✅ Audit log intact")
    return True
