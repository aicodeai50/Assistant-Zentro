import json
import os
from pathlib import Path
from collections import defaultdict

from app.utils.llm import call_llm
from app.audit.logger import audit_log
from app.security.abuse import lock_key

AUDIT_LOG_PATH = Path("audit.log")

ENABLE_LLM_AUTOLOCK = os.getenv(
    "ENABLE_LLM_AUTOLOCK", "false"
).lower() in ("1", "true", "yes")

MIN_CONFIDENCE_TO_LOCK = float(
    os.getenv("LLM_AUTOLOCK_MIN_CONFIDENCE", "0.8")
)

def load_recent_events(limit=200):
    if not AUDIT_LOG_PATH.exists():
        return []

    with open(AUDIT_LOG_PATH, "r") as f:
        lines = f.readlines()[-limit:]

    events = []
    for line in lines:
        try:
            events.append(json.loads(line))
        except Exception:
            continue
    return events


def summarize_by_actor(events):
    per_actor = defaultdict(
        lambda: {
            "llm_calls": 0,
            "tokens_estimated": 0,
            "endpoints": defaultdict(int),
            "event_counts": defaultdict(int),
        }
    )

    for e in events:
        actor = e.get("actor") or "unknown"
        per_actor[actor]["event_counts"][e.get("event", "UNKNOWN")] += 1

        if e.get("event") == "LLM_CALL":
            per_actor[actor]["llm_calls"] += 1
            md = e.get("metadata") or {}
            per_actor[actor]["tokens_estimated"] += int(
                md.get("tokens_estimated", 0) or 0
            )
            per_actor[actor]["endpoints"][md.get("endpoint", "unknown")] += 1

    out = {}
    for actor, s in per_actor.items():
        out[actor] = {
            "llm_calls": s["llm_calls"],
            "tokens_estimated": s["tokens_estimated"],
            "endpoints": dict(s["endpoints"]),
            "event_counts": dict(s["event_counts"]),
        }
    return out


def run_llm_anomaly_detection():
    events = load_recent_events()
    if not events:
        return

    summary = summarize_by_actor(events)

    system_prompt = (
        "You are a SOC analyst AI. Detect suspicious API usage. "
        "Return ONLY valid JSON. Be conservative."
    )

    user_prompt = (
        "Analyze the following per-actor usage summary and identify abuse.\n\n"
        "Return JSON with this schema:\n"
        "{\n"
        '  "findings": [\n'
        "    {\n"
        '      "actor": "string",\n'
        '      "suspicious": true|false,\n'
        '      "severity": "low|medium|high|critical",\n'
        '      "confidence": 0.0,\n'
        '      "reason": "short explanation",\n'
        '      "recommended_action": "monitor|throttle|lock_key|investigate"\n'
        "    }\n"
        "  ]\n"
        "}\n\n"
        "Summary:\n"
        f"{json.dumps(summary, indent=2)}"
    )

    result = call_llm(
        system_prompt=system_prompt,
        user_prompt=user_prompt,
        endpoint="llm-anomaly-detection",
        api_key="system",
    )

    if not isinstance(result, dict):
        return

    findings = result.get("findings")
    if not isinstance(findings, list):
        return

    audit_log(
        event="ANOMALY_LLM_REPORT",
        actor="system",
        metadata={"findings": findings, "autolock_enabled": ENABLE_LLM_AUTOLOCK},
    )

    if not ENABLE_LLM_AUTOLOCK:
        return

    for f in findings:
        if not isinstance(f, dict):
            continue

        actor = (f.get("actor") or "").strip()
        if actor in ("", "unknown", "system"):
            continue

        if (
            f.get("recommended_action") == "lock_key"
            and f.get("severity") in ("high", "critical")
            and float(f.get("confidence", 0)) >= MIN_CONFIDENCE_TO_LOCK
        ):
            audit_log(
                event="AUTO_LOCK_TRIGGERED",
                actor="system",
                metadata=f,
            )
            lock_key(actor, f"LLM autolock: {f.get('reason')}")
