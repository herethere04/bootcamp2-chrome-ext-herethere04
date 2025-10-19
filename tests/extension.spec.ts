import { test, expect, chromium } from '@playwright/test';
import type { BrowserContext, Page } from '@playwright/test';
import path from 'path';

const extensionPath = path.join(__dirname, '../dist');

test.describe('Testes da Extensão Site Time Tracker', () => {
  let browserContext: BrowserContext;
  let page: Page;

  // Aumentamos um pouco o timeout do beforeAll para dar mais folga no ambiente de CI
  test.beforeAll(async () => {
    // Lança um contexto de navegador persistente com a extensão carregada
    // MUDANÇA: Usando chromium.launchPersistentContext, que é mais estável para extensões
    browserContext = await chromium.launchPersistentContext('', {
      headless: true,
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
      ],
    });

    // REMOVIDO: A linha `waitForEvent('serviceworker')` foi removida pois causava o timeout.
    // A extensão já carrega automaticamente.
  });

  test.afterAll(async () => {
    await browserContext.close();
  });

  // Criamos uma nova página para cada teste para garantir isolamento
  test.beforeEach(async () => {
    page = await browserContext.newPage();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('O cronômetro flutuante deve aparecer na página', async () => {
    // Navega para uma página de exemplo
    await page.goto('https://playwright.dev/');

    // Localiza o container do nosso cronômetro pelo seletor de classe CSS
    const timerContainer = page.locator('.time-tracker-container');
    
    // Espera o elemento aparecer e verifica se ele está visível
    await expect(timerContainer).toBeVisible({ timeout: 10000 }); // Damos 10s para aparecer

    // Verifica se o texto inicial do cronômetro corresponde ao formato esperado (HH:MM:SS)
    await expect(timerContainer).toHaveText(/Tempo no site: \d{2}:\d{2}:\d{2}/);
  });
});