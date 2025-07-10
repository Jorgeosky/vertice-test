import request from 'supertest';
import main from '../app';
import User from '../models/User';

describe('User registration', () => {
  it('should register a user', async () => {
    const res = await request(main).post('/auth/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: '123456',
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });
});
