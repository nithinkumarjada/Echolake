# EchoLake

EchoLake is a production-style modern data lakehouse on AWS using S3, Glue, EMR, Athena, Apache Iceberg, dbt, Airflow, Great Expectations, Terraform, and GitHub Actions.

The project models a financial analytics pipeline with a medallion architecture:

- Bronze: raw synthetic financial transactions landed in S3 and registered as Iceberg tables
- Silver: standardized, deduplicated, quality-checked transaction facts
- Gold: analytics marts for account risk, merchant performance, and daily finance KPIs

## Architecture

```text
Synthetic Finance Data
        |
        v
S3 Raw Zone -> EMR Spark + Iceberg -> Glue Catalog
        |                 |
        |                 v
        |          dbt Bronze/Silver/Gold Models
        |                 |
        v                 v
Great Expectations <- Athena Query Layer
        |
        v
Airflow DAG Orchestration + GitHub Actions CI/CD
```

## Repository Layout

```text
airflow/dags/                  Airflow DAG for orchestration
dbt/                           dbt project with medallion models
great_expectations/            Data quality expectations and checkpoint
scripts/                       Synthetic data generation and validation scripts
spark/jobs/                    PySpark Iceberg job
terraform/                     AWS infrastructure as code
docs/                          Architecture notes and query examples
.github/workflows/ci.yml       CI checks
```

## Local Quickstart

Generate a sample financial dataset:

```bash
python3 scripts/generate_synthetic_finance.py --rows 1000 --output data/raw/transactions.csv
```

Validate the repository structure and SQL model conventions:

```bash
python3 scripts/validate_project.py
```

## AWS Deployment Flow

1. Configure AWS credentials with permissions for S3, Glue, EMR, Athena, IAM, CloudWatch, and EC2 networking.
2. Create infrastructure:

```bash
cd terraform
terraform init
terraform plan -var="project_name=echolake" -var="aws_region=us-east-1"
terraform apply -var="project_name=echolake" -var="aws_region=us-east-1"
```

3. Upload raw data to the Terraform-created S3 raw prefix.
4. Submit `spark/jobs/bronze_to_iceberg.py` on EMR with Iceberg packages enabled.
5. Run dbt models against Athena or Glue-backed Iceberg tables.
6. Trigger the Airflow DAG `echolake_finance_lakehouse`.

## Notes

This repository is designed to be deployable with real AWS credentials, while still being reviewable locally without provisioning cloud resources.
