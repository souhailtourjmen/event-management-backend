import { Request, Response, NextFunction } from 'express';
import { EventRepo } from '../../typeorm/data-source';
import { TApiResponse } from '../../types/types.d';

const DeleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const event = await EventRepo.findOneBy({ id });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    await EventRepo.remove(event);

    const response: TApiResponse<null> = {
      success: true,
      message: 'Event deleted successfully',
      data: null,
    };

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export default DeleteEvent;
