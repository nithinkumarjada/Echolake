.PHONY: install test lint run docker

install:
	pip install -e ".[dev]"

test:
	pytest

lint:
	ruff check .

run:
	uvicorn agentflow.main:app --reload

docker:
	docker compose up --build
