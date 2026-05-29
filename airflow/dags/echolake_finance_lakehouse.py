"""Airflow orchestration for the EchoLake finance lakehouse."""

from __future__ import annotations

from datetime import datetime

from airflow.decorators import dag
from airflow.operators.bash import BashOperator
from airflow.operators.empty import EmptyOperator


DEFAULT_ARGS = {
    "owner": "data-platform",
    "retries": 1,
}


@dag(
    dag_id="echolake_finance_lakehouse",
    description="Ingest synthetic finance data, write Iceberg bronze, validate, and build dbt marts.",
    start_date=datetime(2026, 1, 1),
    schedule="@daily",
    catchup=False,
    default_args=DEFAULT_ARGS,
    tags=["aws", "iceberg", "dbt", "great-expectations", "finance"],
)
def echolake_finance_lakehouse():
    start = EmptyOperator(task_id="start")

    generate_synthetic_finance = BashOperator(
        task_id="generate_synthetic_finance",
        bash_command=(
            "python3 /opt/airflow/echolake/scripts/generate_synthetic_finance.py "
            "--rows 10000 --output /tmp/echolake/transactions.csv"
        ),
    )

    upload_raw_to_s3 = BashOperator(
        task_id="upload_raw_to_s3",
        bash_command=(
            "aws s3 cp /tmp/echolake/transactions.csv "
            "s3://${ECHOLAKE_BUCKET}/raw/finance/transactions/{{ ds }}/transactions.csv"
        ),
    )

    run_iceberg_bronze_job = BashOperator(
        task_id="run_iceberg_bronze_job",
        bash_command=(
            "spark-submit /opt/airflow/echolake/spark/jobs/bronze_to_iceberg.py "
            "--input s3://${ECHOLAKE_BUCKET}/raw/finance/transactions/{{ ds }}/transactions.csv "
            "--warehouse s3://${ECHOLAKE_BUCKET}/warehouse "
            "--database ${ECHOLAKE_GLUE_DATABASE}"
        ),
    )

    run_quality_gate = BashOperator(
        task_id="run_great_expectations_checkpoint",
        bash_command=(
            "great_expectations checkpoint run echolake_transactions_checkpoint "
            "--directory /opt/airflow/echolake/great_expectations"
        ),
    )

    build_dbt_models = BashOperator(
        task_id="build_dbt_medallion_models",
        bash_command="cd /opt/airflow/echolake/dbt && dbt build --profiles-dir .",
    )

    finish = EmptyOperator(task_id="finish")

    start >> generate_synthetic_finance >> upload_raw_to_s3 >> run_iceberg_bronze_job
    run_iceberg_bronze_job >> run_quality_gate >> build_dbt_models >> finish


echolake_finance_lakehouse()
