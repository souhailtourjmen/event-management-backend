import { Request, Response, NextFunction } from 'express';
import { ClientRepo } from '../../typeorm/data-source';
import { TApiResponse, TClient } from '../../types/types.d';

const GetAllClients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clients = await ClientRepo.find({
      select: ['id', 'fullName', 'email', 'phoneNumber', 'createdAt'],
    });

    const response: TApiResponse<Partial<TClient>[]> = {
      success: true,
      message: 'Clients fetched successfully',
      data: clients as any,
    };

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export default GetAllClients;
