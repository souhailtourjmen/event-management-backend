import { ClientRepo, EventRepo } from '../../src/typeorm/data-source';

export const clearDB = async () => {
  // Use createQueryBuilder for a safer 'delete all'
  await EventRepo.createQueryBuilder().delete().execute();
  await ClientRepo.createQueryBuilder().delete().execute();
};
