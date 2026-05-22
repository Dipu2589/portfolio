variable "aws_region" {
  description = "AWS region to deploy infrastructure"
  type        = string
  default     = "us-east-1"
}

variable "bucket_name" {
  description = "Name for the S3 bucket (must be globally unique)"
  type        = string
  default     = "dipu-portfolio-static-bucket-2026"
}

variable "github_repo" {
  description = "GitHub repository formatted as {owner}/{repo}"
  type        = string
  default     = "Dipu2589/portfolio"
}
