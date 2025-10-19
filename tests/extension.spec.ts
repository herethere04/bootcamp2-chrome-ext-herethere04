import { test, expect } from '@playwright/test';

// REMOVEMOS: a importação manual de chromium, BrowserContext, etc.
// REMOVEMOS: a declaração manual de __dirname e dos caminhos.

// A configuração agora vive 100% no playwright.config.ts, como deveria ser.

test.describe('Testes da Extensão Site Time Tracker', () => {

  // REMOVEMOS: todos os hooks manuais (beforeAll, afterAll, beforeEach, afterEach).
  // O Playwright vai gerenciar o ciclo de vida do navegador e da página para nós.

  test('O cronômetro flutuante deve aparecer na página', async ({ page }) => {
    // A MÁGICA: Pedimos o "page" diretamente como argumento do teste.
    // Este "page" já vem do navegador correto (com a extensão) e
    // já conhece a baseURL.

    // Usando um caminho relativo. Playwright usará a baseURL
    // e esperará o servidor estar pronto antes de executar.
    await page.goto('/test.html');

    const timerContainer = page.locator('.time-tracker-container');

    await expect(timerContainer).toBeVisible({ timeout: 10000 });
    await expect(timerContainer).toHaveText(/Tempo no site: \d{2}:\d{2}:\d{2}/);
  });
});