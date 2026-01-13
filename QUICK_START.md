# 🚀 Drone Model API - Quick Start Guide

## What's Been Built

A **production-ready drone model management API** with:
- ✅ RESTful CRUD endpoints
- ✅ MongoDB database with Mongoose ODM
- ✅ Comprehensive validation (Joi)
- ✅ OpenAPI/Swagger documentation
- ✅ Docker containerization
- ✅ Jest unit tests
- ✅ CI/CD pipeline (GitHub Actions)
- ✅ Error handling & pagination
- ✅ Client examples
- ✅ Seed script for sample data

---

## 📦 Tech Stack Confirmed

| Layer | Technology |
|-------|-----------|
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB + Mongoose |
| **API Validation** | Joi |
| **Documentation** | Swagger/OpenAPI 3.0 |
| **Testing** | Jest + Supertest |
| **Containerization** | Docker + Docker Compose |
| **CI/CD** | GitHub Actions |

---

## 🚀 5-Minute Setup

### 1. **Install Dependencies**
```bash
cd DRONE
npm install
```

### 2. **Configure Environment**
```bash
cp .env.example .env
# Edit .env if needed (defaults work fine)
```

### 3. **Start MongoDB** (Choose one)

**Option A: Docker (Recommended)**
```bash
npm run docker:up
# or manually: docker-compose up -d
```

**Option B: Local MongoDB**
```bash
# Make sure MongoDB is running on localhost:27017
```

### 4. **Start Development Server**
```bash
npm run dev
# Server runs at http://localhost:3000
```

### 5. **View Documentation**
```bash
# Open browser to:
http://localhost:3000/api-docs
```

---

## 📡 Core API Endpoints

```bash
# Health Check
GET /health

# Create Drone
POST /drones
Body: { name, category, maxSpeed, maxRange, weight, dimensions, payloadCapacity, batteryCapacity, firmwareVersion, ... }

# List Drones (with pagination & filters)
GET /drones?page=1&limit=10&category=quadcopter&search=phantom

# Get Single Drone
GET /drones/:id

# Update Drone
PUT /drones/:id
Body: { /* fields to update */ }

# Delete Drone
DELETE /drones/:id

# Get Statistics
GET /drones/stats/summary
```

---

## 🧪 Quick Testing

### Run All Tests
```bash
npm test                # Run once
npm run test:watch      # Watch mode
```

### Quick Manual Test (cURL)
```bash
# Create a drone
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

# Get single drone (replace {id})
curl http://localhost:3000/drones/{id}
```

### Try in Swagger UI
1. Open http://localhost:3000/api-docs
2. Click "Try it out" on any endpoint
3. Fill in parameters and execute

---

## 💾 Database Schema

```json
{
  "_id": "ObjectId",
  "name": "string (2-100 chars, required)",
  "category": "enum: quadcopter|fixed-wing|hexacopter|octocopter",
  "manufacturer": "string (optional)",
  "maxSpeed": "number (1-500 km/h)",
  "maxRange": "number (min 100m)",
  "weight": "number (50-50000 grams)",
  "dimensions": {
    "length": "number (cm)",
    "width": "number (cm)",
    "height": "number (cm)"
  },
  "payloadCapacity": "number (grams, >= 0)",
  "batteryCapacity": "number (mAh, >= 500)",
  "firmwareVersion": "string (format: X.Y.Z)",
  "enabled": "boolean (default: true)",
  "features": "array of strings",
  "description": "string (max 1000 chars)",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

---

## 📁 Project Structure

```
src/
├── config/database.js          # DB connection
├── controllers/droneController.js
├── middleware/                 # Error handling, validation
├── models/Drone.js            # Mongoose schema
├── routes/droneRoutes.js      # API endpoints
├── validators/                # Joi schemas
├── swagger.js                 # API docs config
└── index.js                   # App entry

tests/
└── drone.test.js              # Full test suite

examples/
└── client.example.js          # Usage examples

scripts/
└── seed.js                    # Populate sample data
```

---

## 🐳 Docker Commands

```bash
# Build and start (all services)
npm run docker:up

# View logs
docker-compose logs -f api

# Stop services
npm run docker:down

# Rebuild image
npm run docker:build
```

---

## 📝 Common Use Cases

### Populate Sample Data
```bash
node scripts/seed.js
```

### Use Client Library (JavaScript)
```javascript
const DroneAPIClient = require('./examples/client.example.js');
const client = new DroneAPIClient('http://localhost:3000');

// Create
const drone = await client.createDrone({...});

