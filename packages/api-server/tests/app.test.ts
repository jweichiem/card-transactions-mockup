import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../src/app.js';

describe('api-server routes', () => {
  const app = createApp();

  it('returns cards from GET /cards', async () => {
    const response = await request(app).get('/cards');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toMatchObject({
      id: expect.any(String),
      description: expect.any(String),
      cardType: expect.any(String)
    });
  });

  it('returns transactions from GET /cards/:cardId/transactions', async () => {
    const response = await request(app).get('/cards/lkmfkl-mlfkm-dlkfm/transactions');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
    expect(response.body[0]).toMatchObject({
      id: expect.any(String),
      description: expect.any(String),
      amount: expect.any(Number)
    });
  });

  it('returns 404 for unknown card transactions', async () => {
    const response = await request(app).get('/cards/unknown-card/transactions');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'No transactions for card unknown-card'
    });
  });
});
