import request from 'supertest';
import { Express } from 'express';
import setUpApp from '../../src/setUpApp';
import { DB } from '../../src/typeorm/data-source';

import { clearDB } from '../utils/clearDB';

describe('POST /api/v1/auth/signin', () => {
  let app: Express;

  beforeAll(async () => {
    app = await setUpApp();
    await clearDB();
    // Create a test client
    await request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullName: 'Signin Test',
        email: 'signin@test.com',
        phoneNumber: '12345',
        password: 'password123'
      });
  });

  afterAll(async () => {
    await DB.destroy();
  });

  it('should login successfully with correct credentials', async () => {
    const response = await request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'signin@test.com',
        password: 'password123'
      });

    expect(response.status).toBe(200);
    expect(response.body?.success).toBe(true);
    expect(response.body?.data).toHaveProperty('token');
  });

  it('should fail with incorrect password', async () => {
    const response = await request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'signin@test.com',
        password: 'wrongpassword'
      });

    expect(response.status).toBe(401);
    expect(response.body?.success).toBe(false);
  });
});
