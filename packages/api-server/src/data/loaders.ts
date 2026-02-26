import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Card, Transaction } from '@jweichiem-mockup/shared-types';

const currentDir = dirname(fileURLToPath(import.meta.url));

const readJson = <T>(relativePath: string): T => {
	const filePath = resolve(currentDir, relativePath);
	const raw = readFileSync(filePath, 'utf-8');
	return JSON.parse(raw) as T;
};

export const getCardsData = (): Card[] => readJson<Card[]>('./cards.json');

export const getTransactionsData = (): Record<string, Transaction[]> =>
	readJson<Record<string, Transaction[]>>('./transactions.json');
