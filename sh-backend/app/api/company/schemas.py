from pydantic import BaseModel
from typing import List

class SkillMatrixRequest(BaseModel):
    team_members: List[str]
    roles: List[str]

class UpskillPlanRequest(BaseModel):
    team_members: List[str]
    target_skills: List[str]
