import type React from 'react';
import type { NavigationProps } from '../types.js';
import { Links } from './Links.js';

export const Header: React.FC<NavigationProps> = ({ onNavigate, pathname }) => {
	return (
		<header className="navigation-shell navigation-shell--header">
			<div className="navigation-shell__container">
				<p className="navigation-shell__brand">Bank Mockup</p>
				<nav aria-label="Primary">
					<Links
						keyPrefix="header"
						onNavigate={onNavigate}
						pathname={pathname}
					/>
				</nav>
			</div>
		</header>
	);
};
