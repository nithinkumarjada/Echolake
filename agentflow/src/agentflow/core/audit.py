from threading import Lock

from agentflow.core.schemas import AuditEvent


class AuditStore:
    def __init__(self) -> None:
        self._events: list[AuditEvent] = []
        self._lock = Lock()

    def append(self, event: AuditEvent) -> None:
        with self._lock:
            self._events.append(event)

    def list(self, limit: int = 100) -> list[AuditEvent]:
        with self._lock:
            return list(reversed(self._events[-limit:]))


audit_store = AuditStore()
