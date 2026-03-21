import 'reflect-metadata';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

// Load Environment Variables with dotenv package
import dotenv from 'dotenv';
dotenv.config();
const { COOKIE_SECRET } = process.env;

// Import Middleware
import cors from 'cors';
import cookieParser from 'cookie-parser';
import EventsRouter from './routes/v1/events';
import AuthRouter from './routes/v1/auth';
import ClientsRouter from './routes/v1/clients';
import ConnectDatabase from './typeorm/connectDB';
import customErrorHandler from './middleware/customErrorHandler';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Event Management API',
      version: '1.0.0',
      description: 'API documentation for managing events and clients',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/v1/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Instantiate the express app
const setUpApp = async () => {
  const app = express();

  // Register middlewares on the app
  app.use(cors({ origin: '*' }));
  app.use(cookieParser(COOKIE_SECRET!));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Swagger Documentation
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // API VERSIONING - Version 1.0
  app.use('/api/v1/events', EventsRouter);
  app.use('/api/v1/auth', AuthRouter);
  app.use('/api/v1/clients', ClientsRouter);

  app.get('/', (req, res) => {
    return res.status(200).json({
      success: true,
      message: 'Welcome to the Event Management API',
      data: {
        version: '1.0.0',
      },
    });
  });

  // Custom Error handler placed after all other routes
  app.use(customErrorHandler);

  // Connect to Database and on success, return the app instance
  await ConnectDatabase();

  // Start Server
  return app;
};

export default setUpApp;
