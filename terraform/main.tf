locals {
  name_prefix = "${var.project_name}-${var.environment}"
  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

resource "aws_s3_bucket" "lakehouse" {
  bucket = "${local.name_prefix}-lakehouse"
  tags   = local.common_tags
}

resource "aws_s3_bucket_versioning" "lakehouse" {
  bucket = aws_s3_bucket.lakehouse.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "lakehouse" {
  bucket = aws_s3_bucket.lakehouse.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_glue_catalog_database" "lakehouse" {
  name        = replace("${local.name_prefix}_lakehouse", "-", "_")
  description = "Glue catalog database for EchoLake Apache Iceberg tables."
}

resource "aws_athena_workgroup" "lakehouse" {
  name = "${local.name_prefix}-athena"

  configuration {
    enforce_workgroup_configuration = true

    result_configuration {
      output_location = "s3://${aws_s3_bucket.lakehouse.bucket}/athena-results/"
    }
  }

  tags = local.common_tags
}

resource "aws_cloudwatch_log_group" "airflow" {
  name              = "/aws/echolake/${var.environment}/airflow"
  retention_in_days = 30
  tags              = local.common_tags
}

resource "aws_iam_role" "emr_service_role" {
  name = "${local.name_prefix}-emr-service-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Service = "elasticmapreduce.amazonaws.com"
      }
      Action = "sts:AssumeRole"
    }]
  })

  tags = local.common_tags
}

resource "aws_iam_role_policy" "emr_lakehouse_policy" {
  name = "${local.name_prefix}-emr-lakehouse-policy"
  role = aws_iam_role.emr_service_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:ListBucket",
          "glue:*",
          "athena:*",
          "logs:*"
        ]
        Resource = "*"
      }
    ]
  })
}
