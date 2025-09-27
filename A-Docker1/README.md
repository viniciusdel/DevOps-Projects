# Todo Application

A full-stack todo application built with React frontend, Node.js API, MongoDB database, Redis cache, and Nginx proxy.

## Architecture

- **Frontend**: React application
- **API**: Node.js/Express backend
- **Database**: MongoDB
- **Cache**: Redis
- **Proxy**: Nginx reverse proxy

## Prerequisites

- Docker and Docker Compose
- Minikube (for Kubernetes deployment)
- kubectl (for Kubernetes deployment)

## Running with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Stop all services
docker-compose down
```

## Running with Kubernetes

```bash
# 1. Start Minikube
minikube start

# 2. Build images (required)
docker-compose build

# 3. Deploy application
kubectl apply -f k8s/

# 4. Check status
kubectl get pods
```

## Access the Application

- **Docker Compose**: http://localhost:8080
- **Kubernetes**: Use `kubectl get services` to find the proxy service details
