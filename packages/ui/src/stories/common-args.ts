export const centeredLayoutParameters = {
	layout: 'centered',
} as const;

export const commonFieldArgTypes = {
	id: {
		control: 'text',
		description: 'Stable identifier used for labels and accessibility.',
	},
	name: {
		control: 'text',
		description: 'Optional form field name attribute.',
	},
	value: {
		control: 'text',
		description: 'Controlled value for the input field.',
	},
} as const;
