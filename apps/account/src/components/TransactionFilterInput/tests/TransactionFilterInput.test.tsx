import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TransactionFilterInput } from '..';

describe('TransactionFilterInput', () => {
	it('renders label and input with correct attributes', () => {
		render(
			<TransactionFilterInput
				id="t-filter"
				label="Filter by amount more than"
				value=""
			/>,
		);

		const input = screen.getByLabelText('Filter by amount more than');
		expect(input).toBeTruthy();
		expect(input.getAttribute('type')).toBe('number');
		expect(input.getAttribute('inputmode')).toBe('numeric');
		expect(input.getAttribute('id')).toBe('t-filter');
	});
});
