import logging

import structlog

from agentflow.core.config import get_settings


def configure_logging() -> None:
    settings = get_settings()
    logging.basicConfig(level=settings.log_level)
    structlog.configure(
        processors=[
            structlog.processors.TimeStamper(fmt="iso"),
            structlog.processors.add_log_level,
            structlog.processors.JSONRenderer(),
        ],
        wrapper_class=structlog.make_filtering_bound_logger(logging.getLevelName(settings.log_level)),
        cache_logger_on_first_use=True,
    )
