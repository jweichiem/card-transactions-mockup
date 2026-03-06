import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Footer } from '../components/Footer.js';
import { Header } from '../components/Header.js';
import { renderNavigationShell } from '../ssr.js';

afterEach(() => {
	cleanup();
	vi.restoreAllMocks();
});

describe('Navigation Components', () => {
	it('marks current path as active', () => {
		vi.spyOn(window, 'location', 'get').mockReturnValue({
			...window.location,
			pathname: '/cards',
		});

		render(<Header />);

		expect(
			screen.getByRole('link', { name: 'Cards' }).getAttribute('data-active'),
		).toBe('true');
		expect(
			screen.getByRole('link', { name: 'Account' }).getAttribute('data-active'),
		).toBe('false');
	});

	it('calls onNavigate when a link is clicked', () => {
		const onNavigate = vi.fn();

		render(<Footer onNavigate={onNavigate} />);

		screen.getByRole('link', { name: 'Payments' }).click();

		expect(onNavigate).toHaveBeenCalledWith('/payments');
	});

	it('renders active links on server markup', () => {
		const { headerHtml, footerHtml } = renderNavigationShell('/payments');

		expect(headerHtml).toContain('aria-current="page"');
		expect(headerHtml).toContain('>Payments<');
		expect(footerHtml).toContain('aria-current="page"');
	});
});
