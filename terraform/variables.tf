variable "vpc_cidr" {
  description = "CIDR block for VPC"
  default     = "10.0.0.0/16"
}

variable "cluster_name" {
  description = "Name of the EKS Cluster"
  default     = "techshop-cluster"
}