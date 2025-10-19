import { test, expect, chromium } from '@playwright/test';
import type { BrowserContext, Page } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extensionPath = path.join(__dirname, '../dist');

// VOLTAMOS A USAR A URL COMPLETA E EXPLÍCITA
const testPageURL = 'http://localhost:3000/test.html';

test.describe('Testes da Extensão Site Time Tracker', () => {
  let browserContext: BrowserContext;
  let page: Page;

  // PRECISAMOS DO beforeAll PARA CRIAR O CONTEXTO COM A EXTENSÃO
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

  // PRECISAMOS DO beforeEach PARA CRIAR UMA PÁGINA NOVA A CADA TESTE
  test.beforeEach(async () => {
    page = await browserContext.newPage();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('O cronômetro flutuante deve aparecer na página', async () => {
    // USAMOS A URL COMPLETA, POIS O CONTEXTO MANUAL NÃO CONHECE A baseURL
    await page.goto(testPageURL);

    const timerContainer = page.locator('.time-tracker-container');

    await expect(timerContainer).toBeVisible({ timeout: 15000 }); // Aumentei o timeout para dar mais folga
    await expect(timerContainer).toHaveText(/Tempo no site: \d{2}:\d{2}:\d{2}/);
  });
});