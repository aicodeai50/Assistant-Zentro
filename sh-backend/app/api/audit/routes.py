from fastapi import APIRouter
from app.audit.verify import verify_audit_log

router = APIRouter(prefix="/audit", tags=["Audit"])

@router.get("/verify")
def verify():
    return {"valid": verify_audit_log()}
