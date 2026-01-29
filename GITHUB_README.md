# 🚁 Drone Model API

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green)](https://www.mongodb.com/)

A production-ready REST API for managing drone models with complete CRUD operations, validation, pagination, Swagger documentation, and a beautiful web dashboard.

## ✨ Features

- 🔧 **Full CRUD Operations** - Create, Read, Update, Delete drone models
- ✅ **Data Validation** - Comprehensive validation using Joi
- 📄 **Pagination & Filtering** - Efficient data retrieval with pagination, search, and category filters
- 📚 **API Documentation** - Interactive Swagger/OpenAPI documentation
- 🌐 **Web Dashboard** - Beautiful, responsive frontend for managing drones
- 🐳 **Docker Support** - Containerized deployment with Docker Compose
- 🧪 **Testing** - Comprehensive Jest test suite
- 🔍 **ESLint** - Code quality and consistency
- 🚀 **Production Ready** - Error handling, logging, and health checks

## 🚀 Quick Start

### Option 1: Interactive Script (Recommended)

```bash
# Clone the repository
git clone https://github.com/Advik-vp/drone-model-api.git
cd drone-model-api

# Run the interactive start script
./start.sh
```

### Option 2: Manual Setup

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start MongoDB (using Docker)
docker run -d -p 27017:27017 --name mongo mongo:6.0

# Seed the database with sample data (optional)
npm run seed

# Start the backend API
npm start

# In a new terminal, start the frontend
npm run frontend
```

### Option 3: Docker Compose

```bash
# Start everything with Docker
npm run docker:up

# Stop services
npm run docker:down
```

## 🌐 Access Points

- **Frontend Dashboard**: http://localhost:8080
- **Backend API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api-docs
- **Health Check**: http://localhost:3000/health

## 📖 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/api-docs` | Swagger documentation |
| `GET` | `/drones` | List all drones (with pagination) |
| `GET` | `/drones/:id` | Get a specific drone |
| `POST` | `/drones` | Create a new drone |
| `PUT` | `/drones/:id` | Update a drone |
| `DELETE` | `/drones/:id` | Delete a drone |
| `GET` | `/drones/stats/summary` | Get drone statistics |

## 📊 Example API Request

### Create a Drone

```bash
curl -X POST http://localhost:3000/drones \
  -H "Content-Type: application/json" \
  -d '{
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
    "firmwareVersion": "1.2.3"
  }'
```

### Response

```json
{
  "success": true,
  "message": "Drone model created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
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
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

## 🎨 Frontend Dashboard

The included web dashboard provides:

- ✅ View all drones with search and filtering
- ✅ Create new drone models with form validation
- ✅ Delete existing drones
- ✅ View statistics by category
- ✅ Responsive, modern UI with animations

![Dashboard Preview](https://via.placeholder.com/800x400?text=Drone+Dashboard+Preview)

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix
```

## 📁 Project Structure

```
drone-model-api/
├── frontend/              # Web dashboard
│   ├── index.html        # Main dashboard page
│   ├── server.js         # Frontend server
│   └── README.md         # Frontend documentation
├── src/
│   ├── config/           # Database configuration
│   ├── controllers/      # Business logic
│   ├── middleware/       # Express middleware
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── validators/       # Validation schemas
│   └── index.js          # App entry point
├── tests/                # Jest test suite
├── scripts/              # Utility scripts
│   └── seed.js          # Database seeder
├── examples/             # API client examples
└── docker-compose.yml    # Docker configuration
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start the backend API |
| `npm run dev` | Start in development mode with auto-reload |
| `npm run frontend` | Start the frontend server |
| `npm run seed` | Populate database with sample data |
| `npm test` | Run tests with coverage |
| `npm run lint` | Check code quality |
| `npm run lint:fix` | Fix linting issues |
| `npm run docker:up` | Start with Docker Compose |
| `npm run docker:down` | Stop Docker services |

## 🐳 Docker Deployment

The project includes Docker support for easy deployment:

```bash
# Build and start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Services included:
- **MongoDB** - Database on port 27017
- **API** - Backend API on port 3000

## ⚙️ Environment Variables

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/drone_db
LOG_LEVEL=debug
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRE=7d
```

## 📚 Documentation

- [Complete API Reference](./README.md)
- [Frontend Documentation](./frontend/README.md)
- [Quick Start Guide](./QUICK_START.md)
- [API Examples](./examples/client.example.js)

## 🤝 Contributing

Contributions are welcome! Please check out the [Contributing Guide](./CONTRIBUTING.md).

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Advik-vp**

- GitHub: [@Advik-vp](https://github.com/Advik-vp)
- Repository: [drone-model-api](https://github.com/Advik-vp/drone-model-api)

## 🙏 Acknowledgments

- Built with [Express.js](https://expressjs.com/)
- Database: [MongoDB](https://www.mongodb.com/)
- Validation: [Joi](https://joi.dev/)
- Testing: [Jest](https://jestjs.io/)
- Documentation: [Swagger](https://swagger.io/)

---

⭐ If you find this project useful, please consider giving it a star!
