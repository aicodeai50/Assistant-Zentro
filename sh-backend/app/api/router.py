from fastapi import APIRouter
from app.api.company.routes import router as company_router
from app.api.security.overview import router as security_router

api_router = APIRouter()
api_router.include_router(company_router)
api_router.include_router(security_router)
