import type { Transaction } from '@jweichiem-mockup/shared-types';
import transactionsByCardId from '../../src/data/transactions.json';

export const transactionsByCardIdFixture = transactionsByCardId as Record<
	string,
	Transaction[]
>;
