import { Request, Response, NextFunction } from 'express';
import { ClientRepo } from '../../typeorm/data-source';
import CustomError from '../../utils/CustomError';
import { TApiResponse, TClient } from '../../types/types.d';

const UpdateClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.user?.id;
    if (!id) throw new CustomError(401, 'Unauthorized');
    
    const { fullName, phoneNumber } = req.body;

    const client = await ClientRepo.findOneBy({ id });
    if (!client) {
      throw new CustomError(404, 'Client not found');
    }

    if (fullName) client.fullName = fullName;
    if (phoneNumber) client.phoneNumber = phoneNumber;

    await ClientRepo.save(client);

    const { password, ...updatedClient } = client;

    const response: TApiResponse<Partial<TClient>> = {
      success: true,
      message: 'Profile updated successfully',
      data: updatedClient as TClient,
    };

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export default UpdateClient;
