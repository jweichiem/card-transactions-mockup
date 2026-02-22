import { useCallback, useEffect, useState } from 'react';
import type { Transaction } from '../ApiClient';
import { getTransactionsByCardId } from '../ApiClient';
import type { FetchError, Status } from './fetch.types';

interface UseTransactionResults {
	data: Transaction[];
	status: Status;
	error: FetchError;
	refetch: () => Promise<void>;
}

export const useTransactionsByCardId = (
	cardId: string | null,
): UseTransactionResults => {
	const [data, setData] = useState<Transaction[]>([]);
	const [status, setStatus] = useState<Status>('idle');
	const [error, setError] = useState<string | null>(null);

	const load = useCallback(async () => {
		if (!cardId) return;

		try {
			setStatus('loading');
			const transactions = await getTransactionsByCardId(cardId);
			setData(transactions);
			setStatus('success');
		} catch (_fetchTransactionsError) {
			setStatus('error');
			setError('Failed to fetch transactions by card id'); // should normally use fetchTransactionsErrort
		}
	}, [cardId]);

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
