import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { Footer } from './components/Footer.js';
import { Header } from './components/Header.js';

interface NavigationShellHtml {
	headerHtml: string;
	footerHtml: string;
}

export const renderNavigationShell = (
	pathname: string,
): NavigationShellHtml => {
	return {
		headerHtml: renderToString(createElement(Header, { pathname })),
		footerHtml: renderToString(createElement(Footer, { pathname })),
	};
};
