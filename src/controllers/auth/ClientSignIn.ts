import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ClientRepo } from '../../typeorm/data-source';
import CustomError from '../../utils/CustomError';
import { TApiResponse } from '../../types/types.d';

const ClientSignIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new CustomError(400, 'Email and password are required');
    }

    const client = await ClientRepo.findOneBy({ email });
    if (!client) {
      throw new CustomError(401, 'Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      throw new CustomError(401, 'Invalid credentials');
    }

    const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

    const token = jwt.sign({ id: client.id }, JWT_SECRET!, {
      expiresIn: JWT_EXPIRES_IN || '1d',
    });

    const response: TApiResponse = {
      success: true,
      message: 'Login successful',
      data: {
        token,
        client: {
          id: client.id,
          fullName: client.fullName,
          email: client.email,
        },
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export default ClientSignIn;
