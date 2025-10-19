import { test, expect, chromium } from '@playwright/test';
import type { BrowserContext, Page } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho para a pasta da extensão JÁ CONSTRUÍDA
const extensionPath = path.join(__dirname, '../dist'); 

// URL completa para a página de teste, que será servida pelo http-server
const testPageURL = 'http://localhost:3000/test.html';

test.describe('Testes da Extensão Site Time Tracker', () => {
  let browserContext: BrowserContext;
  let page: Page;

  // ANTES DE TUDO: Inicia um navegador persistente com a extensão carregada
  test.beforeAll(async () => {
    browserContext = await chromium.launchPersistentContext('', {
      headless: false, // Obrigatório para a extensão funcionar
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

  // ANTES DE CADA TESTE: Cria uma página limpa
  test.beforeEach(async () => {
    page = await browserContext.newPage();
  });

  // DEPOIS DE CADA TESTE: Fecha a página
  test.afterEach(async () => {
    await page.close();
  });

  test('O cronômetro flutuante deve aparecer na página', async () => {
    await page.goto(testPageURL);
    
    const timerContainer = page.locator('.time-tracker-container');
    
    // O teste vai esperar até 15 segundos para o elemento aparecer
    await expect(timerContainer).toBeVisible({ timeout: 15000 });
    
    // E então verifica o texto
    await expect(timerContainer).toHaveText(/Tempo no site: \d{2}:\d{2}:\d{2}/);
  });
});