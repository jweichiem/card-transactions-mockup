import type { Card as CardModel } from '@jweichiem-mockup/shared-types';
import cards from '../../../../api-server/src/data/cards.json';

const [privateCard, businessCard] = cards as CardModel[];

export const privateCardArgs = {
	id: privateCard.id,
	description: privateCard.description,
	cardType: privateCard.cardType,
	selectedCardId: null,
} as const;

export const businessCardArgs = {
	id: businessCard.id,
	description: businessCard.description,
	cardType: businessCard.cardType,
	selectedCardId: null,
} as const;

export const selectedCardArgs = {
	...privateCardArgs,
	selectedCardId: privateCard.id,
} as const;
