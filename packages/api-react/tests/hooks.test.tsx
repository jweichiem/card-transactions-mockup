import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { ApiClient } from '@jweichiem-mockup/api-client';
import { useCards } from '../src/hooks/useCards.js';
import { useTransactionsByCardId } from '../src/hooks/useTransactionsByCardId.js';

type HookResult<T> = {
  result: { current: T };
};

const cleanupCallbacks: Array<() => void> = [];
const globalWithActEnv = globalThis as typeof globalThis & {
  IS_REACT_ACT_ENVIRONMENT?: boolean;
};
globalWithActEnv.IS_REACT_ACT_ENVIRONMENT = true;

const waitFor = async (
  assertion: () => void,
  timeoutMs = 1000,
  intervalMs = 10
) => {
  const deadline = Date.now() + timeoutMs;
  let lastError: unknown;

  while (Date.now() < deadline) {
    try {
      assertion();
      return;
    } catch (error) {
      lastError = error;
    }

    await act(async () => {
      await new Promise<void>((resolve) => {
        setTimeout(resolve, intervalMs);
      });
    });
  }

  if (lastError instanceof Error) {
    throw lastError;
  }
  throw new Error('waitFor timed out');
};

const renderHook = <T,>(hook: () => T): HookResult<T> => {
  const container = document.createElement('div');
  document.body.append(container);
  const root = createRoot(container);
  const result = { current: undefined as T };

  const HookProbe = () => {
    result.current = hook();
    return null;
  };

  act(() => {
    root.render(<HookProbe />);
  });

  cleanupCallbacks.push(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  return { result };
};

afterEach(() => {
  for (const cleanup of cleanupCallbacks.splice(0)) {
    cleanup();
  }
});

describe('api-react hooks', () => {
  it('useCards handles loading and success', async () => {
    const client: ApiClient = {
      getCards: vi.fn().mockResolvedValue([
        { id: '1', description: 'Private Card', cardType: 'private' }
      ]),
      getTransactionsByCardId: vi.fn()
    };

    const { result } = renderHook(() => useCards(client));

    expect(result.current.status).toBe('loading');

    await waitFor(() => {
      expect(result.current.status).toBe('success');
    });

    expect(result.current.data).toHaveLength(1);
  });

  it('useCards handles errors', async () => {
    const client: ApiClient = {
      getCards: vi.fn().mockRejectedValue(new Error('fail')),
      getTransactionsByCardId: vi.fn()
    };

    const { result } = renderHook(() => useCards(client));

    await waitFor(() => {
      expect(result.current.status).toBe('error');
    });

    expect(result.current.error).toBe('Failed to fetch cards');
  });

  it('useTransactionsByCardId returns idle for null cardId', async () => {
    const client: ApiClient = {
      getCards: vi.fn(),
      getTransactionsByCardId: vi.fn()
    };

    const { result } = renderHook(() => useTransactionsByCardId(null, client));

    await waitFor(() => {
      expect(result.current.status).toBe('idle');
    });

    expect(client.getTransactionsByCardId).not.toHaveBeenCalled();
    expect(result.current.data).toEqual([]);
  });

  it('useTransactionsByCardId handles success', async () => {
    const client: ApiClient = {
      getCards: vi.fn(),
      getTransactionsByCardId: vi
        .fn()
        .mockResolvedValue([{ id: 'tx1', description: 'Food', amount: 22 }])
    };

    const { result } = renderHook(() =>
      useTransactionsByCardId('lkmfkl-mlfkm-dlkfm', client)
    );

    expect(result.current.status).toBe('loading');

    await waitFor(() => {
      expect(result.current.status).toBe('success');
    });

    expect(result.current.data).toHaveLength(1);
  });

  it('useTransactionsByCardId handles error state', async () => {
    const client: ApiClient = {
      getCards: vi.fn(),
      getTransactionsByCardId: vi.fn().mockRejectedValue(new Error('fail'))
    };

    const { result } = renderHook(() =>
      useTransactionsByCardId('unknown-card', client)
    );

    await waitFor(() => {
      expect(result.current.status).toBe('error');
    });

    expect(result.current.error).toBe('Failed to fetch transactions by card id');
  });
});
