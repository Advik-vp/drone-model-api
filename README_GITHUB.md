# 🚁 Drone Model API

![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?style=flat-square)
![Express](https://img.shields.io/badge/Express-4.18-blue?style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?style=flat-square)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square)
![Tests](https://img.shields.io/badge/Tests-40%2B-brightgreen?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

A **production-ready REST API** for managing drone models with comprehensive CRUD operations, MongoDB integration, Docker support, and complete documentation.

## ✨ Features

✅ **Complete CRUD API**
- Create, Read, Update, Delete drone models
- Advanced pagination and filtering
- Full-text search functionality

✅ **Data Management**
- 14+ drone specification fields
- Category classification (quadcopter, fixed-wing, hexacopter, octocopter)
- Performance metrics (speed, range, weight, capacity)

✅ **Validation & Security**
- Comprehensive Joi validation
- Input sanitization
- Error handling
- Type checking

✅ **Documentation**
- OpenAPI/Swagger 3.0
- Interactive API documentation
- JavaScript client examples
- cURL examples

✅ **Testing & Quality**
- 40+ Jest unit tests
- >80% code coverage
- All CRUD operations tested
- Integration tests

✅ **DevOps Ready**
- Docker containerization
- docker-compose setup
- GitHub Actions CI/CD
- Health check endpoints
- Multiple deployment options

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Docker (optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/drone-model-api.git
cd drone-model-api

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
```

### Run Locally

**Option 1: With Docker (Recommended)**
```bash
npm run docker:up
# API runs at http://localhost:3000
# Swagger docs at http://localhost:3000/api-docs
```

**Option 2: Development Mode**
```bash
npm run dev
# API runs at http://localhost:3000
# Auto-reloads on file changes
```

**Option 3: Production Mode**
```bash
npm start
```

### Verify Installation

```bash
# Health check
curl http://localhost:3000/health

# View API documentation
open http://localhost:3000/api-docs

# Run tests
npm test
```

## 📚 API Endpoints

### Create Drone
```http
POST /drones
Content-Type: application/json

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

### List Drones
```http
GET /drones?page=1&limit=10&category=quadcopter&search=phantom
```

### Get Single Drone
```http
GET /drones/{id}
```

### Update Drone
```http
PUT /drones/{id}
Content-Type: application/json

{
  "maxSpeed": 75,
  "enabled": false
}
```

### Delete Drone
```http
DELETE /drones/{id}
```

### Statistics
```http
GET /drones/stats/summary
```

## 📖 Documentation

| Document | Purpose |
|----------|---------|
| [QUICK_START.md](./QUICK_START.md) | 5-minute setup guide |
| [README_API.md](./README.md) | Complete API reference |
| [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) | Architecture & design |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Cloud deployment guides |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Contributing guidelines |
| [CHANGELOG.md](./CHANGELOG.md) | Version history |

## 🧪 Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# With coverage report
npm test -- --coverage
```

Test suite includes:
- CRUD operation tests
- Validation error tests
- Pagination tests
- Filtering tests
- Edge case handling
- Error handling tests

## 🐳 Docker

### Build Image
```bash
npm run docker:build
```

### Run with Docker Compose
```bash
# Start services
npm run docker:up

# View logs
docker-compose logs -f api

# Stop services
npm run docker:down
```

## 🔧 Configuration

Copy `.env.example` to `.env` and configure:

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/drone_db
LOG_LEVEL=debug
JWT_SECRET=your_secret_key
```

## 📊 Data Model

```javascript
{
  _id: ObjectId,
  name: String,
  category: 'quadcopter' | 'fixed-wing' | 'hexacopter' | 'octocopter',
  manufacturer: String,
  maxSpeed: Number,
  maxRange: Number,
  weight: Number,
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  payloadCapacity: Number,
  batteryCapacity: Number,
  firmwareVersion: String (X.Y.Z),
  enabled: Boolean,
  features: [String],
  description: String,
  createdAt: DateTime,
  updatedAt: DateTime
}
```

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 18+ |
| Framework | Express.js 4.18+ |
| Database | MongoDB 6.0+ |
| ODM | Mongoose 7.5+ |
| Validation | Joi 17.11+ |
| Testing | Jest 29.7+ |
| Documentation | Swagger/OpenAPI 3.0 |
| Container | Docker Latest |
| CI/CD | GitHub Actions |

## 📦 Project Structure

```
drone-model-api/
├── src/
│   ├── index.js                 # Express app entry
│   ├── swagger.js               # API documentation
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── models/
│   │   └── Drone.js             # Data schema
│   ├── controllers/
│   │   └── droneController.js   # Business logic
│   ├── routes/
│   │   └── droneRoutes.js       # API endpoints
│   ├── validators/
│   │   └── droneValidator.js    # Validation schemas
│   └── middleware/
│       ├── errorHandler.js      # Error handling
│       └── validationMiddleware.js
├── tests/
│   └── drone.test.js            # Test suite
├── examples/
│   └── client.example.js        # Usage examples
├── scripts/
│   └── seed.js                  # Sample data
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

## 🚀 Deployment

### Docker Deployment
```bash
docker build -t drone-api:latest .
docker run -p 3000:3000 \
  -e MONGODB_URI=mongodb://mongodb:27017/drone_db \
  drone-api:latest
```

### Cloud Platforms
See [DEPLOYMENT.md](./DEPLOYMENT.md) for:
- Heroku deployment
- AWS ECS
- Google Cloud Run
- Azure Container Instances
- DigitalOcean

## 🔐 Security

✅ Input validation on all endpoints
✅ Mongoose schema validation
✅ Error message sanitization
✅ CORS configuration
✅ HTTP header security
✅ MongoDB injection prevention

## 📈 Performance

- Database indexing on frequently queried fields
- Query pagination (10-100 items)
- Connection pooling
- Lean queries for read operations
- Health checks included

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Development Workflow
```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and test
npm test
npm run lint

# Commit with semantic messages
git commit -m "feat: add feature description"

# Push and create PR
git push origin feature/your-feature
```

## 📝 License

MIT © 2026 Drone Model API Contributors

See [LICENSE](./LICENSE) for details.

## 🎯 Roadmap

### Phase 1 (✅ Complete)
- CRUD operations
- Database integration
- API documentation
- Docker setup
- Test suite

### Phase 2 (Planned)
- JWT authentication
- Rate limiting
- Bulk operations
- Advanced filtering
- Caching

### Phase 3 (Planned)
- GraphQL endpoint
- Multi-tenancy
- Webhooks
- Analytics dashboard
- Mobile API

## 📞 Support

- 📖 [API Documentation](http://localhost:3000/api-docs)
- 📚 [Guides](./README.md)
- 🐛 [Report Issues](https://github.com/yourusername/drone-model-api/issues)
- 💬 [Discussions](https://github.com/yourusername/drone-model-api/discussions)

## 👨‍💻 Authors

Your Name - [GitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Jest](https://jestjs.io/)
- [Swagger/OpenAPI](https://swagger.io/)

## 🎉 Get Started!

1. Clone the repository
2. Run `npm install`
3. Start with `npm run dev`
4. Visit http://localhost:3000/api-docs
5. Check [QUICK_START.md](./QUICK_START.md) for full guide

**Happy coding! 🚁✨**

---

Made with ❤️ for drone enthusiasts and developers
