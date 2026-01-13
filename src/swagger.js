const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Drone Model API',
      version: '1.0.0',
      description: 'REST API for managing drone models with CRUD operations',
      contact: {
        name: 'API Support',
        email: 'support@droneapi.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      },
      {
        url: 'https://api.dronemodels.com',
        description: 'Production server'
      }
    ],
    components: {
      schemas: {
        Drone: {
          type: 'object',
          required: ['name', 'category', 'maxSpeed', 'maxRange', 'weight', 'dimensions', 'payloadCapacity', 'batteryCapacity', 'firmwareVersion'],
          properties: {
            _id: {
              type: 'string',
              description: 'Unique identifier'
            },
            name: {
              type: 'string',
              minLength: 2,
              maxLength: 100
            },
            category: {
              type: 'string',
              enum: ['quadcopter', 'fixed-wing', 'hexacopter', 'octocopter']
            },
            manufacturer: {
              type: 'string'
            },
            maxSpeed: {
              type: 'number',
              description: 'km/h'
            },
            maxRange: {
              type: 'number',
              description: 'meters'
            },
            weight: {
              type: 'number',
              description: 'grams'
            },
            dimensions: {
              type: 'object',
              properties: {
                length: { type: 'number' },
                width: { type: 'number' },
                height: { type: 'number' }
              }
            },
            payloadCapacity: {
              type: 'number',
              description: 'grams'
            },
            batteryCapacity: {
              type: 'number',
              description: 'mAh'
            },
            firmwareVersion: {
              type: 'string',
              pattern: '^\\d+\\.\\d+\\.\\d+$'
            },
            enabled: {
              type: 'boolean'
            },
            features: {
              type: 'array',
              items: { type: 'string' }
            },
            description: {
              type: 'string'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
