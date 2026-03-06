export interface NavigationMountOptions {
	headerRoot: Element;
	footerRoot: Element;
	onNavigate?: (path: string) => void;
}

export interface NavigationProps {
	onNavigate?: (path: string) => void;
	pathname?: string;
}
