import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Card } from '../../components/Card/index.js';
import { centeredLayoutParameters } from '../common-args.js';
import { businessCardArgs, privateCardArgs, selectedCardArgs } from './args.js';

const meta = {
	title: 'Components/Card',
	component: Card,
	tags: ['autodocs'],
	parameters: centeredLayoutParameters,
	render: (args) => {
		const [, updateArgs] = useArgs();

		return (
			<Card
				{...args}
				onClick={() => {
					updateArgs({
						selectedCardId: args.selectedCardId === args.id ? null : args.id,
					});
				}}
			/>
		);
	},
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Private: Story = {
	args: privateCardArgs,
};

export const Business: Story = {
	args: businessCardArgs,
};

export const Selected: Story = {
	args: selectedCardArgs,
};
