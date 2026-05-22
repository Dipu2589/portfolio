output "cloudfront_domain_name" {
  value       = aws_cloudfront_distribution.cdn.domain_name
  description = "The URL of your CloudFront distribution (Access your site here)"
}

output "cloudfront_distribution_id" {
  value       = aws_cloudfront_distribution.cdn.id
  description = "The ID of the CloudFront distribution for the GitHub Action secret"
}

output "github_actions_role_arn" {
  value       = aws_iam_role.github_actions.arn
  description = "The ARN of the IAM role to use in GitHub Actions for OIDC"
}

output "s3_bucket_name" {
  value       = aws_s3_bucket.portfolio.id
  description = "The name of the S3 bucket hosting site files"
}
