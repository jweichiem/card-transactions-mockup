import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputField } from '../../components/InputField/index.js';
import { commonFieldArgTypes } from '../common-args.js';
import { inputFieldBaseArgs, inputFieldWithValueArgs } from './args.js';

const meta = {
	title: 'Components/InputField',
	component: InputField,
	tags: ['autodocs'],
	argTypes: commonFieldArgTypes,
	args: inputFieldBaseArgs,
} satisfies Meta<typeof InputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
	args: inputFieldWithValueArgs,
};
