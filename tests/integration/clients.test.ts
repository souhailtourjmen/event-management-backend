import request from 'supertest';
import { Express } from 'express';
import setUpApp from '../../src/setUpApp';
import { DB } from '../../src/typeorm/data-source';

import { clearDB } from '../utils/clearDB';

describe('Client Endpoints', () => {
  let app: Express;
  let token: string;

  beforeAll(async () => {
    app = await setUpApp();
    await clearDB();
    
    await request(app).post('/api/v1/auth/signup').send({
      fullName: 'Profile Tester',
      email: 'profile@test.com',
      phoneNumber: '222',
      password: 'password123'
    });
    
    const loginRes = await request(app).post('/api/v1/auth/signin').send({
      email: 'profile@test.com',
      password: 'password123'
    });
    token = loginRes.body.data.token;
  });

  afterAll(async () => {
    await DB.destroy();
  });

  it('should get personal profile', async () => {
    const response = await request(app)
      .get('/api/v1/clients/me')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data.email).toBe('profile@test.com');
  });

  it('should update profile', async () => {
    const response = await request(app)
      .put('/api/v1/clients/me')
      .set('Authorization', `Bearer ${token}`)
      .send({ fullName: 'Updated Name' });

    expect(response.status).toBe(200);
    expect(response.body.data.fullName).toBe('Updated Name');
  });

  it('should list all clients', async () => {
    const response = await request(app).get('/api/v1/clients');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});
