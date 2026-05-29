output "lakehouse_bucket" {
  description = "S3 bucket for raw, bronze, silver, and gold lakehouse data."
  value       = aws_s3_bucket.lakehouse.bucket
}

output "glue_database" {
  description = "Glue database used by Iceberg tables."
  value       = aws_glue_catalog_database.lakehouse.name
}

output "athena_workgroup" {
  description = "Athena workgroup for EchoLake queries."
  value       = aws_athena_workgroup.lakehouse.name
}

output "emr_service_role_arn" {
  description = "IAM role ARN for EMR jobs."
  value       = aws_iam_role.emr_service_role.arn
}
