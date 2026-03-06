import type { OrchestratorRoots } from './dom';
import { renderErrorState, renderRoutePlaceholder } from './dom';
import type { AccountRemoteModule, NavigationRemoteModule } from './remotes';

interface OrchestratorOptions {
	roots: OrchestratorRoots;
	defaultRoute: string;
	navRemoteOrigin: string;
	accountRemoteOrigin: string;
	loadNavigationRemote: (
		remoteOrigin: string,
	) => Promise<NavigationRemoteModule>;
	loadAccountRemote: (remoteOrigin: string) => Promise<AccountRemoteModule>;
}

export const startOrchestrator = async ({
	roots,
	defaultRoute,
	navRemoteOrigin,
	accountRemoteOrigin,
	loadNavigationRemote,
	loadAccountRemote,
}: OrchestratorOptions): Promise<() => void> => {
	const { headerRoot, footerRoot, contentRoot } = roots;

	let mountedNavigation = false;
	let accountLoaded = false;

	const accountHost = document.createElement('div');
	accountHost.id = 'account-overview';
	accountHost.hidden = true;
	contentRoot.appendChild(accountHost);

	const renderContent = async (pathname: string) => {
		if (pathname === '/account' || pathname.startsWith('/account/')) {
			accountHost.hidden = false;
			try {
				if (!accountLoaded) {
					await loadAccountRemote(accountRemoteOrigin);
					accountLoaded = true;
				}
				contentRoot.innerHTML = '';
				contentRoot.appendChild(accountHost);
				accountHost.hidden = false;
			} catch (error) {
				accountHost.hidden = true;
				renderErrorState(
					contentRoot,
					'Account Remote Unavailable',
					`Could not load account remote from ${accountRemoteOrigin}. ${String(error)}`,
				);
			}
			return;
		}

		accountHost.hidden = true;
		renderRoutePlaceholder(contentRoot, pathname);
		contentRoot.prepend(accountHost);
	};

	const onPopState = () => {
		void renderContent(window.location.pathname);
	};

	window.addEventListener('popstate', onPopState);

	if (window.location.pathname === '/') {
		window.history.replaceState({}, '', defaultRoute);
	}

	if (!mountedNavigation) {
		try {
			const { mountNavigation } = await loadNavigationRemote(navRemoteOrigin);
			mountNavigation({
				headerRoot,
				footerRoot,
				onNavigate: (path) => {
					if (window.location.pathname === path) return;
					window.history.pushState({}, '', path);
					window.dispatchEvent(new PopStateEvent('popstate'));
				},
			});
			mountedNavigation = true;
		} catch (error) {
			renderErrorState(
				contentRoot,
				'Navigation Remote Unavailable',
				`Could not load navigation remote from ${navRemoteOrigin}. ${String(error)}`,
			);
			return () => {
				window.removeEventListener('popstate', onPopState);
			};
		}
	}

	await renderContent(window.location.pathname);

	return () => {
		window.removeEventListener('popstate', onPopState);
	};
};
