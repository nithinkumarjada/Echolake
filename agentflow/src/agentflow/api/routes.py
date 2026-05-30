from fastapi import APIRouter, Depends, HTTPException

from agentflow.core.audit import audit_store
from agentflow.core.schemas import (
    AgentRole,
    AuditEvent,
    PromptUpdateRequest,
    PromptVersion,
    WorkflowRunRequest,
    WorkflowRunResponse,
)
from agentflow.core.security import Role, require_role
from agentflow.orchestration.prompts import prompt_registry
from agentflow.orchestration.runner import Orchestrator

router = APIRouter()

VIEWER_AUTH = Depends(require_role(Role.viewer))
OPERATOR_AUTH = Depends(require_role(Role.operator))
ADMIN_AUTH = Depends(require_role(Role.admin))


@router.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@router.get("/metrics")
async def metrics(_: Role = VIEWER_AUTH) -> dict[str, int]:
    events = audit_store.list(limit=1000)
    return {
        "audit_events": len(events),
        "completed_runs": sum(
            1
            for event in events
            if event.event_type == "run_finished" and event.detail.get("status") == "completed"
        ),
        "human_review_runs": sum(
            1
            for event in events
            if event.event_type == "run_finished"
            and event.detail.get("status") == "requires_human_review"
        ),
    }


@router.post("/v1/runs", response_model=WorkflowRunResponse)
async def create_run(
    request: WorkflowRunRequest,
    _: Role = OPERATOR_AUTH,
) -> WorkflowRunResponse:
    return await Orchestrator().run(request)


@router.get("/v1/audit/events", response_model=list[AuditEvent])
async def audit_events(
    limit: int = 100,
    _: Role = VIEWER_AUTH,
) -> list[AuditEvent]:
    return audit_store.list(limit=limit)


@router.get("/v1/prompts/{role}", response_model=list[PromptVersion])
async def list_prompt_versions(
    role: AgentRole,
    _: Role = VIEWER_AUTH,
) -> list[PromptVersion]:
    return prompt_registry.list_versions(role)


@router.post("/v1/prompts/{role}", response_model=PromptVersion)
async def update_prompt(
    role: AgentRole,
    request: PromptUpdateRequest,
    _: Role = ADMIN_AUTH,
) -> PromptVersion:
    return prompt_registry.add(role, request.template, request.model)


@router.post("/v1/prompts/{role}/rollback", response_model=PromptVersion)
async def rollback_prompt(
    role: AgentRole,
    _: Role = ADMIN_AUTH,
) -> PromptVersion:
    try:
        return prompt_registry.rollback(role)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
