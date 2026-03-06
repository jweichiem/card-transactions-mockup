export interface NavigationItem {
	href: string;
	label: string;
}

export const navigationItems: NavigationItem[] = [
	{ href: '/account', label: 'Account' },
	{ href: '/cards', label: 'Cards' },
	{ href: '/payments', label: 'Payments' },
];

export const isActivePath = (pathname: string, href: string): boolean =>
	pathname === href || pathname.startsWith(`${href}/`);
