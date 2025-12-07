import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ticket Service API',
      version: '1.0.0',
      description: 'Dokumentasi API Ticket Service menggunakan Swagger'
    }
  },
  apis: ['./src/api/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
