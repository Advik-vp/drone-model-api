const request = require('supertest');
const { connectDB, disconnectDB } = require('../src/config/database');
const Drone = require('../src/models/Drone');

let app;

beforeAll(async () => {
  await connectDB();
  app = require('../src/index');
});

afterAll(async () => {
  await Drone.deleteMany({});
  await disconnectDB();
});

describe('Drone API - CRUD Operations', () => {
  let droneId;

  const validDrone = {
    name: 'DJI Phantom 4 Pro',
    category: 'quadcopter',
    manufacturer: 'DJI',
    maxSpeed: 72,
    maxRange: 7000,
    weight: 1375,
    dimensions: {
      length: 35,
      width: 35,
      height: 15
    },
    payloadCapacity: 500,
    batteryCapacity: 5935,
    firmwareVersion: '1.2.3',
    enabled: true,
    features: ['4K Camera', '50min Flight Time'],
    description: 'Professional camera drone'
  };

  describe('POST /drones - Create Drone', () => {
    test('Should create a new drone with valid data', async () => {
      const response = await request(app)
        .post('/drones')
        .send(validDrone)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('_id');
      expect(response.body.data.name).toBe(validDrone.name);
      droneId = response.body.data._id;
    });

    test('Should return 400 with missing required fields', async () => {
      const invalidDrone = { name: 'Test' };
      const response = await request(app)
        .post('/drones')
        .send(invalidDrone)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.details).toBeDefined();
    });

    test('Should validate maxSpeed range', async () => {
      const drone = { ...validDrone, maxSpeed: 1000 };
      const response = await request(app)
        .post('/drones')
        .send(drone)
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    test('Should validate firmware version format', async () => {
      const drone = { ...validDrone, firmwareVersion: 'invalid' };
      const response = await request(app)
        .post('/drones')
        .send(drone)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /drones - Retrieve All Drones', () => {
    beforeAll(async () => {
      await request(app).post('/drones').send(validDrone);
    });

    test('Should return all drones with pagination', async () => {
      const response = await request(app)
        .get('/drones')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.pagination).toBeDefined();
      expect(response.body.pagination.totalItems).toBeGreaterThan(0);
    });

    test('Should filter drones by category', async () => {
      const response = await request(app)
        .get('/drones?category=quadcopter')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.every(d => d.category === 'quadcopter')).toBe(true);
    });

    test('Should support pagination parameters', async () => {
      const response = await request(app)
        .get('/drones?page=1&limit=5')
        .expect(200);

      expect(response.body.pagination.itemsPerPage).toBe(5);
    });

    test('Should search drones by name', async () => {
      const response = await request(app)
        .get('/drones?search=Phantom')
        .expect(200);

      expect(response.body.success).toBe(true);
    });
  });

  describe('GET /drones/:id - Retrieve Single Drone', () => {
    test('Should return a drone by valid ID', async () => {
      const response = await request(app)
        .get(`/drones/${droneId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data._id).toBe(droneId);
    });

    test('Should return 404 for non-existent ID', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const response = await request(app)
        .get(`/drones/${fakeId}`)
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /drones/:id - Update Drone', () => {
    test('Should update drone with valid data', async () => {
      const updateData = { name: 'DJI Phantom 4 Pro Max' };
      const response = await request(app)
        .put(`/drones/${droneId}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(updateData.name);
    });

    test('Should return 400 with invalid update data', async () => {
      const invalidUpdate = { maxSpeed: 1000 };
      const response = await request(app)
        .put(`/drones/${droneId}`)
        .send(invalidUpdate)
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    test('Should return 404 for non-existent ID', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const response = await request(app)
        .put(`/drones/${fakeId}`)
        .send({ name: 'New Name' })
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /drones/:id - Delete Drone', () => {
    test('Should delete a drone by ID', async () => {
      const response = await request(app)
        .delete(`/drones/${droneId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('deleted successfully');
    });

    test('Should return 404 when deleting non-existent drone', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const response = await request(app)
        .delete(`/drones/${fakeId}`)
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /drones/stats/summary - Statistics', () => {
    test('Should return drone statistics', async () => {
      const response = await request(app)
        .get('/drones/stats/summary')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
    });
  });

  describe('Health Check', () => {
    test('Should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body.success).toBe(true);
    });
  });
});
