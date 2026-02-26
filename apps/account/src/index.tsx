import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import Overview from './pages/Overview';

createRoot(document.getElementById('root') as HTMLDivElement).render(
	<StrictMode>
		<Overview />
	</StrictMode>,
);
