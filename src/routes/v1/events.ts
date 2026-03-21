import { Router } from 'express';
import GetAllEvents from '../../controllers/events/GetAllEvents';
import CreateEvent from '../../controllers/events/CreateEvent';
import DeleteEvent from '../../controllers/events/DeleteEvent';
import GetEventClients from '../../controllers/events/GetEventClients';
import GetEvent from '../../controllers/events/GetEvent';
import RegisterToEvent from '../../controllers/events/RegisterToEvent';
import { verifyClient } from '../../middleware/verifyClient';

const EventsRouter = Router();

/**
 * @swagger
 * /api/v1/events:
 *   get:
 *     summary: List all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of events
 */
EventsRouter.get('/', GetAllEvents);

/**
 * @swagger
 * /api/v1/events:
 *   post:
 *     summary: Add a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - date
 *               - location
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Event created
 */
EventsRouter.post('/', CreateEvent);

/**
 * @swagger
 * /api/v1/events/{id}:
 *   get:
 *     summary: Get an event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event found
 */
EventsRouter.get('/:id', GetEvent);

/**
 * @swagger
 * /api/v1/events/{id}:
 *   delete:
 *     summary: Delete an event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event deleted
 */
EventsRouter.delete('/:id', DeleteEvent);

/**
 * @swagger
 * /api/v1/events/{id}/clients:
 *   get:
 *     summary: Get clients registered for an event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of clients
 */
EventsRouter.get('/:id/clients', GetEventClients);

/**
 * @swagger
 * /api/v1/events/{id}/register:
 *   post:
 *     summary: Register the authenticated client for an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registered successfully
 */
EventsRouter.post('/:id/register', verifyClient, RegisterToEvent);

export default EventsRouter;
