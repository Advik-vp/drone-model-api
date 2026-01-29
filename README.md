# 🚁 Drone Model API - Complete Reference Guide

> **GitHub Repository:** [https://github.com/Advik-vp/drone-model-api](https://github.com/Advik-vp/drone-model-api)

## Project Overview

A production-ready REST API for managing drone models with complete CRUD operations, validation, pagination, Swagger documentation, and a beautiful web dashboard.

## ⚡ Quick Start

### Using the Quick Start Script (Recommended)

```bash
# Clone the repository
git clone https://github.com/Advik-vp/drone-model-api.git
cd drone-model-api

# Run the interactive start script
./start.sh
```

### Manual Setup

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start MongoDB (using Docker)
docker run -d -p 27017:27017 --name mongo mongo:6.0

# Start the backend API
npm start

# In a new terminal, start the frontend
npm run frontend
```

**Access the application:**
- Frontend Dashboard: http://localhost:8080
- Backend API: http://localhost:3000
- API Documentation: http://localhost:3000/api-docs

---

## 🏗️ Project Structure

```
drone-model-api/
├── frontend/
│   ├── index.html              # Web dashboard
│   ├── server.js               # Frontend server
│   └── README.md               # Frontend documentation
├── src/
│   ├── config/
│   │   └── database.js         # MongoDB connection
│   ├── controllers/
│   │   └── droneController.js  # Business logic for CRUD
│   ├── middleware/
│   │   ├── errorHandler.js     # Global error handling
│   │   └── validationMiddleware.js # Request validation
│   ├── models/
│   │   └── Drone.js            # MongoDB schema
│   ├── routes/
│   │   └── droneRoutes.js      # API endpoints
│   ├── validators/
│   │   └── droneValidator.js   # Joi validation schemas
│   ├── swagger.js              # OpenAPI/Swagger config
│   └── index.js                # Application entry point
├── tests/
│   └── drone.test.js           # Jest test suite
├── examples/
│   └── client.example.js       # API client examples
├── .env.example                # Environment variables template
├── .gitignore
├── Dockerfile                  # Container image
├── docker-compose.yml          # Multi-container setup
├── package.json
├── start.sh                    # Quick start script
└── README.md
```

---

## 📊 Data Model Schema

### Drone Schema (MongoDB)

```javascript
{
  _id: ObjectId,
  name: String (required, 2-100 chars),
  category: String (required, enum: ['quadcopter', 'fixed-wing', 'hexacopter', 'octocopter']),
  manufacturer: String (optional),
  maxSpeed: Number (1-500 km/h),
  maxRange: Number (min: 100 meters),
  weight: Number (50-50000 grams),
  dimensions: {
    length: Number (cm),
    width: Number (cm),
    height: Number (cm)
  },
  payloadCapacity: Number (grams, >= 0),
  batteryCapacity: Number (mAh, >= 500),
  firmwareVersion: String (format: X.Y.Z),
  enabled: Boolean (default: true),
  features: [String],
  description: String (max 1000 chars),
  createdAt: DateTime (auto),
  updatedAt: DateTime (auto)
}
```

---

## 🔌 API Endpoints

### 1. **Create Drone Model**
```http
POST /drones
Content-Type: application/json

{
  "name": "DJI Phantom 4 Pro",
  "category": "quadcopter",
  "manufacturer": "DJI",
  "maxSpeed": 72,
  "maxRange": 7000,
  "weight": 1375,
  "dimensions": {
    "length": 35,
    "width": 35,
    "height": 15
  },
  "payloadCapacity": 500,
  "batteryCapacity": 5935,
  "firmwareVersion": "1.2.3",
  "enabled": true,
  "features": ["4K Camera", "50min Flight Time"],
  "description": "Professional camera drone"
}
```

**Response (201)**
```json
{
  "success": true,
  "message": "Drone model created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "DJI Phantom 4 Pro",
    ...
  }
}
```

---

### 2. **Retrieve All Drones**
```http
GET /drones?page=1&limit=10&category=quadcopter&enabled=true&search=phantom
```

**Response (200)**
```json
{
  "success": true,
  "data": [
    { "name": "DJI Phantom 4 Pro", ... }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 45,
    "itemsPerPage": 10
  }
}
```

---

### 3. **Retrieve Single Drone**
```http
GET /drones/{id}
```

**Response (200)**
```json
{
  "success": true,
  "data": { ... }
}
```

---

### 4. **Update Drone**
```http
PUT /drones/{id}
Content-Type: application/json

{
  "maxSpeed": 75,
  "enabled": false
}
```

**Response (200)**
```json
{
  "success": true,
  "message": "Drone model updated successfully",
  "data": { ... }
}
```

---

### 5. **Delete Drone**
```http
DELETE /drones/{id}
```

**Response (200)**
```json
{
  "success": true,
  "message": "Drone model deleted successfully",
  "data": { ... }
}
```

---

### 6. **Get Statistics**
```http
GET /drones/stats/summary
```

**Response (200)**
```json
{
  "success": true,
  "data": [
    {
      "_id": "quadcopter",
      "count": 5,
      "avgMaxSpeed": 65,
      "avgWeight": 1200,
      "avgPayload": 400
    }
  ]
}
```

---

## ✅ Validation Rules

### Field Constraints

| Field | Type | Rules |
|-------|------|-------|
| name | String | 2-100 chars, required |
| category | String | required, enum validation |
| maxSpeed | Number | 1-500 km/h |
| maxRange | Number | >= 100 meters |
| weight | Number | 50-50000 grams |
| payloadCapacity | Number | >= 0 grams |
| batteryCapacity | Number | >= 500 mAh |
| firmwareVersion | String | Format: X.Y.Z (regex: `^\d+\.\d+\.\d+$`) |
| enabled | Boolean | Optional, default: true |

### Error Responses

```json
{
  "success": false,
  "error": "Validation Failed",
  "details": [
    {
      "field": "maxSpeed",
      "message": "Max speed cannot exceed 500 km/h"
    }
  ]
}
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Docker)
- Docker & Docker Compose (optional)

