# EchoLake Architecture

EchoLake uses AWS-native managed services with Apache Iceberg as the open table format.

## Storage and Catalog

S3 stores raw files and Iceberg table data. Glue Catalog stores database and table metadata. Athena provides SQL access for analysts and dbt model execution.

## Processing

EMR Spark reads raw CSV records, casts fields, adds load metadata, and writes partitioned Iceberg tables. Iceberg provides schema evolution, snapshot isolation, and time-travel reads.

## Transformation

dbt models implement a medallion design:

- Bronze models expose raw Iceberg tables.
- Silver models deduplicate, standardize, and enforce analytic contracts.
- Gold models publish KPI-ready marts.

## Quality

Great Expectations validates critical transaction columns before downstream marts are refreshed. The Airflow DAG blocks dbt builds when quality gates fail.

## Deployment

Terraform provisions S3, Glue, Athena, CloudWatch, and IAM foundations. GitHub Actions validates project structure and sample data generation on each push.
