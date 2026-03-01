import threading
import time
from app.ai.anomaly import detect_anomalies
from app.ai.llm_anomaly import run_llm_anomaly_detection

def start_anomaly_monitor(interval_seconds=300):
    def loop():
        while True:
            try:
                detect_anomalies()
                run_llm_anomaly_detection()
            except Exception as e:
                print("[ANOMALY ERROR]", e)
            time.sleep(interval_seconds)

    thread = threading.Thread(target=loop, daemon=True)
    thread.start()
