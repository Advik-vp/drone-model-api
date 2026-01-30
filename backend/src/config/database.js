const mongoose = require('mongoose');

let _mongoMemoryServer = null;

const connectDB = async () => {
  try {
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      console.log('✓ MongoDB already connected');
      return mongoose.connection;
    }

    let mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/drone_db';

    if (process.env.NODE_ENV === 'test') {
      // Use in-memory MongoDB for tests to avoid requiring a local mongod
      const { MongoMemoryServer } = require('mongodb-memory-server');
      _mongoMemoryServer = await MongoMemoryServer.create();
      mongoUri = _mongoMemoryServer.getUri();
    }

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✓ MongoDB connected successfully');
    return mongoose.connection;
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error.message);
    throw error;
  }
};

const disconnectDB = async () => {
  try {
    if (mongoose.connection && mongoose.connection.readyState === 0) {
      console.log('✓ MongoDB already disconnected');
      return;
    }

    await mongoose.disconnect();
    console.log('✓ MongoDB disconnected');

    if (_mongoMemoryServer) {
      try {
        await _mongoMemoryServer.stop();
        _mongoMemoryServer = null;
        console.log('✓ MongoDB in-memory server stopped');
      } catch (e) {
        console.error('✗ Failed to stop in-memory server:', e.message);
      }
    }
  } catch (error) {
    console.error('✗ MongoDB disconnection failed:', error.message);
    throw error;
  }
};

module.exports = { connectDB, disconnectDB };

