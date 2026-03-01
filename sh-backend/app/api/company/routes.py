from fastapi import APIRouter, Depends, Request
from app.api.company.schemas import SkillMatrixRequest, UpskillPlanRequest
from app.api.company.services import analyze_skill_matrix, generate_upskill_plan
from app.core.security import require_backend_key
from app.middleware.rate_limit import limiter

router = APIRouter(prefix="/company", tags=["Company"])

@router.post("/skill-matrix")
@limiter.limit("60/minute")
def skill_matrix(
    request: Request,
    data: SkillMatrixRequest,
    _=Depends(require_backend_key),
):
    api_key = request.headers.get("X-API-Key", "unknown")
    return analyze_skill_matrix(data, api_key)

@router.post("/upskill-plan")
@limiter.limit("30/minute")
def upskill_plan(
    request: Request,
    data: UpskillPlanRequest,
    _=Depends(require_backend_key),
):
    api_key = request.headers.get("X-API-Key", "unknown")
    return generate_upskill_plan(data, api_key)
