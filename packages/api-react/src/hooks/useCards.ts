import {
	type ApiClient,
	type Card,
	createApiClient,
} from '@jweichiem-mockup/api-client';
import { useCallback, useEffect, useState } from 'react';
import type { FetchError, Status } from '../types.js';

interface UseCardsResult {
	data: Card[];
	status: Status;
	error: FetchError;
	refetch: () => Promise<void>;
}

export const useCards = (
	client: ApiClient = createApiClient(),
): UseCardsResult => {
	const [data, setData] = useState<Card[]>([]);
	const [status, setStatus] = useState<Status>('idle');
	const [error, setError] = useState<string | null>(null);

	const load = useCallback(async () => {
		try {
			setStatus('loading');
			setError(null);
			const cards = await client.getCards();
			setData(cards);
			setStatus('success');
		} catch (_fetchCardError) {
			setStatus('error');
			setError('Failed to fetch cards');
		}
	}, [client]);

	useEffect(() => {
		load();
	}, [load]);

	return {
		data,
		status,
		error,
		refetch: load,
	};
};
