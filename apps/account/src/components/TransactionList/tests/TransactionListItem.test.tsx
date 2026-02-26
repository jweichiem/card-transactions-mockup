import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TransactionListItem } from '../TransactionListItem';

describe('TransactionListItem', () => {
	it('renders description and amount with default currency', () => {
		render(<TransactionListItem id="tx-1" description="Coffee" amount={12} />);

		expect(screen.getByText('Coffee')).toBeTruthy();
		expect(screen.getByText('12€')).toBeTruthy();
	});

	it('applies highlight class when highlight is true', () => {
		const { container } = render(
			<TransactionListItem
				id="tx-1"
				description="Coffee"
				amount={12}
				highlight
			/>,
		);

		const item = container.querySelector('li');
		expect(item?.classList.contains('transaction-list-item--highlighted')).toBe(
			true,
		);
	});
});
