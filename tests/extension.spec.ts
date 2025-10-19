import { test, expect, chromium } from '@playwright/test';
import type { BrowserContext, Page } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho para a pasta da extensão JÁ CONSTRUÍDA
const extensionPath = path.join(__dirname, '../dist'); 

// URL completa para a nossa página de teste, servida pelo webServer
const testPageURL = 'http://localhost:3000/test.html';

test.describe('Testes da Extensão Site Time Tracker', () => {
  let browserContext: BrowserContext;
  let page: Page;

  // ANTES DE TUDO: Inicia um navegador com a extensão já carregada
  test.beforeAll(async () => {
    browserContext = await chromium.launchPersistentContext('', {
      headless: false, // Repetido aqui para garantir
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
      ],
    });
  });

  // DEPOIS DE TUDO: Fecha o navegador para limpar o processo
  test.afterAll(async () => {
    await browserContext.close();
  });

  // ANTES DE CADA TESTE: Cria uma página limpa dentro do navegador com a extensão
  test.beforeEach(async () => {
    page = await browserContext.newPage();
  });

  // DEPOIS DE CADA TESTE: Fecha a página
  test.afterEach(async () => {
    await page.close();
  });

  test('O cronômetro flutuante deve aparecer na página', async () => {
    await page.goto(testPageURL);
    
    // Pequena pausa explícita para dar tempo à extensão de injetar o script
    await page.waitForTimeout(1500); 

    const timerContainer = page.locator('.time-tracker-container');
    await expect(timerContainer).toBeVisible({ timeout: 15000 });
    await expect(timerContainer).toHaveText(/Tempo no site: \d{2}:\d{2}:\d{2}/);
  });
});