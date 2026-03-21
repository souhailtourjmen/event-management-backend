import request from 'supertest';
import { Express } from 'express';
import setUpApp from '../../src/setUpApp';
import { DB } from '../../src/typeorm/data-source';

import { clearDB } from '../utils/clearDB';

describe('Event Endpoints', () => {
  let app: Express;
  let token: string;
  let eventId: string;

  beforeAll(async () => {
    app = await setUpApp();
    await clearDB();
    
    // Sign up and sign in to get a token
    await request(app).post('/api/v1/auth/signup').send({
      fullName: 'Event Tester',
      email: 'event@test.com',
      phoneNumber: '111',
      password: 'password123'
    });
    
    const loginRes = await request(app).post('/api/v1/auth/signin').send({
      email: 'event@test.com',
      password: 'password123'
    });
    token = loginRes.body.data.token;
  });

  afterAll(async () => {
    await DB.destroy();
  });

  it('should create an event', async () => {
    const response = await request(app)
      .post('/api/v1/events')
      .send({
        title: 'Integration Test Event',
        description: 'Testing events',
        date: '2026-12-31',
        location: 'Test Lab'
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    eventId = response.body.data.id;
  });

  it('should list all events', async () => {
    const response = await request(app).get('/api/v1/events');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it('should get event details', async () => {
    const response = await request(app).get(`/api/v1/events/${eventId}`);
    expect(response.status).toBe(200);
    expect(response.body.data.title).toBe('Integration Test Event');
  });

  it('should register for an event', async () => {
    const response = await request(app)
      .post(`/api/v1/events/${eventId}/register`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Registered for event successfully');
  });
});
