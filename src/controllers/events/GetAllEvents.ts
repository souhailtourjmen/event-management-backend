import { Request, Response, NextFunction } from 'express';
import { EventRepo } from '../../typeorm/data-source';
import { TApiResponse, TEvent } from '../../types/types.d';

const GetAllEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await EventRepo.find({
      relations: ['clients'],
    });

    const response: TApiResponse<TEvent[]> = {
      success: true,
      message: 'Events fetched successfully',
      data: events as TEvent[],
    };

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export default GetAllEvents;
