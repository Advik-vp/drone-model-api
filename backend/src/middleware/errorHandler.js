const errorHandler = (err, req, res, _next) => {
  console.error('Error:', {
    name: err.name,
    message: err.message,
    status: err.status || 500
  });

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: messages
    });
  }

  // Mongoose cast error (invalid ID)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: 'Invalid ID format'
    });
  }

  // Duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({
      success: false,
      error: `Duplicate value for field: ${field}`
    });
  }

  // Custom application errors
  if (err.status) {
    return res.status(err.status).json({
      success: false,
      error: err.message
    });
  }

  // Generic error
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production'
      ? 'Internal Server Error'
      : err.message
  });
};

module.exports = errorHandler;
