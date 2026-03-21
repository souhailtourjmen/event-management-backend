import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ClientRepo } from '../typeorm/data-source';
import CustomError from '../utils/CustomError';

export const verifyClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new CustomError(401, 'Unauthorized');
    }

    const token = authHeader.split(' ')[1];
    const { JWT_SECRET } = process.env;

    const decoded = jwt.verify(token, JWT_SECRET!) as { id: string };

    const client = await ClientRepo.findOneBy({ id: decoded.id });
    if (!client) {
      throw new CustomError(401, 'Unauthorized');
    }

    req.user = {
      id: client.id,
      email: client.email,
      fullName: client.fullName,
    };
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new CustomError(401, 'Invalid token'));
    } else {
      next(error);
    }
  }
};
