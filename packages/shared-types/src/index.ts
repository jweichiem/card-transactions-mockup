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
