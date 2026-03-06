import { mountNavigation } from './index.js';

const headerRoot = document.getElementById('navigation-header');
const footerRoot = document.getElementById('navigation-footer');

if (headerRoot && footerRoot) {
	mountNavigation({
		headerRoot,
		footerRoot,
		onNavigate: (path) => {
			window.history.pushState({}, '', path);
			window.dispatchEvent(new PopStateEvent('popstate'));
		},
	});
}
