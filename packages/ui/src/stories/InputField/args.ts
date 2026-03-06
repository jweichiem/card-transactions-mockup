import { fn } from 'storybook/test';

export const inputFieldBaseArgs = {
	id: 'amount',
	name: 'amount',
	type: 'number',
	value: '',
	inputMode: 'numeric',
	inputAttributes: {
		onChange: fn(),
		placeholder: 'Amount',
	},
} as const;

export const inputFieldWithValueArgs = {
	value: '50',
} as const;
