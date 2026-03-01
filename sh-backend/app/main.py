from fastapi import FastAPI
from slowapi.errors import RateLimitExceeded
from slowapi import _rate_limit_exceeded_handler
from app.api.router import api_router
from app.middleware.rate_limit import limiter
from app.tasks.anomaly_monitor import start_anomaly_monitor

app = FastAPI(title="SH Assistant Backend")

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.include_router(api_router)

@app.on_event("startup")
def startup():
    start_anomaly_monitor()
