import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import Overview from './pages/Overview';

createRoot(
	document.getElementById('account-overview') as HTMLDivElement,
).render(
	<StrictMode>
		<Overview />
	</StrictMode>,
);
