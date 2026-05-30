from setuptools import find_packages, setup

INSTALL_REQUIRES = [
    "anthropic>=0.40.0",
    "fastapi>=0.115.0",
    "httpx>=0.27.0",
    "pydantic>=2.8.0",
    "pydantic-settings>=2.4.0",
    "python-dotenv>=1.0.1",
    "structlog>=24.4.0",
    "uvicorn[standard]>=0.30.0",
]

DEV_REQUIRES = [
    "pytest>=8.3.0",
    "pytest-asyncio>=0.24.0",
    "ruff>=0.6.0",
]


setup(
    name="agentflow",
    version="0.1.0",
    description=(
        "Multi-agent orchestration and automation system using FastAPI, Claude, "
        "n8n, and Docker."
    ),
    packages=find_packages("src"),
    package_dir={"": "src"},
    python_requires=">=3.11",
    install_requires=INSTALL_REQUIRES,
    extras_require={"dev": DEV_REQUIRES},
)
