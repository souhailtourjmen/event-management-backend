import { Request, Response, NextFunction } from 'express';
import { EventRepo } from '../../typeorm/data-source';
import CustomError from '../../utils/CustomError';
import { TApiResponse, TEvent } from '../../types/types.d';

const GetEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const event = await EventRepo.findOne({
      where: { id },
      relations: ['clients'],
    });

    if (!event) {
      throw new CustomError(404, 'Event not found');
    }

    const response: TApiResponse<TEvent> = {
      success: true,
      message: 'Event details fetched successfully',
      data: event as TEvent,
    };

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export default GetEvent;
