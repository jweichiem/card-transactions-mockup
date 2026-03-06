import type React from 'react';
import type { NavigationProps } from '../types.js';
import { Links } from './Links.js';

export const Footer: React.FC<NavigationProps> = ({ onNavigate, pathname }) => {
	return (
		<footer className="navigation-shell navigation-shell--footer">
			<div className="navigation-shell__container">
				<nav aria-label="Footer">
					<Links
						keyPrefix="footer"
						onNavigate={onNavigate}
						pathname={pathname}
					/>
				</nav>
				<small className="navigation-shell__copy">
					{new Date().getFullYear()} Bank Mockup
				</small>
			</div>
		</footer>
	);
};
