variable "project_name" {
  description = "Project prefix used for AWS resource names."
  type        = string
  default     = "echolake"
}

variable "aws_region" {
  description = "AWS region for lakehouse resources."
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Deployment environment name."
  type        = string
  default     = "dev"
}

variable "emr_release_label" {
  description = "EMR release label with Spark support."
  type        = string
  default     = "emr-7.2.0"
}
