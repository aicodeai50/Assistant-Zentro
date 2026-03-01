from openai import OpenAI
import os
import json
from app.utils.usage import track_usage
from app.security.abuse import record_request
from app.audit.logger import audit_log

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def call_llm(
    system_prompt: str,
    user_prompt: str,
    endpoint: str,
    api_key: str,
    temperature: float = 0.2,
):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        temperature=temperature,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
    )

    content = response.choices[0].message.content
    token_estimate = len(content) // 4

    track_usage(api_key, endpoint, token_estimate)
    record_request(api_key, token_estimate)

    audit_log(
        event="LLM_CALL",
        actor=api_key,
        metadata={
            "endpoint": endpoint,
            "tokens_estimated": token_estimate,
        },
    )

    try:
        return json.loads(content)
    except Exception:
        return {"raw": content}
