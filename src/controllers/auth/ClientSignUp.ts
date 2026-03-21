import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { ClientRepo } from '../../typeorm/data-source';
import CustomError from '../../utils/CustomError';
import { TApiResponse } from '../../types/types.d';
import jwt from 'jsonwebtoken';
import validateSignUpForm from '../../utils/validateSignUp';

const ClientSignUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, form } = validateSignUpForm(req);
    if (error) {
      throw new CustomError(400, error);
    }

    const { fullName, email, phoneNumber, password } = form!;

    const existingClient = await ClientRepo.findOneBy({ email });
    if (existingClient) {
      throw new CustomError(400, 'Client already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const client = ClientRepo.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    await ClientRepo.save(client);
    const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
    
    const token = jwt.sign({ id: client.id }, JWT_SECRET!, {
          expiresIn: JWT_EXPIRES_IN || '1d',
        });

    const response: TApiResponse = {
      success: true,
      message: 'Client registered successfully',
      data: {
        id: client.id,
        fullName: client.fullName,
        email: client.email,
        token
      },
    };

    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export default ClientSignUp;
