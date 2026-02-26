import type { Card, Transaction } from '@jweichiem-mockup/shared-types';

export class ApiError extends Error {
	status: number;

	constructor(status: number, message: string) {
		super(message);
		this.name = 'ApiError';
		this.status = status;
	}
}

export interface ApiClient {
	getCards: () => Promise<Card[]>;
	getTransactionsByCardId: (cardId: string) => Promise<Transaction[]>;
}

export interface ApiClientOptions {
	baseUrl?: string;
}

const parseResponse = async <T>(response: Response): Promise<T> => {
	if (!response.ok) {
		let message = `Request failed with status ${response.status}`;

		try {
			const body = (await response.json()) as { message?: string };
			if (body.message) {
				message = body.message;
			}
		} catch (_parseError) {
			// Keep default message if error body is not JSON.
		}

		throw new ApiError(response.status, message);
	}

	return (await response.json()) as T;
};

export const createApiClient = (options?: ApiClientOptions): ApiClient => {
	const baseUrl = options?.baseUrl ?? 'http://localhost:3001';

	return {
		async getCards() {
			const response = await fetch(`${baseUrl}/cards`);
			return parseResponse<Card[]>(response);
		},
		async getTransactionsByCardId(cardId: string) {
			const response = await fetch(`${baseUrl}/cards/${cardId}/transactions`);
			return parseResponse<Transaction[]>(response);
		},
	};
};

export type { Card, Transaction } from '@jweichiem-mockup/shared-types';
