import { test, expect, chromium } from '@playwright/test';
import type { BrowserContext, Page } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho correto para a pasta da extensão construída
const extensionPath = path.join(__dirname, '../dist'); 

// URL completa para a nossa página de teste local
const testPageURL = 'http://localhost:3000/test.html';

test.describe('Testes da Extensão Site Time Tracker', () => {
  let browserContext: BrowserContext;
  let page: Page;

  // ANTES DE TUDO: Inicia um navegador persistente com a extensão carregada
  test.beforeAll(async () => {
    browserContext = await chromium.launchPersistentContext('', {
      // Obrigatório: Extensões MV3 não funcionam em modo headless
      headless: false, 
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
      ],
    });
  });

  // DEPOIS DE TUDO: Fecha o navegador
  test.afterAll(async () => {
    await browserContext.close();
  });

  // ANTES DE CADA TESTE: Cria uma nova página limpa
  test.beforeEach(async () => {
    page = await browserContext.newPage();
  });

  // DEPOIS DE CADA TESTE: Fecha a página
  test.afterEach(async () => {
    await page.close();
  });

  test('O cronômetro flutuante deve aparecer na página', async () => {
    await page.goto(testPageURL);
    
    // Pequena pausa para garantir que o content script teve tempo de ser injetado
    await page.waitForTimeout(1000); 

    const timerContainer = page.locator('.time-tracker-container');
    await expect(timerContainer).toBeVisible({ timeout: 15000 });
    await expect(timerContainer).toHaveText(/Tempo no site: \d{2}:\d{2}:\d{2}/);
  });
});