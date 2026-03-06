import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { isActivePath, navigationItems } from '../navigation/items.js';

interface LinksProps {
	keyPrefix: string;
	onNavigate?: (path: string) => void;
	pathname?: string;
}

export const Links: React.FC<LinksProps> = ({
	keyPrefix,
	onNavigate,
	pathname: pathnameProp,
}) => {
	const [pathname, setPathname] = useState<string>(() => {
		if (pathnameProp) return pathnameProp;
		if (typeof window === 'undefined') return '/';
		return window.location.pathname;
	});

	useEffect(() => {
		if (pathnameProp || typeof window === 'undefined') return;

		const handlePopState = () => {
			setPathname(window.location.pathname);
		};

		window.addEventListener('popstate', handlePopState);
		return () => {
			window.removeEventListener('popstate', handlePopState);
		};
	}, [pathnameProp]);

	const activePathname = pathnameProp ?? pathname;

	const content = useMemo(
		() =>
			navigationItems.map(({ href, label }) => {
				const active = isActivePath(activePathname, href);

				return (
					<a
						key={`${keyPrefix}-${href}`}
						href={href}
						data-active={active}
						aria-current={active ? 'page' : undefined}
						onClick={(event) => {
							if (!onNavigate) return;
							event.preventDefault();
							onNavigate(href);
							setPathname(href);
						}}
					>
						{label}
					</a>
				);
			}),
		[activePathname, keyPrefix, onNavigate],
	);

	return <div className="navigation-shell__links">{content}</div>;
};