### Local Development

#### 1. **Setup**
```bash
# Clone and navigate
cd DRONE

# Copy environment file
cp .env.example .env

# Install dependencies
npm install

# Start MongoDB locally (or use Docker)
docker run -d -p 27017:27017 --name mongo mongo:6.0
```

#### 2. **Run Development Server**
```bash
npm run dev
```

Server runs at `http://localhost:3000`
Swagger docs at `http://localhost:3000/api-docs`

#### 3. **Test**
```bash
npm test
npm run test:watch
```

---

## 🐳 Docker Deployment

### Build and Run with Docker Compose

```bash
# Start all services (API + MongoDB)
npm run docker:up

# View logs
docker-compose logs -f api

# Stop services
npm run docker:down
```

Or manually:
```bash
# Build image
npm run docker:build

# Run container
docker run -d \
  -p 3000:3000 \
  -e MONGODB_URI=mongodb://localhost:27017/drone_db \
  --name drone-api \
  drone-api:latest
```

---

## 📚 Swagger/OpenAPI Documentation

Visit `http://localhost:3000/api-docs` for interactive API documentation.

### Features:
- Try-it-out functionality
- Request/response schemas
- Parameter descriptions
- Error codes and messages

---

## 🧪 Testing Examples

### Using cURL

```bash
# Create drone
curl -X POST http://localhost:3000/drones \
  -H "Content-Type: application/json" \
  -d '{
    "name": "DJI Mini 3",
    "category": "quadcopter",
    "maxSpeed": 57,
    "maxRange": 5000,
    "weight": 249,
    "dimensions": {"length": 25, "width": 25, "height": 10},
    "payloadCapacity": 200,
    "batteryCapacity": 2250,
    "firmwareVersion": "1.0.0"
  }'

# Get all drones
curl http://localhost:3000/drones

# Get specific drone
curl http://localhost:3000/drones/{id}

# Update drone
curl -X PUT http://localhost:3000/drones/{id} \
  -H "Content-Type: application/json" \
  -d '{"maxSpeed": 60}'

# Delete drone
curl -X DELETE http://localhost:3000/drones/{id}
```

### Using JavaScript/Fetch

```javascript
const apiUrl = 'http://localhost:3000';

// Create drone
const createDrone = async (droneData) => {
  const response = await fetch(`${apiUrl}/drones`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(droneData)
  });
  return response.json();
};

// Get all drones
const getDrones = async (page = 1, limit = 10) => {
  const response = await fetch(`${apiUrl}/drones?page=${page}&limit=${limit}`);
  return response.json();
};

// Get single drone
const getDroneById = async (id) => {
  const response = await fetch(`${apiUrl}/drones/${id}`);
  return response.json();
};

// Update drone
const updateDrone = async (id, updateData) => {
  const response = await fetch(`${apiUrl}/drones/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateData)
  });
  return response.json();
};

// Delete drone
const deleteDrone = async (id) => {
  const response = await fetch(`${apiUrl}/drones/${id}`, {
    method: 'DELETE'
  });
  return response.json();
};

// Usage
(async () => {
  const drone = await createDrone({
    name: "Test Drone",
    category: "quadcopter",
    maxSpeed: 50,
    maxRange: 5000,
    weight: 1000,
    dimensions: { length: 30, width: 30, height: 15 },
    payloadCapacity: 500,
    batteryCapacity: 5000,
    firmwareVersion: "1.0.0"
  });
  console.log(drone);
})();
```

---

## 🔐 Future Enhancements (Phase 2+)

- [ ] JWT Authentication & Authorization
- [ ] API Key management
- [ ] Rate limiting
- [ ] Request logging & monitoring
- [ ] Advanced filtering & search
- [ ] Bulk operations
- [ ] Webhooks
- [ ] GraphQL endpoint
- [ ] Database migrations
- [ ] Redis caching
- [ ] Multi-tenancy support

---

## 📋 Environment Variables

```
NODE_ENV=development|production
PORT=3000
MONGODB_URI=mongodb://user:pass@host:port/db
LOG_LEVEL=debug|info|warn|error
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

---

## 🎯 Performance Features

✅ Pagination (default 10 items/page, max 100)
✅ Database indexing on frequently queried fields
✅ Lean queries for read-only operations
✅ Error handling & validation
✅ CORS enabled
✅ Morgan request logging
✅ Health check endpoint
✅ Docker health checks

---

## 📝 Notes

- All timestamps are in UTC
- IDs are MongoDB ObjectIds
- Responses follow a consistent JSON structure
- Validation happens before database operations
- Database changes trigger automatic `updatedAt` update

