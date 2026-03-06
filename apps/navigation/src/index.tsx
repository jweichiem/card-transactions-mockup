import type { ReactNode } from 'react';
import { createRoot, hydrateRoot, type Root } from 'react-dom/client';
import { Footer } from './components/Footer.js';
import { Header } from './components/Header.js';
import type { NavigationMountOptions } from './types.js';
import './styles.scss';

interface Unmountable {
	unmount: () => void;
}

const mountOrHydrate = (root: Element, element: ReactNode): Unmountable => {
	if (root.hasChildNodes()) {
		return hydrateRoot(root, element);
	}

	const app: Root = createRoot(root);
	app.render(element);
	return app;
};

export const mountNavigation = ({
	headerRoot,
	footerRoot,
	onNavigate,
}: NavigationMountOptions): (() => void) => {
	const headerApp = mountOrHydrate(
		headerRoot,
		<Header onNavigate={onNavigate} />,
	);
	const footerApp = mountOrHydrate(
		footerRoot,
		<Footer onNavigate={onNavigate} />,
	);

	return () => {
		headerApp.unmount();
		footerApp.unmount();
	};
};
