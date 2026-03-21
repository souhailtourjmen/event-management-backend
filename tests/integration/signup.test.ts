import request from 'supertest';
import { Express } from 'express';
import setUpApp from '../../src/setUpApp';
import { DB } from '../../src/typeorm/data-source';

import { clearDB } from '../utils/clearDB';

describe('POST /api/v1/auth/signup', () => {
  let app: Express;

  beforeAll(async () => {
    app = await setUpApp();
    await clearDB();
  });

  afterAll(async () => {
    await DB.destroy();
  });

  it('should create a new client', async () => {
    const formData = {
      fullName: 'Test Client',
      email: 'testclient@example.com',
      phoneNumber: '1234567890',
      password: 'password123',
    };

    const response = await request(app)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(formData);

    expect(response.status).toBe(201);
    expect(response.body?.success).toBe(true);
    expect(response.body?.message).toBe('Client registered successfully');
    expect(response.body?.data).toHaveProperty('id');
  });

  it('should return error if client already exists', async () => {
    const formData = {
      fullName: 'Test Client',
      email: 'testclient@example.com',
      phoneNumber: '1234567890',
      password: 'password123',
    };

    const response = await request(app)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(formData);

    expect(response.status).toBe(400);
    expect(response.body?.success).toBe(false);
    expect(response.body?.message).toBe('Client already exists');
  });

  it('should return error if email is invalid', async () => {
    const formData = {
      fullName: 'Test Client',
      email: 'invalid-email',
      phoneNumber: '1234567890',
      password: 'password123',
    };

    const response = await request(app)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(formData);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Invalid email format');
  });

  it('should return error if password is too short', async () => {
    const formData = {
      fullName: 'Test Client',
      email: 'valid@example.com',
      phoneNumber: '1234567890',
      password: 'short',
    };

    const response = await request(app)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(formData);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Password must be at least 8 characters long');
  });
});
