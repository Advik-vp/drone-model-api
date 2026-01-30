const express = require('express');
const router = express.Router();
const droneController = require('../controllers/droneController');
const { validateCreateDrone, validateUpdateDrone } = require('../middleware/validationMiddleware');

/**
 * @swagger
 * /drones:
 *   post:
 *     summary: Create a new drone model
 *     tags: [Drones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, category, maxSpeed, maxRange, weight, dimensions, payloadCapacity, batteryCapacity, firmwareVersion]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "DJI Phantom 4"
 *               category:
 *                 type: string
 *                 enum: [quadcopter, fixed-wing, hexacopter, octocopter]
 *                 example: "quadcopter"
 *               maxSpeed:
 *                 type: number
 *                 example: 72
 *               maxRange:
 *                 type: number
 *                 example: 7000
 *               weight:
 *                 type: number
 *                 example: 1375
 *               dimensions:
 *                 type: object
 *                 properties:
 *                   length:
 *                     type: number
 *                   width:
 *                     type: number
 *                   height:
 *                     type: number
 *               payloadCapacity:
 *                 type: number
 *               batteryCapacity:
 *                 type: number
 *               firmwareVersion:
 *                 type: string
 *                 pattern: "^\\d+\\.\\d+\\.\\d+$"
 *     responses:
 *       201:
 *         description: Drone created successfully
 *       400:
 *         description: Validation error
 */
router.post('/', validateCreateDrone, droneController.createDrone);

/**
 * @swagger
 * /drones:
 *   get:
 *     summary: Retrieve all drone models with pagination
 *     tags: [Drones]
 *     parameters:
 *       - name: page
 *         in: query
 *         type: integer
 *         default: 1
 *       - name: limit
 *         in: query
 *         type: integer
 *         default: 10
 *       - name: category
 *         in: query
 *         type: string
 *         enum: [quadcopter, fixed-wing, hexacopter, octocopter]
 *       - name: enabled
 *         in: query
 *         type: boolean
 *       - name: search
 *         in: query
 *         type: string
 *     responses:
 *       200:
 *         description: List of drones with pagination info
 */
router.get('/', droneController.getAllDrones);

/**
 * @swagger
 * /drones/stats/summary:
 *   get:
 *     summary: Get drone statistics by category
 *     tags: [Drones]
 *     responses:
 *       200:
 *         description: Drone statistics
 */
router.get('/stats/summary', droneController.getDroneStats);

/**
 * @swagger
 * /drones/{id}:
 *   get:
 *     summary: Retrieve a single drone model by ID
 *     tags: [Drones]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: Drone ID
 *     responses:
 *       200:
 *         description: Drone found
 *       404:
 *         description: Drone not found
 */
router.get('/:id', droneController.getDroneById);

/**
 * @swagger
 * /drones/{id}:
 *   put:
 *     summary: Update a drone model
 *     tags: [Drones]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Drone updated successfully
 *       404:
 *         description: Drone not found
 */
router.put('/:id', validateUpdateDrone, droneController.updateDrone);

/**
 * @swagger
 * /drones/{id}:
 *   delete:
 *     summary: Delete a drone model
 *     tags: [Drones]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Drone deleted successfully
 *       404:
 *         description: Drone not found
 */
router.delete('/:id', droneController.deleteDrone);

module.exports = router;
