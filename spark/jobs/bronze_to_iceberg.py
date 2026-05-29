"""Create or append EchoLake bronze Iceberg transactions from raw CSV."""

from __future__ import annotations

import argparse

from pyspark.sql import SparkSession
from pyspark.sql.functions import col, current_timestamp, to_date, to_timestamp


def build_spark(catalog_name: str, warehouse: str) -> SparkSession:
    return (
        SparkSession.builder.appName("echolake-bronze-to-iceberg")
        .config(f"spark.sql.catalog.{catalog_name}", "org.apache.iceberg.spark.SparkCatalog")
        .config(f"spark.sql.catalog.{catalog_name}.catalog-impl", "org.apache.iceberg.aws.glue.GlueCatalog")
        .config(f"spark.sql.catalog.{catalog_name}.warehouse", warehouse)
        .config(f"spark.sql.catalog.{catalog_name}.io-impl", "org.apache.iceberg.aws.s3.S3FileIO")
        .config("spark.sql.extensions", "org.apache.iceberg.spark.extensions.IcebergSparkSessionExtensions")
        .getOrCreate()
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True, help="S3 or local path to raw transactions CSV.")
    parser.add_argument("--warehouse", required=True, help="S3 warehouse path, for example s3://bucket/warehouse.")
    parser.add_argument("--database", required=True, help="Glue database name.")
    parser.add_argument("--catalog", default="glue_catalog")
    args = parser.parse_args()

    spark = build_spark(args.catalog, args.warehouse)
    table = f"{args.catalog}.{args.database}.bronze_transactions"

    raw = spark.read.option("header", "true").csv(args.input)
    bronze = (
        raw.withColumn("amount", col("amount").cast("decimal(18,2)"))
        .withColumn("transaction_ts", to_timestamp("transaction_ts"))
        .withColumn("ingestion_date", to_date("ingestion_date"))
        .withColumn("loaded_at", current_timestamp())
    )

    spark.sql(f"CREATE DATABASE IF NOT EXISTS {args.catalog}.{args.database}")
    bronze.writeTo(table).using("iceberg").partitionedBy(col("ingestion_date")).createOrReplace()
    spark.stop()


if __name__ == "__main__":
    main()
