import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
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
			'@jweichiem-mockup/api-server-test-fixtures': fileURLToPath(
				new URL(
					'../../packages/api-server/tests/fixtures/index.ts',
					import.meta.url,
				),
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
	test: {
		environment: 'jsdom',
		include: ['src/**/*.test.tsx'],
		setupFiles: ['./tests/setup.ts'],
	},
});
