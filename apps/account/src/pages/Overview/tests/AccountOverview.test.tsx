import {
	cardsFixture,
	transactionsByCardIdFixture,
} from '@jweichiem-mockup/api-server-test-fixtures';
import { screen } from '@testing-library/dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import AccountOverview from '..';

beforeEach(() => {
	globalThis.fetch = vi.fn(async (input: RequestInfo | URL) => {
		const path = new URL(input.toString(), 'http://localhost:3001').pathname;
		if (path === '/cards') {
			return new Response(JSON.stringify(cardsFixture), { status: 200 });
		}

		const matched = path.match(/^\/cards\/([^/]+)\/transactions$/);
		if (matched) {
			const cardId = matched[1];
			const transactions =
				transactionsByCardIdFixture[
					cardId as keyof typeof transactionsByCardIdFixture
				] ?? [];
			return new Response(JSON.stringify(transactions), { status: 200 });
		}

		return new Response(JSON.stringify({ message: 'not found' }), {
			status: 404,
		});
	}) as typeof fetch;
});

afterEach(() => {
	vi.restoreAllMocks();
});

describe('AccountOverview', () => {
	it('renders cards and helper message before selection', async () => {
		render(<AccountOverview />);

		await waitFor(() => {
			expect(screen.getByText('Private Card')).toBeTruthy();
		});

		expect(screen.getByText('Account Overview')).toBeTruthy();
		expect(screen.getByText('Business Card')).toBeTruthy();
		expect(
			screen.getByText(
				'Click a card to show transactions made through the selected card.',
			),
		).toBeTruthy();
		expect(screen.queryAllByRole('listitem').length).toBe(0);
	});

	it('shows transactions when a card is selected', async () => {
		render(<AccountOverview />);
		await waitFor(() => {
			expect(screen.getByText('Private Card')).toBeTruthy();
		});

		const privateCard = screen.getByRole('button', { name: /Private Card/i });
		fireEvent.click(privateCard);

		await waitFor(() => {
			expect(screen.getAllByRole('listitem').length).toBe(3);
		});
		expect(screen.getByText('Food')).toBeTruthy();
		expect(screen.getByText('Snack')).toBeTruthy();
		expect(screen.getByText('Tickets')).toBeTruthy();
	});

	it('filters transactions by minimum amount', async () => {
		render(<AccountOverview />);
		await waitFor(() => {
			expect(screen.getByText('Private Card')).toBeTruthy();
		});

		fireEvent.click(screen.getByRole('button', { name: /Private Card/i }));
		await waitFor(() => {
			expect(screen.getAllByRole('listitem').length).toBe(3);
		});
		const input = screen.getByLabelText('Filter by amount more than');

		fireEvent.change(input, { target: { value: '50' } });

		await waitFor(() => {
			expect(screen.getAllByRole('listitem').length).toBe(2);
		});
		const amountNodes = document.querySelectorAll(
			'.transaction-list-item__amount',
		);
		expect(amountNodes.length).toBe(2);
		amountNodes.forEach((node) => {
			const raw = (node.textContent ?? '').replace('€', '').trim();
			const value = Number(raw);
			expect(Number.isFinite(value)).toBe(true);
			expect(value).toBeGreaterThan(50);
		});
	});

	it('resets the filter when switching cards', async () => {
		render(<AccountOverview />);
		await waitFor(() => {
			expect(screen.getByText('Private Card')).toBeTruthy();
		});

		fireEvent.click(screen.getByRole('button', { name: /Private Card/i }));
		await waitFor(() => {
			expect(screen.getAllByRole('listitem').length).toBe(3);
		});
		const input = screen.getByLabelText('Filter by amount more than');
		fireEvent.change(input, { target: { value: '50' } });
		expect((input as HTMLInputElement).value).toBe('50');

		fireEvent.click(screen.getByRole('button', { name: /Business Card/i }));
		await waitFor(() => {
			expect((input as HTMLInputElement).value).toBe('');
		});

		await waitFor(() => {
			expect(screen.getAllByRole('listitem').length).toBe(3);
		});
		expect(screen.getByText('T-Shirt')).toBeTruthy();
		expect(screen.getByText('Smart Phone')).toBeTruthy();
		expect(screen.getByText('Chocolate Bar')).toBeTruthy();
	});

	it('does not reset the filter when clicking the selected card again', async () => {
		render(<AccountOverview />);
		await waitFor(() => {
			expect(screen.getByText('Private Card')).toBeTruthy();
		});

		const privateCard = screen.getByRole('button', { name: /Private Card/i });
		fireEvent.click(privateCard);
		await waitFor(() => {
			expect(screen.getAllByRole('listitem').length).toBe(3);
		});

		const input = screen.getByLabelText('Filter by amount more than');
		fireEvent.change(input, { target: { value: '50' } });

		fireEvent.click(privateCard);

		expect((input as HTMLInputElement).value).toBe('50');
		await waitFor(() => {
			expect(screen.getAllByRole('listitem').length).toBe(2);
		});
		expect(screen.getByText('Food')).toBeTruthy();
		expect(screen.getByText('Tickets')).toBeTruthy();
	});
});
