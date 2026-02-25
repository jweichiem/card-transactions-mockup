import { afterEach, describe, expect, it, vi } from 'vitest';
import { ApiError, createApiClient } from '../src/index.js';

describe('api-client', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('getCards returns parsed cards', async () => {
    const mockCards = [
      { id: '1', description: 'Private Card', cardType: 'private' as const }
    ];

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockCards
    } as Response);

    const client = createApiClient({ baseUrl: 'http://localhost:3001' });
    const result = await client.getCards();

    expect(result).toEqual(mockCards);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/cards');
  });

  it('getTransactionsByCardId returns parsed transactions', async () => {
    const mockTransactions = [
      { id: 't1', description: 'Food', amount: 123.88 }
    ];

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockTransactions
    } as Response);

    const client = createApiClient({ baseUrl: 'http://localhost:3001' });
    const result = await client.getTransactionsByCardId('card-1');

    expect(result).toEqual(mockTransactions);
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3001/cards/card-1/transactions'
    );
  });

  it('throws ApiError on non-2xx responses', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({ message: 'No transactions for card unknown-card' })
    } as Response);

    const client = createApiClient();

    await expect(client.getTransactionsByCardId('unknown-card')).rejects.toEqual(
      new ApiError(404, 'No transactions for card unknown-card')
    );
  });
});