// Read
const allDrones = await client.getAllDrones();
const oneDrone = await client.getDroneById(droneId);

// Update
await client.updateDrone(droneId, {maxSpeed: 70});

// Delete
await client.deleteDrone(droneId);

// Stats
const stats = await client.getDroneStats();
```

### Search & Filter
```bash
# By category
GET /drones?category=quadcopter

# By enabled status
GET /drones?enabled=true

# Search by name
GET /drones?search=phantom

# Pagination
GET /drones?page=2&limit=20
```

---

## ✅ Validation Examples

### Valid Request
```json
{
  "name": "DJI Phantom 4 Pro",
  "category": "quadcopter",
  "maxSpeed": 72,
  "maxRange": 7000,
  "weight": 1375,
  "dimensions": {"length": 35, "width": 35, "height": 15},
  "payloadCapacity": 500,
  "batteryCapacity": 5935,
  "firmwareVersion": "1.2.3"
}
```

### Invalid Request (Response 400)
```json
{
  "success": false,
  "error": "Validation Failed",
  "details": [
    {"field": "name", "message": "Name is required"},
    {"field": "maxSpeed", "message": "Max speed must be 1-500 km/h"}
  ]
}
```

---

## 🔒 Security Notes (MVP)

- ✅ Input validation on all fields
- ✅ Error message sanitization
- ✅ CORS enabled
- ✅ MongoDB injection prevention (via Mongoose)

**Phase 2 additions:**
- JWT authentication
- Rate limiting
- Request logging
- Audit trails

---

## 📊 Key Features

### Pagination
```
GET /drones?page=1&limit=10
Limits: default 10, max 100
Returns: data array + pagination metadata
```

### Filtering
```
GET /drones?category=quadcopter&enabled=true&search=phantom
```

### Error Handling
```json
{
  "success": false,
  "error": "Error message",
  "details": ["Optional details"]
}
```

### Health Check
```bash
curl http://localhost:3000/health
# Returns: {"success": true, "message": "Drone API is running"}
```

---

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Port 3000 in use** | `PORT=3001 npm run dev` |
| **MongoDB connection fails** | Check `MONGODB_URI` in `.env` or run `npm run docker:up` |
| **Tests fail** | `npm test -- --clearCache` |
| **Node version error** | Use Node 18+: `node --version` |
| **Module not found** | Run `npm install` again |

---

## 📚 Additional Resources

| File | Purpose |
|------|---------|
| [README.md](./README.md) | Complete API documentation |
| [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) | Detailed technical guide & phases |
| [examples/client.example.js](./examples/client.example.js) | How to use the API |
| [.github/workflows/ci-cd.yml](./.github/workflows/ci-cd.yml) | CI/CD pipeline |
| [tests/drone.test.js](./tests/drone.test.js) | Test examples |

---

## 🎯 What's Next

### Immediate (This Week)
- [x] ✅ MVP API complete
- [x] ✅ Local development working
- [ ] 📝 Team code review
- [ ] 🧪 UAT testing

### Short Term (Next 2 weeks)
- [ ] 🔐 Add JWT authentication
- [ ] 🚦 Implement rate limiting
- [ ] 📊 Add advanced filtering
- [ ] 🔍 Search optimization

### Medium Term (Month 2-3)
- [ ] 🌐 Multi-tenancy support
- [ ] 📱 Mobile API version
- [ ] 🔄 Webhook support
- [ ] 🎛️ Admin dashboard

---

## 💡 Tips & Best Practices

1. **Always validate input** - Use Swagger to test endpoints
2. **Check pagination** - Defaults to 10 items/page
3. **Use categories** - Filter by quadcopter, fixed-wing, etc.
4. **Version your API** - Plan for /v2 routes early
5. **Monitor performance** - Check response times in dev tools
6. **Keep logs** - Morgan logs all requests to console

---

## 🤝 Development Workflow

```bash
# 1. Create feature branch
git checkout -b feature/my-feature

# 2. Make changes
# 3. Run tests
npm test

# 4. Lint code
npm run lint

# 5. Commit and push
git add .
git commit -m "feat: add feature"
git push origin feature/my-feature

# 6. Create pull request
# 7. CI/CD pipeline runs automatically
```

---

## 📞 Support

For issues or questions:
1. Check [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) for detailed info
2. Review [tests/drone.test.js](./tests/drone.test.js) for examples
3. Check [examples/client.example.js](./examples/client.example.js) for usage
4. Visit Swagger docs at `/api-docs`

---

**Happy coding! 🚁✨**
