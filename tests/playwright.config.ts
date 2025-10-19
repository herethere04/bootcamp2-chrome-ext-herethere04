import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 90 * 1000,
  expect: {
    timeout: 15 * 1000,
  },
  
  // GARANTIA MÁXIMA: Define que o reporter HTML deve ser usado sempre.
  // A opção 'always' força a geração mesmo em caso de falha, e 'on-first-retry' em caso de retentativa.
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  
  // A configuração do webServer está correta, vamos mantê-la.
  webServer: {
    command: 'npx http-server ./tests -p 3000 --silent',
    url: 'http://localhost:3000/test.html',
    reuseExistingServer: !process.env.CI,
    timeout: 60 * 1000,
  },
  
  use: {
    headless: false,
  },
});