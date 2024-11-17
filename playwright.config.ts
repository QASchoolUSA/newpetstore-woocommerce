// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 60000, // Increase timeout as needed
  retries: 1, // Retry tests on failure
  use: {
    baseURL: 'http://localhost:3000', // Set your Next.js development URL
    headless: false, // Run in headless mode
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure', // Record video on test failure
  },
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
});