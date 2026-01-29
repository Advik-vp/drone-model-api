const { validateDrone, createDroneSchema, updateDroneSchema } = require('../validators/droneValidator');

const validateCreateDrone = (req, res, next) => {
  const result = validateDrone(req.body, createDroneSchema);

  if (!result.valid) {
    return res.status(400).json({
      success: false,
      error: 'Validation Failed',
      details: result.messages
    });
  }

  req.validatedBody = result.data;
  next();
};

const validateUpdateDrone = (req, res, next) => {
  const result = validateDrone(req.body, updateDroneSchema);

  if (!result.valid) {
    return res.status(400).json({
      success: false,
      error: 'Validation Failed',
      details: result.messages
    });
  }

  req.validatedBody = result.data;
  next();
};

module.exports = {
  validateCreateDrone,
  validateUpdateDrone
};
