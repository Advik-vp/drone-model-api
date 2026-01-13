require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const { connectDB } = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const droneRoutes = require('./routes/droneRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Drone API is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/drones', droneRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server and connect to database
const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`\n🚀 Drone API Server running at http://localhost:${PORT}`);
      console.log(`📚 API Documentation at http://localhost:${PORT}/api-docs\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n⛔ Server shutting down...');
  const { disconnectDB } = require('./config/database');
  await disconnectDB();
  process.exit(0);
});

startServer();

module.exports = app;
