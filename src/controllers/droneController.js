const Drone = require('../models/Drone');

// POST /drones - Create a new drone model
const createDrone = async (req, res, next) => {
  try {
    const drone = new Drone(req.validatedBody);
    await drone.save();

    res.status(201).json({
      success: true,
      message: 'Drone model created successfully',
      data: drone
    });
  } catch (error) {
    next(error);
  }
};

// GET /drones - Retrieve all drone models with pagination and filtering
const getAllDrones = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category, enabled, search } = req.query;
    
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 10));
    const skip = (pageNum - 1) * limitNum;
    
    // Build filter
    const filter = {};
    if (category) filter.category = category;
    if (enabled !== undefined) filter.enabled = enabled === 'true';
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { manufacturer: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const drones = await Drone.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);
    
    const total = await Drone.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      data: drones,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        totalItems: total,
        itemsPerPage: limitNum
      }
    });
  } catch (error) {
    next(error);
  }
};

// GET /drones/:id - Retrieve a single drone model by ID
const getDroneById = async (req, res, next) => {
  try {
    const drone = await Drone.findById(req.params.id);
    
    if (!drone) {
      return res.status(404).json({
        success: false,
        error: 'Drone model not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: drone
    });
  } catch (error) {
    next(error);
  }
};

// PUT /drones/:id - Update a drone model
const updateDrone = async (req, res, next) => {
  try {
    const drone = await Drone.findByIdAndUpdate(
      req.params.id,
      req.validatedBody,
      { 
        new: true,
        runValidators: true
      }
    );
    
    if (!drone) {
      return res.status(404).json({
        success: false,
        error: 'Drone model not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Drone model updated successfully',
      data: drone
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /drones/:id - Delete a drone model
const deleteDrone = async (req, res, next) => {
  try {
    const drone = await Drone.findByIdAndDelete(req.params.id);
    
    if (!drone) {
      return res.status(404).json({
        success: false,
        error: 'Drone model not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Drone model deleted successfully',
      data: drone
    });
  } catch (error) {
    next(error);
  }
};

// GET /drones/stats/summary - Get drone statistics (optional endpoint)
const getDroneStats = async (req, res, next) => {
  try {
    const stats = await Drone.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgMaxSpeed: { $avg: '$maxSpeed' },
          avgWeight: { $avg: '$weight' },
          avgPayload: { $avg: '$payloadCapacity' }
        }
      },
      { $sort: { count: -1 } }
    ]);
    
    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDrone,
  getAllDrones,
  getDroneById,
  updateDrone,
  deleteDrone,
  getDroneStats
};
