import { afterEach, describe, expect, it, vi } from 'vitest';
import {
	cardsFixture,
	transactionsByCardIdFixture,
} from '../../api-server/tests/fixtures/index.js';
import { ApiError, createApiClient } from '../src/index.js';

describe('api-client', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('getCards returns parsed cards', async () => {
		vi.spyOn(globalThis, 'fetch').mockResolvedValue({
			ok: true,
			json: async () => cardsFixture,
		} as Response);

		const client = createApiClient({ baseUrl: 'http://localhost:3001' });
		const result = await client.getCards();

		expect(result).toEqual(cardsFixture);
		expect(fetch).toHaveBeenCalledWith('http://localhost:3001/cards');
	});

	it('getTransactionsByCardId returns parsed transactions', async () => {
		vi.spyOn(globalThis, 'fetch').mockResolvedValue({
			ok: true,
			json: async () => transactionsByCardIdFixture['lkmfkl-mlfkm-dlkfm'],
		} as Response);

		const client = createApiClient({ baseUrl: 'http://localhost:3001' });
		const result = await client.getTransactionsByCardId('lkmfkl-mlfkm-dlkfm');

		expect(result).toEqual(transactionsByCardIdFixture['lkmfkl-mlfkm-dlkfm']);
		expect(fetch).toHaveBeenCalledWith(
			'http://localhost:3001/cards/lkmfkl-mlfkm-dlkfm/transactions',
		);
	});

	it('throws ApiError on non-2xx responses', async () => {
		vi.spyOn(globalThis, 'fetch').mockResolvedValue({
			ok: false,
			status: 404,
			json: async () => ({ message: 'No transactions for card unknown-card' }),
		} as Response);

		const client = createApiClient();

		await expect(
			client.getTransactionsByCardId('unknown-card'),
		).rejects.toEqual(
			new ApiError(404, 'No transactions for card unknown-card'),
		);
	});
});
