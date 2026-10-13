import { defineConfig } from '@playwright/test';

const PORT = 5173;

export default defineConfig({
  testDir: './e2e',
  use: { baseURL: `http://localhost:${PORT}` },
  webServer: {
    command: `npx vite --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: true,
  },
});
