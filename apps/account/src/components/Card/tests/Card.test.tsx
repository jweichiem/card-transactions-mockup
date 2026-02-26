import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Card } from '..';

describe('Card', () => {
	it('renders as a button with description and id', () => {
		render(
			<Card
				id="card-1"
				description="Private Card"
				cardType="private"
				selectedCardId={null}
			/>,
		);

		const button = screen.getByRole('button', { name: /Private Card/i });
		expect(button).toBeTruthy();
		expect(screen.getByText('card-1')).toBeTruthy();
	});

	it('reflects selection state via aria-pressed and class', () => {
		const { rerender } = render(
			<Card
				id="card-1"
				description="Private Card"
				cardType="private"
				selectedCardId={null}
			/>,
		);

		let button = screen.getByRole('button', { name: /Private Card/i });
		expect(button.getAttribute('aria-pressed')).toBe('false');
		expect(button.classList.contains('card--selected')).toBe(false);

		rerender(
			<Card
				id="card-1"
				description="Private Card"
				cardType="private"
				selectedCardId="card-1"
			/>,
		);

		button = screen.getByRole('button', { name: /Private Card/i });
		expect(button.getAttribute('aria-pressed')).toBe('true');
		expect(button.classList.contains('card--selected')).toBe(true);
	});
});
