import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../src/app.js';
import { cardsFixture } from './fixtures/cards.js';
import { transactionsByCardIdFixture } from './fixtures/transactions.js';

describe('api-server routes', () => {
	const app = createApp();

	it('returns cards from GET /cards', async () => {
		const response = await request(app).get('/cards');

		expect(response.status).toBe(200);
		expect(response.body).toEqual(cardsFixture);
	});

	it('returns transactions from GET /cards/:cardId/transactions', async () => {
		const response = await request(app).get(
			'/cards/lkmfkl-mlfkm-dlkfm/transactions',
		);

		expect(response.status).toBe(200);
		expect(response.body).toEqual(
			transactionsByCardIdFixture['lkmfkl-mlfkm-dlkfm'],
		);
	});

	it('returns 404 for unknown card transactions', async () => {
		const response = await request(app).get('/cards/unknown-card/transactions');

		expect(response.status).toBe(404);
		expect(response.body).toEqual({
			message: 'No transactions for card unknown-card',
		});
	});
});
