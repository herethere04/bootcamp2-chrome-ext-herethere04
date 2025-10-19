import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  // Aumenta o tempo limite geral para dar mais folga no ambiente de CI
  timeout: 60 * 1000, 
  
  // ESSENCIAL: Inicia o servidor web local antes de qualquer teste
  webServer: {
    command: 'npx http-server ./tests -p 3000 --silent',
    url: 'http://localhost:3000/test.html', // Playwright vai esperar por esta URL
    reuseExistingServer: !process.env.CI,
    timeout: 60 * 1000,
  },
  
  use: {
    // OBRIGATÓRIO: Extensões MV3 não funcionam em modo headless
    headless: false,
  },
});