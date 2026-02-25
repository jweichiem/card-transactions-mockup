import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  'packages/api-server/vitest.config.ts',
  'packages/api-client/vitest.config.ts',
  'packages/api-react/vitest.config.ts'
]);
