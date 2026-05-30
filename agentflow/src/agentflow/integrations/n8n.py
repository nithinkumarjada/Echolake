import httpx

from agentflow.core.config import get_settings
from agentflow.core.schemas import WorkflowRunResponse


class N8nWebhookClient:
    def __init__(self) -> None:
        self.settings = get_settings()

    async def dispatch(self, run: WorkflowRunResponse) -> bool:
        if not self.settings.n8n_webhook_url:
            return False

        headers = {}
        if self.settings.n8n_webhook_token:
            headers["Authorization"] = f"Bearer {self.settings.n8n_webhook_token}"

        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.post(
                self.settings.n8n_webhook_url,
                headers=headers,
                json=run.model_dump(mode="json"),
            )
            response.raise_for_status()
            return True
