# Drone Model API - Deployment Guide

## 🌍 Deployment Options

This guide covers deploying the Drone Model API to various cloud platforms.

---

## 🐳 Docker Deployment (Recommended for MVP)

### Local Docker

```bash
# Build image
docker build -t drone-api:latest .

# Run container (requires MongoDB)
docker run -d \
  --name drone-api \
  -p 3000:3000 \
  -e MONGODB_URI=mongodb://host.docker.internal:27017/drone_db \
  -e NODE_ENV=production \
  drone-api:latest
```

### Docker Compose (Full Stack)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f api

# Stop services
docker-compose down

# Remove volumes
docker-compose down -v
```

**docker-compose.yml** includes:
- API service (Node.js + Express)
- MongoDB service with health checks
- Volume persistence
- Network isolation

---

## ☁️ Cloud Deployments

### 1. **Heroku** (Easiest for MVP)

#### Setup
```bash
# Install Heroku CLI
brew install heroku

# Login
heroku login

# Create app
heroku create drone-api-prod

# Add MongoDB (Atlas)
heroku config:set MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/drone_db
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_production_secret
```

#### Deploy
```bash
# Push to Heroku
git push heroku main

# View logs
heroku logs --tail

# Scale dynos
heroku ps:scale web=2
```

#### Procfile
```
web: node src/index.js
```

---

### 2. **AWS (Elastic Container Service)**

#### Prerequisites
```bash
npm install -g aws-cli
# Configure: aws configure
```

#### Deployment Steps

1. **Push image to ECR**
```bash
# Create ECR repository
aws ecr create-repository --repository-name drone-api --region us-east-1

# Build and push
docker build -t drone-api:latest .
docker tag drone-api:latest <ACCOUNT>.dkr.ecr.us-east-1.amazonaws.com/drone-api:latest
docker push <ACCOUNT>.dkr.ecr.us-east-1.amazonaws.com/drone-api:latest
```

2. **Create ECS Cluster**
```bash
# Use AWS Console or CLI
aws ecs create-cluster --cluster-name drone-api-cluster
```

3. **Create Task Definition**
```json
{
  "family": "drone-api",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [
    {
      "name": "drone-api",
      "image": "<ACCOUNT>.dkr.ecr.us-east-1.amazonaws.com/drone-api:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "hostPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "MONGODB_URI",
          "value": "mongodb+srv://user:pass@cluster.mongodb.net/drone_db"
        },
        {
          "name": "NODE_ENV",
          "value": "production"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/drone-api",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "healthCheck": {
        "command": ["CMD-SHELL", "curl -f http://localhost:3000/health || exit 1"],
        "interval": 30,
        "timeout": 5,
        "retries": 3
      }
    }
  ]
}
```

4. **Create Service**
```bash
aws ecs create-service \
  --cluster drone-api-cluster \
  --service-name drone-api \
  --task-definition drone-api \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx],securityGroups=[sg-xxx],assignPublicIp=ENABLED}" \
  --load-balancers targetGroupArn=arn:aws:...,containerName=drone-api,containerPort=3000
```

---

### 3. **Google Cloud Run** (Serverless)

```bash
# Setup
gcloud init
gcloud auth application-default login

# Build and push
gcloud builds submit --tag gcr.io/PROJECT_ID/drone-api

# Deploy
gcloud run deploy drone-api \
  --image gcr.io/PROJECT_ID/drone-api \
  --platform managed \
  --region us-central1 \
  --memory 512Mi \
  --cpu 1 \
  --set-env-vars MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/drone_db \
  --set-env-vars NODE_ENV=production \
  --allow-unauthenticated
```

---

### 4. **Azure Container Instances**

```bash
# Create ACR (Azure Container Registry)
az acr create --resource-group myResourceGroup \
  --name droneapiregistry --sku Basic

# Build and push
az acr build --registry droneapiregistry \
  --image drone-api:latest .

# Deploy
az container create \
  --resource-group myResourceGroup \
  --name drone-api \
  --image droneapiregistry.azurecr.io/drone-api:latest \
  --ports 3000 \
  --environment-variables \
    MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/drone_db" \
    NODE_ENV="production" \
  --registry-login-server droneapiregistry.azurecr.io \
  --registry-username <username> \
  --registry-password <password>
```

---

### 5. **DigitalOcean App Platform**

```bash
# Create app.yaml
---
name: drone-api
services:
  - name: api
    github:
      repo: username/drone-api
      branch: main
    build_command: npm install
    run_command: npm start
    http_port: 3000
    health_check:
      http_path: /health
    envs:
      - key: MONGODB_URI
        value: ${db.connection_string}
      - key: NODE_ENV
        value: production

databases:
  - name: db
    engine: MONGODB
    version: "6.0"
