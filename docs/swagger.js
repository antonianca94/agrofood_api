const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API do AgroFood',
    version: '1.0.0',
    description: 'API para gerenciamento do AgroFood',
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Servidor Desenvolvimento',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSetup = swaggerJSDoc(options);

module.exports = swaggerSetup;
