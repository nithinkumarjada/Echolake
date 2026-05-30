# AgentFlow Operator Runbook

## Normal Operation

1. Check API health at `/health`.
2. Check metrics at `/metrics`.
3. Review workflow events at `/v1/audit/events`.
4. Confirm n8n webhook delivery status in the `webhook_dispatched` audit event.

## Broken Automation Response

1. Identify the failed run id from logs or n8n.
2. Fetch audit events and inspect the last successful handoff.
3. If failures started after a prompt change, call `/v1/prompts/{role}/rollback`.
4. Re-run the request with the previous prompt version.
5. If the reviewer agent marks the run as `requires_human_review`, route the payload to an operator queue before dispatching downstream webhooks.

## RBAC

API keys are configured with `AGENTFLOW_API_KEYS`:

```text
key:role,key2:role2
```

Roles:

- `viewer`: health, metrics, audit read.
- `operator`: create runs, read audit logs.
- `admin`: manage prompts and rollbacks.

## Doppler

Recommended production secrets:

- `ANTHROPIC_API_KEY`
- `AGENTFLOW_API_KEYS`
- `N8N_WEBHOOK_URL`
- `N8N_WEBHOOK_TOKEN`

Deploy command:

```bash
doppler run -- uvicorn agentflow.main:app --host 0.0.0.0 --port 8000
```