```

```bash
# Deploy
doctl apps create --spec app.yaml
```

---

## 🔐 Production Deployment Checklist

### Environment Variables
- [ ] `NODE_ENV=production`
- [ ] `MONGODB_URI=` (Atlas or managed service)
- [ ] `JWT_SECRET=` (strong random string)
- [ ] `LOG_LEVEL=info` or `warn`
- [ ] Encrypt sensitive data

### Database
- [ ] MongoDB Atlas cluster (M2 or higher)
- [ ] Enable authentication
- [ ] Configure IP whitelist
- [ ] Enable backups
- [ ] Test failover

### API Security
- [ ] Enable HTTPS/TLS
- [ ] Rate limiting configured
- [ ] CORS properly configured
- [ ] Input validation active
- [ ] Error messages sanitized
- [ ] Logging enabled

### Monitoring & Logging
- [ ] Application metrics collected
- [ ] Error tracking (Sentry, DataDog)
- [ ] Request logging centralized
- [ ] Alerts configured
- [ ] Dashboard set up

### Deployment Process
- [ ] CI/CD pipeline active
- [ ] Automated tests passing
- [ ] Blue-green deployment ready
- [ ] Rollback procedure documented
- [ ] Health checks configured

### Scaling
- [ ] Load balancer configured
- [ ] Auto-scaling rules set
- [ ] Database connection pooling
- [ ] Caching strategy (Redis)
- [ ] CDN for static assets

---

## 📊 Performance Optimization

### Code Level
```javascript
// Enable compression
const compression = require('compression');
app.use(compression());

// Connection pooling
mongoose.set('maxPoolSize', 10);
mongoose.set('minPoolSize', 2);

// Index optimization
db.drones.createIndex({ category: 1 });
db.drones.createIndex({ createdAt: -1 });
```

### Infrastructure
- Use SSD storage
- Enable caching (Redis)
- Load balance across multiple instances
- Use CDN for static content
- Enable gzip compression

### Monitoring Queries
```javascript
// Enable query logging
mongoose.set('debug', true);

// Add performance monitoring
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    console.log(`${req.method} ${req.path} - ${Date.now() - start}ms`);
  });
  next();
});
```

---

## 🚀 CI/CD Pipeline

### GitHub Actions (Included)

Located in `.github/workflows/ci-cd.yml`:

1. **Test Stage**
   - Runs linter
   - Executes unit tests
   - Generates coverage report

2. **Build Stage**
   - Builds Docker image
   - Pushes to registry

3. **Deploy Stage**
   - Triggers deployment
   - Updates production

### Setup

1. Add secrets to GitHub:
   - `DOCKER_USERNAME`
   - `DOCKER_PASSWORD`
   - `DEPLOYMENT_KEY`

2. Configure deployment target in workflow

---

## 🔄 Zero-Downtime Deployment

### Blue-Green Deployment

```bash
# 1. Deploy new version (green)
kubectl apply -f drone-api-green.yaml

# 2. Test green environment
curl http://green.drone-api.com/health

# 3. Switch traffic
kubectl patch service drone-api \
  -p '{"spec":{"selector":{"version":"green"}}}'

# 4. Keep blue running for rollback
# Keep blue for 24-48 hours
```

### Canary Deployment

```bash
# 1. Deploy new version to 10% of instances
# 2. Monitor metrics
# 3. Gradually increase to 100%
# 4. Rollback if issues detected
```

---

## 📋 Rollback Procedures

```bash
# Docker/Kubernetes
kubectl rollout history deployment/drone-api
kubectl rollout undo deployment/drone-api

# Heroku
heroku releases
heroku rollback v42

# AWS ECS
aws ecs update-service \
  --cluster drone-api-cluster \
  --service drone-api \
  --force-new-deployment
```

---

## 🔍 Post-Deployment Verification

```bash
# Health check
curl https://api.dronemodels.com/health

# Create test record
curl -X POST https://api.dronemodels.com/drones \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","category":"quadcopter",...}'

# Query records
curl https://api.dronemodels.com/drones

# Check response time
time curl https://api.dronemodels.com/drones

# Monitor logs
tail -f /var/log/drone-api/app.log
```

---

## 📞 Incident Response

### API Down
1. Check service status
2. Review logs
3. Check database connectivity
4. Execute rollback if needed
5. Open incident
6. Notify stakeholders

### High Latency
1. Check database queries
2. Review server metrics
3. Check cache hit rates
4. Scale up if needed
5. Investigate bottlenecks

### Data Issues
1. Verify backups
2. Check application logs
3. Review recent deployments
4. Restore if necessary
5. Post-incident review

---

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Guide](https://kubernetes.io/docs/)
- [AWS ECS Best Practices](https://docs.aws.amazon.com/AmazonECS/)
- [GCP Run Documentation](https://cloud.google.com/run/docs)
- [Azure Container Instances](https://docs.microsoft.com/azure/container-instances/)

