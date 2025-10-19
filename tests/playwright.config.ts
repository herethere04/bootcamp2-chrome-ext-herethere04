import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extensionPath = path.join(__dirname, '../dist');

export default defineConfig({
  testDir: './',
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],

  // Inicia um servidor web local antes de rodar os testes
  webServer: {
    command: 'npx http-server ./tests -p 3000 --cors',
    url: 'http://localhost:3000', // Playwright vai esperar por esta URL
    reuseExistingServer: !process.env.CI,
  },

  use: {
    headless: true,
    // ====================================================================
    // >> CORREÇÃO PRINCIPAL <<
    // Define a URL base para todos os testes. Playwright vai garantir que
    // o webServer esteja pronto antes de continuar.
    baseURL: 'http://localhost:3000',
    // ====================================================================
  },

  projects: [
    {
      name: 'chromium-with-extension',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          headless: true,
          args: [
            `--disable-extensions-except=${extensionPath}`,
            `--load-extension=${extensionPath}`,
          ],
        },
      },
    },
  ],
});