import { useCallback, useEffect, useState } from 'react';
import {
  createApiClient,
  type ApiClient,
  type Transaction
} from '@jweichiem-mockup/api-client';
import type { FetchError, Status } from '../types.js';

interface UseTransactionsResult {
  data: Transaction[];
  status: Status;
  error: FetchError;
  refetch: () => Promise<void>;
}

export const useTransactionsByCardId = (
  cardId: string | null,
  client: ApiClient = createApiClient()
): UseTransactionsResult => {
  const [data, setData] = useState<Transaction[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!cardId) {
      setData([]);
      setStatus('idle');
      setError(null);
      return;
    }

    try {
      setStatus('loading');
      setError(null);
      const transactions = await client.getTransactionsByCardId(cardId);
      setData(transactions);
      setStatus('success');
    } catch (_fetchTransactionsError) {
      setStatus('error');
      setError('Failed to fetch transactions by card id');
    }
  }, [cardId, client]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    data,
    status,
    error,
    refetch: load
  };
};
