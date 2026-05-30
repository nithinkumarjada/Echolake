from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_env: str = "local"
    log_level: str = "INFO"
    anthropic_api_key: str | None = None
    anthropic_model: str = "claude-3-5-sonnet-latest"
    agentflow_api_keys: str = "local-operator-key:operator,local-admin-key:admin"
    n8n_webhook_url: str | None = None
    n8n_webhook_token: str | None = None
    human_review_risk_threshold: float = Field(default=0.72, ge=0.0, le=1.0)

    @property
    def api_key_roles(self) -> dict[str, str]:
        roles: dict[str, str] = {}
        for pair in self.agentflow_api_keys.split(","):
            if not pair.strip():
                continue
            key, _, role = pair.partition(":")
            if key and role:
                roles[key.strip()] = role.strip()
        return roles


@lru_cache
def get_settings() -> Settings:
    return Settings()
