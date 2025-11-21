Here is a professional, industry-standard `README.md` file based on the project we built. It contains no emojis and focuses strictly on technical implementation and architecture.

You can create a file named `README.md` in your main folder and paste this content directly.

***

# End-to-End DevOps E-Commerce Project

## Project Overview
This project demonstrates the implementation of a complete DevOps lifecycle for a Node.js E-Commerce application. The primary goal is to transition from manual, local deployments to an automated, cloud-native workflow using Kubernetes, Infrastructure as Code (IaC), and GitOps principles.

The infrastructure is provisioned on AWS (Elastic Kubernetes Service) using Terraform. The application delivery is automated using a CI/CD pipeline consisting of GitHub Actions for Continuous Integration and ArgoCD for Continuous Deployment.

## Architecture
1.  **Source Code Management:** GitHub
2.  **Containerization:** Docker
3.  **Infrastructure as Code:** Terraform (AWS VPC, EKS, IAM, Networking)
4.  **Orchestration:** Kubernetes (Amazon EKS)
5.  **Continuous Integration (CI):** GitHub Actions
6.  **Continuous Deployment (CD):** ArgoCD (GitOps)

## Technology Stack
*   **Application:** Node.js, Express.js, HTML/CSS
*   **Cloud Provider:** AWS (us-east-1 region)
*   **Infrastructure:** Terraform
*   **Container Runtime:** Docker
*   **Cluster Management:** kubectl, eksctl
*   **CI/CD:** GitHub Actions, ArgoCD

## Prerequisites
Ensure the following tools are installed and configured on your local machine:
*   VS Code (or preferred editor)
*   Git
*   Docker Desktop (running)
*   AWS CLI (configured with `aws configure`)
*   Terraform
*   Kubectl

## Repository Structure
*   **app/**: Contains the Node.js application source code and Dockerfile.
*   **terraform/**: Contains Infrastructure as Code configuration (main.tf, variables.tf, provider.tf).
*   **kubernetes/**: Contains Kubernetes manifests (deployment.yaml, service.yaml).
*   **.github/workflows/**: Contains the CI pipeline configuration.

---

## Setup and Deployment Guide

### 1. Infrastructure Provisioning
Navigate to the terraform directory to provision the AWS infrastructure. This creates the VPC, Subnets, Security Groups, and EKS Cluster.

```bash
cd terraform
terraform init
terraform apply -auto-approve
```
*Note: Provisioning takes approximately 15-20 minutes.*

### 2. Cluster Connection
Once Terraform completes, configure your local kubectl to communicate with the new EKS cluster.

```bash
aws eks update-kubeconfig --region us-east-1 --name techshop-cluster
```

### 3. GitOps Setup (ArgoCD)
Deploy ArgoCD to the cluster to handle continuous deployment.

```bash
# Create Namespace
kubectl create namespace argocd

# Install ArgoCD
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

Retrieve the initial admin password for ArgoCD:

**For Windows PowerShell:**
```powershell
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}"
# Manually decode the base64 output string
```

**For Bash:**
```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```

Port forward the ArgoCD server to access the dashboard:
```bash
kubectl port-forward svc/argocd-server -n argocd 8080:443
```
Access `https://localhost:8080` in your browser using the username `admin` and the retrieved password.

### 4. Configure Application Sync
1.  In the ArgoCD dashboard, create a **New App**.
2.  **Application Name:** techshop
3.  **Project:** default
4.  **Sync Policy:** Automatic (Check "Prune Resources" and "Self Heal")
5.  **Repository URL:** [Link to your GitHub Repository]
6.  **Path:** kubernetes
7.  **Cluster URL:** https://kubernetes.default.svc
8.  **Namespace:** default

### 5. Verification
Once synced, obtain the external Load Balancer URL to access the application.

```bash
kubectl get svc
```
Copy the address under `EXTERNAL-IP` and navigate to it in your browser.

---

## CI/CD Workflow

### Continuous Integration (GitHub Actions)
*   Trigger: Push to the `main` branch.
*   Action: Builds the Docker image based on `app/Dockerfile`.
*   Output: Pushes the tagged image to Docker Hub.

### Continuous Deployment (ArgoCD)
*   Trigger: Changes to the `kubernetes/` folder manifests in the GitHub repository.
*   Action: ArgoCD detects the state divergence between the Git repository and the Kubernetes cluster.
*   Output: Automatically applies changes (e.g., replica count, image version) to the cluster to match the repository state.

---

## Cleanup (Cost Management)
To avoid incurring AWS charges, destroy the infrastructure when finished. Follow this exact order to ensure all resources, including the Load Balancer, are removed.

1.  **Delete the Application in ArgoCD:**
    ```bash
    kubectl delete application techshop -n argocd
    ```

2.  **Delete the Kubernetes Service (Load Balancer):**
    ```bash
    kubectl delete service techshop-service
    ```
    *Wait 2 minutes for AWS to release the Load Balancer.*

3.  **Destroy Infrastructure:**
    ```bash
    cd terraform
    terraform destroy -auto-approve
    ```

## License
This project is open-source and available for educational purposes.
