import { Router } from 'express';
import GetAllClients from '../../controllers/clients/GetAllClients';
import GetClientProfile from '../../controllers/clients/GetClientProfile';
import UpdateClient from '../../controllers/clients/UpdateClient';
import DeleteClient from '../../controllers/clients/DeleteClient';
import { verifyClient } from '../../middleware/verifyClient';

const ClientsRouter = Router();

/**
 * @swagger
 * /api/v1/clients:
 *   get:
 *     summary: List all clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: List of clients
 */
ClientsRouter.get('/', GetAllClients);

/**
 * @swagger
 * /api/v1/clients/me:
 *   get:
 *     summary: Get current client profile
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Client profile
 */
ClientsRouter.get('/me', verifyClient, GetClientProfile);

/**
 * @swagger
 * /api/v1/clients/me:
 *   put:
 *     summary: Update current client profile
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated
 */
ClientsRouter.put('/me', verifyClient, UpdateClient);

/**
 * @swagger
 * /api/v1/clients/{id}:
 *   delete:
 *     summary: Delete a client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client deleted
 */
ClientsRouter.delete('/:id', DeleteClient);

export default ClientsRouter;
