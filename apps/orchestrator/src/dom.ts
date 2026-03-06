export interface OrchestratorRoots {
	headerRoot: Element;
	footerRoot: Element;
	contentRoot: Element;
}

export const getOrchestratorRoots = (): OrchestratorRoots => {
	const headerRoot = document.getElementById('navigation-header');
	const footerRoot = document.getElementById('navigation-footer');
	const contentRoot = document.getElementById('mfe-content');

	if (!headerRoot || !footerRoot || !contentRoot) {
		throw new Error('Missing orchestrator root element(s)');
	}

	return {
		headerRoot,
		footerRoot,
		contentRoot,
	};
};

export const renderErrorState = (
	contentRoot: Element,
	title: string,
	details: string,
): void => {
	contentRoot.innerHTML = '';
	const errorState = document.createElement('main');
	errorState.className = 'orchestrator-empty';
	errorState.innerHTML = `<h1>${title}</h1><p>${details}</p>`;
	contentRoot.appendChild(errorState);
};

export const renderRoutePlaceholder = (
	contentRoot: Element,
	pathname: string,
): void => {
	contentRoot.innerHTML = '';
	const emptyState = document.createElement('main');
	emptyState.className = 'orchestrator-empty';
	emptyState.innerHTML = `<h1>${pathname}</h1><p>This route is reserved for another microfrontend.</p>`;
	contentRoot.appendChild(emptyState);
};
