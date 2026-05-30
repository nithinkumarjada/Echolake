# AgentFlow

Production-style multi-agent orchestration and automation system built with FastAPI, Anthropic Claude, n8n webhooks, Docker, RBAC, prompt versioning, rollback controls, and operator-focused monitoring.

## What It Does

AgentFlow runs complex work through role-based AI agents:

- Intake Agent: normalizes the user request and extracts constraints.
- Planner Agent: breaks work into executable steps.
- Executor Agent: drafts the operational result.
- Reviewer Agent: checks quality and decides whether human approval is required.

The orchestration engine supports agent handoffs, prompt version pinning, model swaps, safe rollback to earlier prompt versions, human-review checkpoints, webhook-driven automation, and structured audit logs.

## Architecture

```text
Client / n8n
    |
    v
FastAPI API Gateway
    |
    +--> RBAC dependency
    +--> Orchestrator
             |
             +--> Prompt registry
             +--> Claude client
             +--> Human checkpoint policy
             +--> Audit event store
    |
    +--> Webhook dispatcher
    +--> Health and metrics endpoints
```

## Repository Layout

```text
src/agentflow/
  api/              FastAPI routes and RBAC dependencies
  core/             Settings, security, models, monitoring
  agents/           Agent role definitions and prompt templates
  orchestration/    Workflow runner, prompt registry, Claude client
  integrations/     n8n webhook client
tests/              Unit and API tests
docs/               Operator runbook and production notes
docker-compose.yml  Local API container
Dockerfile          Production container image
```

## Quickstart

```bash
cd agentflow
python3 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
cp .env.example .env
uvicorn agentflow.main:app --reload
```

Open [http://localhost:8000/docs](http://localhost:8000/docs).

Run tests:

```bash
pytest
```

## Docker

```bash
cd agentflow
docker compose up --build
```

## API Example

```bash
curl -X POST http://localhost:8000/v1/runs \
  -H "Content-Type: application/json" \
  -H "X-API-Key: local-operator-key" \
  -d '{
    "request": "Summarize failed payment automation incidents and draft a recovery plan.",
    "workflow": "incident_response",
    "metadata": {"source": "demo"}
  }'
```

## Configuration

AgentFlow is designed to work with Doppler or ordinary environment variables.

```bash
doppler run -- uvicorn agentflow.main:app --host 0.0.0.0 --port 8000
```

Required in production:

- `ANTHROPIC_API_KEY`
- `AGENTFLOW_API_KEYS`
- `N8N_WEBHOOK_URL`

The local default uses a deterministic mock Claude client when `ANTHROPIC_API_KEY` is not set, so tests and demos run without live credentials.

## GitHub Deployment

This directory is ready to publish as a standalone GitHub repository:

```bash
cd agentflow
git init
git add .
git commit -m "Initial AgentFlow orchestration system"
gh repo create agentflow --public --source=. --remote=origin --push
```

If you want it inside an existing monorepo, keep the `agentflow/` folder and wire CI from `agentflow/.github/workflows/ci.yml`.
