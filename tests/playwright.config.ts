import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  webServer: {
    command: 'npx http-server ./tests -p 3000 --silent',
    url: 'http://localhost:3000/test.html',
    reuseExistingServer: !process.env.CI,
    timeout: 60 * 1000,
  },
  use: {
    headless: false, // Extensões MV3 exigem que o modo headless seja desativado
  },
  // O código do seu teste (extension.spec.ts) já está correto para essa abordagem,
  // usando a URL completa e o contexto manual.
});