// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Defina as opções de configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API do AgroFood',
      version: '1.0.0',
      description: 'Documentação da API Projeto AgroFood',
    },
  },
  apis: ['./app.js'], // Caminho para o arquivo que contém as anotações da API
};

// Crie a especificação do Swagger
const swaggerSpec = swaggerJSDoc(swaggerOptions);

const swaggerSetup = swaggerUi.setup(swaggerSpec);

module.exports = {
  swaggerUi,
  swaggerSpec,
  swaggerSetup,
};
