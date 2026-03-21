import { Request, Response, NextFunction } from 'express';
import { EventRepo } from '../../typeorm/data-source';

const GetEventClients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const event = await EventRepo.findOne({
      where: { id },
      relations: ['clients'],
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Event clients fetched successfully',
      data: event.clients,
    });
  } catch (error) {
    next(error);
  }
};

export default GetEventClients;
