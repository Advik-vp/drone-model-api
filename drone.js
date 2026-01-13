const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { DroneSchema } = require('../validators/drone.schema');

/**
 * CREATE drone
 */
router.post('/', async (req, res, next) => {
  try {
    const data = DroneSchema.parse(req.body);

    const drone = await prisma.drone.create({
      data: {
        name: data.name,
        category: data.category,
        maxSpeed: data.maxSpeed,
        maxRange: data.maxRange,
        weight: data.weight,
        length: data.dimensions.length,
        width: data.dimensions.width,
        height: data.dimensions.height,
        payloadCapacity: data.payloadCapacity,
        batteryCapacity: data.batteryCapacity,
        firmwareVersion: data.firmwareVersion
      }
    });

    res.status(201).json(drone);
  } catch (err) {
    next(err);
  }
});

/**
 * GET all drones
 */
router.get('/', async (req, res) => {
  const drones = await prisma.drone.findMany();
  res.json(drones);
});

/**
 * GET one drone
 */
router.get('/:id', async (req, res) => {
  const drone = await prisma.drone.findUnique({
    where: { id: req.params.id }
  });

  if (!drone) return res.status(404).json({ error: 'Drone not found' });

  res.json(drone);
});

/**
 * DELETE drone
 */
router.delete('/:id', async (req, res) => {
  await prisma.drone.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

module.exports = router;
