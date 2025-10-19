import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extensionPath = path.join(__dirname, '../dist');

export default defineConfig({
  testDir: './',
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],

  // ====================================================================
  // >> INÍCIO DA CORREÇÃO <<
  // Inicia um servidor web local antes de rodar os testes
  webServer: {
    command: 'npx http-server ./tests -p 3000 --cors', // Serve a pasta 'tests' na porta 3000
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  // >> FIM DA CORREÇÃO <<

  use: {
    headless: true,
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