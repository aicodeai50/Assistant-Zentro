import json
import time
import statistics
from pathlib import Path
from collections import defaultdict
from app.audit.logger import audit_log

AUDIT_LOG_PATH = Path("audit.log")

# configurable thresholds
MAX_CALLS_PER_5MIN = 50
MAX_UNIQUE_ENDPOINTS = 5

def load_events(window_seconds=300):
    if not AUDIT_LOG_PATH.exists():
        return []

    cutoff = time.time() - window_seconds
    events = []

    with open(AUDIT_LOG_PATH, "r") as f:
        for line in f:
            e = json.loads(line)
            if e["ts"] >= cutoff:
                events.append(e)

    return events

def detect_anomalies():
    events = load_events()
    if not events:
        return

    per_actor = defaultdict(list)
    for e in events:
        per_actor[e["actor"]].append(e)

    for actor, logs in per_actor.items():
        _analyze_actor(actor, logs)

def _analyze_actor(actor, logs):
    llm_calls = [e for e in logs if e["event"] == "LLM_CALL"]
    endpoints = {e["metadata"].get("endpoint") for e in llm_calls}

    # Rule 1: call burst
    if len(llm_calls) > MAX_CALLS_PER_5MIN:
        _flag(actor, "High request burst", severity="high", count=len(llm_calls))

    # Rule 2: endpoint hopping
    if len(endpoints) > MAX_UNIQUE_ENDPOINTS:
        _flag(actor, "Endpoint hopping", severity="medium", endpoints=list(endpoints))

    # Rule 3: token spike (simple heuristic)
    tokens = [e["metadata"].get("tokens_estimated", 0) for e in llm_calls]
    if tokens and max(tokens) > (statistics.mean(tokens) * 4):
        _flag(actor, "Token spike anomaly", severity="high")

def _flag(actor, reason, severity="low", **details):
    audit_log(
        event="ANOMALY_DETECTED",
        actor=actor,
        metadata={
            "reason": reason,
            "severity": severity,
            **details,
        },
    )
