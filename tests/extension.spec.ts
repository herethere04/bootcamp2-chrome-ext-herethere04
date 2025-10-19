import { test, expect, chromium } from '@playwright/test';
import type { BrowserContext, Page } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extensionPath = path.join(__dirname, '../dist');

test.describe('Testes da Extensão Site Time Tracker', () => {
  let browserContext: BrowserContext;
  let page: Page;

  test.beforeAll(async () => {
    browserContext = await chromium.launchPersistentContext('', {
      headless: true,
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
      ],
    });
  });

  test.afterAll(async () => {
    await browserContext.close();
  });

  test.beforeEach(async () => {
    page = await browserContext.newPage();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('O cronômetro flutuante deve aparecer na página', async () => {
    // MUDANÇA: Usando um caminho relativo. Playwright usará a baseURL
    // e esperará o servidor estar pronto antes de executar.
    await page.goto('/test.html');

    const timerContainer = page.locator('.time-tracker-container');

    await expect(timerContainer).toBeVisible({ timeout: 10000 });
    await expect(timerContainer).toHaveText(/Tempo no site: \d{2}:\d{2}:\d{2}/);
  });
});