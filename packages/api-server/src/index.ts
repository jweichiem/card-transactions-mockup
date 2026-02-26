import { createApp } from './app.js';

const port = Number(process.env.PORT ?? 3001);

createApp().listen(port, () => {
	// Keep logging minimal for local dev startup visibility.
	console.log(`api-server listening on http://localhost:${port}`);
});
