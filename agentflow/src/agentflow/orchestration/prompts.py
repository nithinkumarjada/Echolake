from threading import Lock

from agentflow.agents.roles import DEFAULT_PROMPTS
from agentflow.core.config import get_settings
from agentflow.core.schemas import AgentRole, PromptVersion


class PromptRegistry:
    def __init__(self) -> None:
        settings = get_settings()
        self._versions: dict[AgentRole, list[PromptVersion]] = {
            role: [
                PromptVersion(
                    role=role,
                    version="v1",
                    template=template,
                    model=settings.anthropic_model,
                )
            ]
            for role, template in DEFAULT_PROMPTS.items()
        }
        self._lock = Lock()

    def latest(self, role: AgentRole) -> PromptVersion:
        with self._lock:
            return self._versions[role][-1]

    def get(self, role: AgentRole, version: str | None = None) -> PromptVersion:
        with self._lock:
            versions = self._versions[role]
            if version is None:
                return versions[-1]
            for prompt in versions:
                if prompt.version == version:
                    return prompt
        raise KeyError(f"Prompt {role}:{version} not found")

    def add(self, role: AgentRole, template: str, model: str | None = None) -> PromptVersion:
        with self._lock:
            version = f"v{len(self._versions[role]) + 1}"
            prompt = PromptVersion(
                role=role,
                version=version,
                template=template,
                model=model or self._versions[role][-1].model,
            )
            self._versions[role].append(prompt)
            return prompt

    def rollback(self, role: AgentRole) -> PromptVersion:
        with self._lock:
            if len(self._versions[role]) > 1:
                self._versions[role].pop()
            return self._versions[role][-1]

    def list_versions(self, role: AgentRole) -> list[PromptVersion]:
        with self._lock:
            return list(self._versions[role])


prompt_registry = PromptRegistry()
