import { Router } from 'express';
import ClientSignUp from '../../controllers/auth/ClientSignUp';
import ClientSignIn from '../../controllers/auth/ClientSignIn';

const AuthRouter = Router();

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: Register a new client
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - phoneNumber
 *               - password
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Client created
 */
AuthRouter.post('/signup', ClientSignUp);

/**
 * @swagger
 * /api/v1/auth/signin:
 *   post:
 *     summary: Client sign in
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
AuthRouter.post('/signin', ClientSignIn);

export default AuthRouter;
