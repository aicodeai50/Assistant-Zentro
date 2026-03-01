import time

USAGE_LOG = []

def track_usage(
    api_key: str,
    endpoint: str,
    tokens_estimated: int = 0,
):
    USAGE_LOG.append({
        "api_key": api_key[:6] + "***",
        "endpoint": endpoint,
        "tokens": tokens_estimated,
        "timestamp": int(time.time()),
    })

def get_usage():
    return USAGE_LOG
