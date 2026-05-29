#!/usr/bin/env python3
"""Lightweight local validation for the EchoLake repository."""

from __future__ import annotations

import csv
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
REQUIRED_FILES = [
    "terraform/main.tf",
    "terraform/variables.tf",
    "spark/jobs/bronze_to_iceberg.py",
    "airflow/dags/echolake_finance_lakehouse.py",
    "dbt/dbt_project.yml",
    "dbt/models/bronze/bronze_transactions.sql",
    "dbt/models/silver/silver_transactions.sql",
    "dbt/models/gold/gold_daily_finance_kpis.sql",
    "great_expectations/expectations/transactions_expectation_suite.json",
]


def require_files() -> None:
    missing = [path for path in REQUIRED_FILES if not (ROOT / path).exists()]
    if missing:
        raise SystemExit(f"Missing required files: {', '.join(missing)}")


def validate_sample() -> None:
    sample = ROOT / "data/raw/transactions.csv"
    if not sample.exists():
        print("No sample data found; skipping CSV validation.")
        return
    with sample.open(encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        required_columns = {"transaction_id", "account_id", "amount", "transaction_ts", "ingestion_date"}
        if not required_columns.issubset(reader.fieldnames or []):
            raise SystemExit("Sample data is missing required transaction columns.")
        first_row = next(reader, None)
        if first_row is None:
            raise SystemExit("Sample data has no rows.")
        float(first_row["amount"])


def validate_sql_layers() -> None:
    dbt_models = ROOT / "dbt/models"
    model_files = {path.stem for path in dbt_models.rglob("*.sql")}
    sql = "\n".join(path.read_text(encoding="utf-8") for path in dbt_models.rglob("*.sql"))
    required_models = {"bronze_transactions", "silver_transactions", "gold_daily_finance_kpis"}
    missing = sorted(required_models - model_files)
    if missing:
        raise SystemExit(f"Required dbt models missing: {', '.join(missing)}")
    required_refs = ["bronze_transactions", "silver_transactions"]
    missing_refs = [term for term in required_refs if term not in sql]
    if missing_refs:
        raise SystemExit(f"dbt lineage references missing: {', '.join(missing_refs)}")


def main() -> None:
    require_files()
    validate_sample()
    validate_sql_layers()
    print("EchoLake validation passed.")


if __name__ == "__main__":
    main()
