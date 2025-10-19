import { test, expect, chromium } from '@playwright/test';
import type { BrowserContext, Page } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

// Maneira moderna de obter o __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extensionPath = path.join(__dirname, '../dist');

test.describe('Testes da Extensão Site Time Tracker', () => {
  let browserContext: BrowserContext;
  let page: Page;

  test.beforeAll(async () => {
    browserContext = await chromium.launchPersistentContext('', {
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
      ],
    });
    
    await browserContext.waitForEvent('serviceworker');
  });

  test.afterAll(async () => {
    await browserContext.close();
  });

  test.beforeEach(async () => {
    page = browserContext.pages()[0] || await browserContext.newPage();
  });

  test('O cronômetro flutuante deve aparecer na página', async () => {
    await page.goto('https://playwright.dev/');
    const timerContainer = page.locator('.time-tracker-container');
    
    // O teste agora só procurará o elemento DEPOIS que a extensão carregou
    await expect(timerContainer).toBeVisible({ timeout: 5000 });
    
    await expect(timerContainer).toHaveText(/Tempo no site: \d{2}:\d{2}:\d{2}/);
  });
});