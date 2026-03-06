export interface NavigationRemoteModule {
	mountNavigation: (options: {
		headerRoot: Element;
		footerRoot: Element;
		onNavigate?: (path: string) => void;
	}) => () => void;
}

export type AccountRemoteModule = unknown;

export const loadNavigationRemote = async (
	remoteOrigin: string,
): Promise<NavigationRemoteModule> => {
	const remoteUrl = `${remoteOrigin}/src/index.tsx`;
	return import(
		/* @vite-ignore */ remoteUrl
	) as Promise<NavigationRemoteModule>;
};

export const loadAccountRemote = async (
	remoteOrigin: string,
): Promise<AccountRemoteModule> => {
	const remoteUrl = `${remoteOrigin}/src/index.tsx`;
	return import(/* @vite-ignore */ remoteUrl) as Promise<AccountRemoteModule>;
};
