/**
 * Drone API - Data Seed Script
 *
 * Usage: node scripts/seed.js
 * Populates MongoDB with sample drone data for testing
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Drone = require('../src/models/Drone');

const sampleDrones = [
  {
    name: 'DJI Phantom 4 Pro',
    category: 'quadcopter',
    manufacturer: 'DJI',
    maxSpeed: 72,
    maxRange: 7000,
    weight: 1375,
    dimensions: { length: 35, width: 35, height: 15 },
    payloadCapacity: 500,
    batteryCapacity: 5935,
    firmwareVersion: '1.2.3',
    enabled: true,
    features: ['4K Camera', '50min Flight Time', 'Obstacle Avoidance'],
    description: 'Professional camera drone for photography'
  },
  {
    name: 'DJI Air 2S',
    category: 'quadcopter',
    manufacturer: 'DJI',
    maxSpeed: 68,
    maxRange: 6000,
    weight: 586,
    dimensions: { length: 25, width: 25, height: 10 },
    payloadCapacity: 1080,
    batteryCapacity: 3850,
    firmwareVersion: '2.1.0',
    enabled: true,
    features: ['20MP Sensor', 'Obstacle Detection'],
    description: 'Mid-range powerful camera drone'
  },
  {
    name: 'DJI Mini 3',
    category: 'quadcopter',
    manufacturer: 'DJI',
    maxSpeed: 57,
    maxRange: 5000,
    weight: 249,
    dimensions: { length: 20, width: 20, height: 8 },
    payloadCapacity: 200,
    batteryCapacity: 2250,
    firmwareVersion: '1.0.5',
    enabled: true,
    features: ['Compact Design', '38min Flight Time'],
    description: 'Lightweight entry-level drone'
  },
  {
    name: 'Auterion Skynode',
    category: 'fixed-wing',
    manufacturer: 'Auterion',
    maxSpeed: 120,
    maxRange: 20000,
    weight: 2500,
    dimensions: { length: 45, width: 100, height: 15 },
    payloadCapacity: 1000,
    batteryCapacity: 8000,
    firmwareVersion: '3.0.1',
    enabled: true,
    features: ['Long Range', 'Survey Grade'],
    description: 'Fixed-wing drone for mapping'
  },
  {
    name: 'Freefly Astro',
    category: 'hexacopter',
    manufacturer: 'Freefly',
    maxSpeed: 80,
    maxRange: 8000,
    weight: 5200,
    dimensions: { length: 40, width: 40, height: 20 },
    payloadCapacity: 5000,
    batteryCapacity: 10000,
    firmwareVersion: '2.5.0',
    enabled: false,
    features: ['Heavy Lift', 'Cinema Rig'],
    description: 'Heavy lift drone for cinema'
  }
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/drone_db';
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✓ Connected to MongoDB');

    // Clear existing data
    await Drone.deleteMany({});
    console.log('✓ Cleared existing drones');

    // Insert sample data
    const created = await Drone.insertMany(sampleDrones);
    console.log(`✓ Inserted ${created.length} sample drones`);

    // Display summary
    const stats = await Drone.countDocuments();
    const byCategory = await Drone.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    console.log(`\nTotal drones: ${stats}`);
    console.log('By category:');
    byCategory.forEach(cat => {
      console.log(`  ${cat._id}: ${cat.count}`);
    });

    await mongoose.disconnect();
    console.log('\n✓ Seeding completed!');
    process.exit(0);

  } catch (error) {
    console.error('✗ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedDatabase();
