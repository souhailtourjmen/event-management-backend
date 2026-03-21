import { Request, Response, NextFunction } from 'express';
import { EventRepo } from '../../typeorm/data-source';
import { TApiResponse, TEvent } from '../../types/types.d';
import CustomError from '../../utils/CustomError';

import validateCreateEventForm from '../../utils/validateCreateEventForm';

const CreateEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, form } = validateCreateEventForm(req);
    if (error) {
      throw new CustomError(400, error);
    }

    const { title, description, date, location } = form!;

    const event = EventRepo.create({
      title,
      description,
      date,
      location,
    });

    await EventRepo.save(event);

    const response: TApiResponse<TEvent> = {
      success: true,
      message: 'Event created successfully',
      data: event as TEvent,
    };

    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export default CreateEvent;
