import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		port: 4174,
		strictPort: true,
		cors: true,
	},
	resolve: {
		alias: {
			'@jweichiem-mockup/ui-styles': fileURLToPath(
				new URL('../../packages/ui/src/styles/', import.meta.url),
			),
		},
	},
	plugins: [
		react({
			babel: {
				plugins: [['babel-plugin-react-compiler']],
			},
		}),
	],
});
