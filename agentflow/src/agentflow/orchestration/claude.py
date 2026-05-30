from anthropic import AsyncAnthropic

from agentflow.core.config import get_settings


class ClaudeClient:
    def __init__(self) -> None:
        self.settings = get_settings()
        self._client = (
            AsyncAnthropic(api_key=self.settings.anthropic_api_key)
            if self.settings.anthropic_api_key
            else None
        )

    async def complete(self, *, system: str, user: str, model: str) -> str:
        if self._client is None:
            return self._mock_response(system=system, user=user, model=model)

        response = await self._client.messages.create(
            model=model,
            max_tokens=1200,
            temperature=0.2,
            system=system,
            messages=[{"role": "user", "content": user}],
        )
        return "".join(block.text for block in response.content if getattr(block, "text", None))

    @staticmethod
    def _mock_response(*, system: str, user: str, model: str) -> str:
        role_line = system.split(".", maxsplit=1)[0].replace("You are the ", "")
        return (
            f"[mock:{model}] {role_line} processed the request. "
            f"Input summary: {user[:220]}"
        )
