from enum import StrEnum

from fastapi import Header, HTTPException, status

from agentflow.core.config import get_settings


class Role(StrEnum):
    viewer = "viewer"
    operator = "operator"
    admin = "admin"


ROLE_LEVELS = {
    Role.viewer: 1,
    Role.operator: 2,
    Role.admin: 3,
}


def require_role(minimum_role: Role):
    async def dependency(x_api_key: str | None = Header(default=None)) -> Role:
        settings = get_settings()
        if not x_api_key or x_api_key not in settings.api_key_roles:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Missing or invalid API key.",
            )

        actual = Role(settings.api_key_roles[x_api_key])
        if ROLE_LEVELS[actual] < ROLE_LEVELS[minimum_role]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Requires {minimum_role} role.",
            )
        return actual

    return dependency
