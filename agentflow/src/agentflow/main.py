from fastapi import FastAPI

from agentflow.api.routes import router
from agentflow.core.logging import configure_logging


def create_app() -> FastAPI:
    configure_logging()
    app = FastAPI(
        title="AgentFlow",
        version="0.1.0",
        description="Multi-agent orchestration and automation API.",
    )
    app.include_router(router)
    return app


app = create_app()
