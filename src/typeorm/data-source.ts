import { DataSource } from 'typeorm';
import config from './config/config';
import { Event } from './entities/event.entity';
import { Client } from './entities/client.entity';

// Initialize the datasource/database connection
export const DB = new DataSource(config);

// Export Repository for the Entities
// https://typeorm.io/working-with-repository
const EventRepo = DB.getRepository(Event);
const ClientRepo = DB.getRepository(Client);

export { EventRepo, ClientRepo };
