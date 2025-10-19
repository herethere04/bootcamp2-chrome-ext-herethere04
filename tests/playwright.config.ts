import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 90 * 1000, // Tempo limite generoso de 90 segundos
  expect: {
    timeout: 10 * 1000, // Tempo de espera para comandos como expect(..).toBeVisible()
  },
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  
  use: {
    // ESSENCIAL: Extensões MV3 não funcionam em modo headless
    headless: false,
  },
});