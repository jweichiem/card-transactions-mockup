import { useCallback, useEffect, useState } from 'react';

import { getAllTransactions, type TransactionWithCardId } from '../ApiClient';

type Status = 'idle' | 'loading' | 'success' | 'error';

export const useAllTransactions = () => {
	const [data, setData] = useState<TransactionWithCardId[]>([]);
	const [status, setStatus] = useState<Status>('idle');
	const [error, setError] = useState<string | null>(null);

	const load = useCallback(async () => {
		try {
			setStatus('loading');
			setError(null);

			const all = await getAllTransactions();
			setData(all);
			setStatus('success');
		} catch {
			setStatus('error');
			setError('Failed to load transactions');
		}
	}, []);

	useEffect(() => {
		load();
	}, [load]);

	return { data, status, error, refetch: load };
};
