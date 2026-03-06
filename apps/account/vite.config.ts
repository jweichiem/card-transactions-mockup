import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		port: 4173,
		strictPort: true,
		cors: true,
	},
	resolve: {
		alias: {
			'@jweichiem-mockup/shared-types': fileURLToPath(
				new URL('../../packages/shared-types/src/index.ts', import.meta.url),
			),
			'@jweichiem-mockup/api-client': fileURLToPath(
				new URL('../../packages/api-client/src/index.ts', import.meta.url),
			),
			'@jweichiem-mockup/api-react': fileURLToPath(
				new URL('../../packages/api-react/src/index.ts', import.meta.url),
			),
			'@jweichiem-mockup/ui': fileURLToPath(
				new URL('../../packages/ui/src/index.ts', import.meta.url),
			),
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
