from datetime import UTC, datetime
from enum import StrEnum
from uuid import uuid4

from pydantic import BaseModel, Field


class RunStatus(StrEnum):
    completed = "completed"
    requires_human_review = "requires_human_review"
    failed = "failed"


class AgentRole(StrEnum):
    intake = "intake"
    planner = "planner"
    executor = "executor"
    reviewer = "reviewer"


class WorkflowRunRequest(BaseModel):
    request: str = Field(min_length=5)
    workflow: str = "default"
    metadata: dict[str, str] = Field(default_factory=dict)
    prompt_version: str | None = None
    model_override: str | None = None


class AgentResult(BaseModel):
    role: AgentRole
    content: str
    risk_score: float = Field(default=0.0, ge=0.0, le=1.0)
    handoff_to: AgentRole | None = None
    prompt_version: str
    model: str


class WorkflowRunResponse(BaseModel):
    run_id: str = Field(default_factory=lambda: str(uuid4()))
    status: RunStatus
    workflow: str
    results: list[AgentResult]
    final_output: str
    human_review_reason: str | None = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))


class PromptVersion(BaseModel):
    role: AgentRole
    version: str
    template: str
    model: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))


class PromptUpdateRequest(BaseModel):
    template: str = Field(min_length=20)
    model: str | None = None


class AuditEvent(BaseModel):
    event_type: str
    run_id: str | None = None
    detail: dict[str, str | float | int | bool | None] = Field(default_factory=dict)
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))
