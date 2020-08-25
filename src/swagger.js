const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
      info: {
        description: 'You can find a location, provide feedbacks and mucho more. This is a Mesa Mobile Thinking Challenge.',
        title: 'Localization Finder API',
        swagger: "2.0",
        openapi: '3.0.0'
      }
    },
    apis: ['./app.js']
};


const specs = swaggerJsdoc(options);

module.exports = specs;