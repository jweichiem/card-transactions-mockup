// import { cards } from "./data/cards";
// import { transactions } from "./data/transactions";

export type CardType = 'private' | 'business';

export interface Card {
	id: string;
	description: string;
	cardType: CardType;
}

export interface Transaction {
	id: string;
	description: string;
	amount: number;
}

export async function getCards(): Promise<Card[]> {
	const cards = (await import('./data/cards.json')).default as Card[]; // casting specifically, for mockup purpose.

	return cards;
}

export async function getTransactionsByCardId(
	cardId: string,
): Promise<Transaction[]> {
	const transactions: Record<string, Transaction[]> = (
		await import('./data/transactions.json')
	).default;

	if (transactions[cardId]) {
		return transactions[cardId];
	}

	throw new Error('cardId not found');
}

export interface TransactionWithCardId extends Transaction {
	cardId: string;
}

export async function getAllTransactions(): Promise<TransactionWithCardId[]> {
	const transactionsByCard: Record<string, Transaction[]> = (
		await import('./data/transactions.json')
	).default;

	// Iterate by cardId and flatten to include cardId as key.
	return Object.entries(transactionsByCard).flatMap(([cardId, txs]) =>
		txs.map((t) => ({ ...t, cardId })),
	);
}
