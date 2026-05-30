from agentflow.core.audit import audit_store
from agentflow.core.config import get_settings
from agentflow.core.schemas import (
    AgentResult,
    AgentRole,
    AuditEvent,
    RunStatus,
    WorkflowRunRequest,
    WorkflowRunResponse,
)
from agentflow.integrations.n8n import N8nWebhookClient
from agentflow.orchestration.claude import ClaudeClient
from agentflow.orchestration.prompts import prompt_registry

HANDOFFS = {
    AgentRole.intake: AgentRole.planner,
    AgentRole.planner: AgentRole.executor,
    AgentRole.executor: AgentRole.reviewer,
    AgentRole.reviewer: None,
}


class Orchestrator:
    def __init__(self) -> None:
        self.settings = get_settings()
        self.claude = ClaudeClient()
        self.n8n = N8nWebhookClient()

    async def run(self, request: WorkflowRunRequest) -> WorkflowRunResponse:
        run = WorkflowRunResponse(
            status=RunStatus.completed,
            workflow=request.workflow,
            results=[],
            final_output="",
        )
        audit_store.append(
            AuditEvent(
                event_type="run_started",
                run_id=run.run_id,
                detail={"workflow": request.workflow},
            )
        )

        context = request.request
        for role in AgentRole:
            prompt = prompt_registry.get(role, request.prompt_version)
            model = request.model_override or prompt.model
            content = await self.claude.complete(system=prompt.template, user=context, model=model)
            risk = self._risk_score(role=role, content=content, request_text=request.request)
            result = AgentResult(
                role=role,
                content=content,
                risk_score=risk,
                handoff_to=HANDOFFS[role],
                prompt_version=prompt.version,
                model=model,
            )
            run.results.append(result)
            audit_store.append(
                AuditEvent(
                    event_type="agent_completed",
                    run_id=run.run_id,
                    detail={
                        "role": role.value,
                        "risk_score": risk,
                        "handoff_to": HANDOFFS[role].value if HANDOFFS[role] else None,
                    },
                )
            )
            context = f"{context}\n\n{role.value.upper()} OUTPUT:\n{content}"

        max_risk = max(result.risk_score for result in run.results)
        run.final_output = run.results[-1].content
        if max_risk >= self.settings.human_review_risk_threshold:
            run.status = RunStatus.requires_human_review
            run.human_review_reason = (
                f"Risk score {max_risk:.2f} met threshold "
                f"{self.settings.human_review_risk_threshold:.2f}."
            )
        else:
            dispatched = await self.n8n.dispatch(run)
            audit_store.append(
                AuditEvent(
                    event_type="webhook_dispatched",
                    run_id=run.run_id,
                    detail={"dispatched": dispatched},
                )
            )

        audit_store.append(
            AuditEvent(
                event_type="run_finished",
                run_id=run.run_id,
                detail={"status": run.status.value},
            )
        )
        return run

    @staticmethod
    def _risk_score(*, role: AgentRole, content: str, request_text: str) -> float:
        risky_terms = ("production", "delete", "payment", "secret", "credential", "customer")
        base = 0.2 if role != AgentRole.reviewer else 0.35
        text = f"{request_text} {content}".lower()
        signal = sum(term in text for term in risky_terms)
        return min(0.95, base + signal * 0.12)
