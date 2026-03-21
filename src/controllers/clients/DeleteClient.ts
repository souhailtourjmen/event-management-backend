import { Request, Response, NextFunction } from 'express';
import { ClientRepo } from '../../typeorm/data-source';
import CustomError from '../../utils/CustomError';

const DeleteClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const client = await ClientRepo.findOneBy({ id });
    if (!client) {
      throw new CustomError(404, 'Client not found');
    }

    await ClientRepo.remove(client);

    return res.status(200).json({
      success: true,
      message: 'Client deleted successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export default DeleteClient;
