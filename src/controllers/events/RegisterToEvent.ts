import { Request, Response, NextFunction } from 'express';
import { EventRepo, ClientRepo } from '../../typeorm/data-source';
import CustomError from '../../utils/CustomError';
import { TApiResponse } from '../../types/types.d';

const RegisterToEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: eventId } = req.params;
    const clientId = req.user?.id;
    if (!clientId) throw new CustomError(401, 'Unauthorized');

    const event = await EventRepo.findOne({
      where: { id: eventId },
      relations: ['clients'],
    });

    if (!event) {
      throw new CustomError(404, 'Event not found');
    }

    const client = await ClientRepo.findOneBy({ id: clientId });
    if (!client) {
      throw new CustomError(404, 'Client not found');
    }

    // Check if client is already registered
    const alreadyRegistered = event.clients.some((c) => c.id === clientId);
    if (alreadyRegistered) {
      throw new CustomError(400, 'Client already registered for this event');
    }

    event.clients.push(client);
    await EventRepo.save(event);

    const response: TApiResponse<null> = {
      success: true,
      message: 'Registered for event successfully',
      data: null,
    };

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export default RegisterToEvent;
