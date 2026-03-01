from app.utils.llm import call_llm

def analyze_skill_matrix(data, api_key: str):
    return call_llm(
        system_prompt="You are an enterprise AI skill analyst.",
        user_prompt=f"Team: {data.team_members}, Roles: {data.roles}",
        endpoint="skill-matrix",
        api_key=api_key,
    )

def generate_upskill_plan(data, api_key: str):
    return call_llm(
        system_prompt="You are a corporate L&D expert.",
        user_prompt=f"Team: {data.team_members}, Skills: {data.target_skills}",
        endpoint="upskill-plan",
        api_key=api_key,
    )
