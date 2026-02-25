import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import AccountOverview from './pages/AccountOverview.tsx';

createRoot(document.getElementById('root') as HTMLDivElement).render(
	<StrictMode>
		<AccountOverview />
	</StrictMode>,
);
