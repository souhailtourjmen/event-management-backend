import { Request, Response, NextFunction } from 'express';
import { ClientRepo } from '../../typeorm/data-source';
import CustomError from '../../utils/CustomError';
import { TApiResponse, TClient } from '../../types/types.d';

const GetClientProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.user?.id;
    if (!id) throw new CustomError(401, 'Unauthorized');

    const client = await ClientRepo.findOne({
      where: { id },
      relations: ['events'],
    });

    if (!client) {
      throw new CustomError(404, 'Client not found');
    }

    // Exclude password from the response
    const { password, ...clientData } = client;

    const response: TApiResponse<Partial<TClient>> = {
      success: true,
      message: 'Client profile fetched successfully',
      data: clientData as any,
    };

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export default GetClientProfile;
