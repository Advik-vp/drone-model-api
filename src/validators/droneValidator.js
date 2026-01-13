const Joi = require('joi');

const dimensionsSchema = Joi.object({
  length: Joi.number().positive().required().messages({
    'number.base': 'Length must be a number',
    'number.positive': 'Length must be positive'
  }),
  width: Joi.number().positive().required().messages({
    'number.base': 'Width must be a number',
    'number.positive': 'Width must be positive'
  }),
  height: Joi.number().positive().required().messages({
    'number.base': 'Height must be a number',
    'number.positive': 'Height must be positive'
  })
});

const createDroneSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().trim().messages({
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name cannot exceed 100 characters',
    'any.required': 'Drone name is required'
  }),
  category: Joi.string().valid('quadcopter', 'fixed-wing', 'hexacopter', 'octocopter').required().messages({
    'any.only': 'Category must be one of: quadcopter, fixed-wing, hexacopter, octocopter',
    'any.required': 'Category is required'
  }),
  manufacturer: Joi.string().max(100).optional().allow('').messages({
    'string.max': 'Manufacturer name too long'
  }),
  maxSpeed: Joi.number().min(1).max(500).required().messages({
    'number.min': 'Max speed must be at least 1 km/h',
    'number.max': 'Max speed cannot exceed 500 km/h',
    'any.required': 'Max speed is required'
  }),
  maxRange: Joi.number().min(100).required().messages({
    'number.min': 'Max range must be at least 100 meters',
    'any.required': 'Max range is required'
  }),
  weight: Joi.number().min(50).max(50000).required().messages({
    'number.min': 'Weight must be at least 50 grams',
    'number.max': 'Weight cannot exceed 50kg',
    'any.required': 'Weight is required'
  }),
  dimensions: dimensionsSchema.required().messages({
    'any.required': 'Dimensions are required'
  }),
  payloadCapacity: Joi.number().min(0).required().messages({
    'number.min': 'Payload capacity cannot be negative',
    'any.required': 'Payload capacity is required'
  }),
  batteryCapacity: Joi.number().min(500).required().messages({
    'number.min': 'Battery capacity must be at least 500 mAh',
    'any.required': 'Battery capacity is required'
  }),
  firmwareVersion: Joi.string().pattern(/^\d+\.\d+\.\d+$/).required().messages({
    'string.pattern.base': 'Firmware version must be in format X.Y.Z (e.g., 1.0.0)',
    'any.required': 'Firmware version is required'
  }),
  enabled: Joi.boolean().optional().default(true),
  features: Joi.array().items(Joi.string().max(50)).optional(),
  description: Joi.string().max(1000).optional().allow('')
});

const updateDroneSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional().trim(),
  category: Joi.string().valid('quadcopter', 'fixed-wing', 'hexacopter', 'octocopter').optional(),
  manufacturer: Joi.string().max(100).optional().allow(''),
  maxSpeed: Joi.number().min(1).max(500).optional(),
  maxRange: Joi.number().min(100).optional(),
  weight: Joi.number().min(50).max(50000).optional(),
  dimensions: dimensionsSchema.optional(),
  payloadCapacity: Joi.number().min(0).optional(),
  batteryCapacity: Joi.number().min(500).optional(),
  firmwareVersion: Joi.string().pattern(/^\d+\.\d+\.\d+$/).optional(),
  enabled: Joi.boolean().optional(),
  features: Joi.array().items(Joi.string().max(50)).optional(),
  description: Joi.string().max(1000).optional().allow('')
}).min(1);

const validateDrone = (data, schema = createDroneSchema) => {
  const { error, value } = schema.validate(data, {
    abortEarly: false,
    stripUnknown: true
  });
  
  if (error) {
    const messages = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    }));
    return { valid: false, messages };
  }
  
  return { valid: true, data: value };
};

module.exports = {
  validateDrone,
  createDroneSchema,
  updateDroneSchema
};
