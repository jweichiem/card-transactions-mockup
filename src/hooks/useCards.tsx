import { useCallback, useEffect, useState } from 'react';
import type { Card } from '../ApiClient';
import { getCards } from '../ApiClient';
import type { FetchError, Status } from './fetch.types';

interface UseCardsResult {
	data: Card[];
	status: Status;
	error: FetchError;
	refetch: () => Promise<void>;
}

export const useCards = (): UseCardsResult => {
	const [data, setData] = useState<Card[]>([]);
	const [status, setStatus] = useState<Status>('idle');
	const [error, setError] = useState<string | null>(null);

	const load = useCallback(async () => {
		try {
			setStatus('loading');
			const cards = await getCards();
			setData(cards);
			setStatus('success');
		} catch (_fetchCardError) {
			setStatus('error');
			setError('Failed to fetch cards'); // should normally use _fetchCardError
		}
	}, []);

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
