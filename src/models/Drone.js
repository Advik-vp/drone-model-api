const mongoose = require('mongoose');

const dimensionsSchema = new mongoose.Schema({
  length: { type: Number, required: true }, // cm
  width: { type: Number, required: true },  // cm
  height: { type: Number, required: true }  // cm
}, { _id: false });

const droneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Drone name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    category: {
      type: String,
      enum: ['quadcopter', 'fixed-wing', 'hexacopter', 'octocopter'],
      required: [true, 'Category is required']
    },
    manufacturer: {
      type: String,
      trim: true,
      maxlength: [100, 'Manufacturer name too long']
    },
    maxSpeed: {
      type: Number,
      required: [true, 'Max speed is required'],
      min: [1, 'Max speed must be positive'],
      max: [500, 'Max speed is too high']
    },
    maxRange: {
      type: Number,
      required: [true, 'Max range is required'],
      min: [100, 'Max range must be at least 100 meters']
    },
    weight: {
      type: Number,
      required: [true, 'Weight is required'],
      min: [50, 'Weight must be at least 50 grams'],
      max: [50000, 'Weight cannot exceed 50kg']
    },
    dimensions: {
      type: dimensionsSchema,
      required: [true, 'Dimensions are required']
    },
    payloadCapacity: {
      type: Number,
      required: [true, 'Payload capacity is required'],
      min: [0, 'Payload capacity cannot be negative']
    },
    batteryCapacity: {
      type: Number,
      required: [true, 'Battery capacity is required'],
      min: [500, 'Battery capacity must be at least 500 mAh']
    },
    firmwareVersion: {
      type: String,
      required: [true, 'Firmware version is required'],
      match: [/^\d+\.\d+\.\d+$/, 'Firmware version must be in format X.Y.Z']
    },
    enabled: {
      type: Boolean,
      default: true
    },
    features: [String], // e.g., ['4K Camera', '50min Flight Time', 'Obstacle Avoidance']
    description: {
      type: String,
      maxlength: [1000, 'Description too long']
    }
  },
  {
    timestamps: true
  }
);

// Indexes for better query performance
droneSchema.index({ name: 1 });
droneSchema.index({ category: 1 });
droneSchema.index({ createdAt: -1 });

// Virtual for fleet ID (can be extended)
droneSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Lean query middleware for performance
droneSchema.post('find', function() {
  this.lean();
});

module.exports = mongoose.model('Drone', droneSchema);
