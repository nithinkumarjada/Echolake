from fastapi.testclient import TestClient

from agentflow.main import create_app

client = TestClient(create_app())


def test_health() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_rbac_rejects_missing_key() -> None:
    response = client.get("/metrics")
    assert response.status_code == 401


def test_run_requires_operator_key() -> None:
    response = client.post(
        "/v1/runs",
        headers={"X-API-Key": "local-operator-key"},
        json={"request": "Draft a safe customer support automation summary."},
    )
    assert response.status_code == 200
    payload = response.json()
    assert payload["workflow"] == "default"
    assert len(payload["results"]) == 4
    assert payload["results"][0]["role"] == "intake"


def test_prompt_update_and_rollback() -> None:
    update = client.post(
        "/v1/prompts/planner",
        headers={"X-API-Key": "local-admin-key"},
        json={
            "template": (
                "You are the Planner Agent. Create a rollback-aware workflow plan "
                "with controls."
            ),
            "model": "claude-3-5-haiku-latest",
        },
    )
    assert update.status_code == 200
    assert update.json()["version"] == "v2"

    rollback = client.post(
        "/v1/prompts/planner/rollback",
        headers={"X-API-Key": "local-admin-key"},
    )
    assert rollback.status_code == 200
    assert rollback.json()["version"] == "v1"
