# ============================
# 🔧 STAGE 1: Builder
# ============================
FROM node:20-bookworm-slim AS builder

WORKDIR /app

# Copia apenas o necessário para instalar dependências
COPY package*.json ./

# Instala dependências com cache otimizado
RUN npm ci

# Copia código-fonte (somente o essencial)
COPY . .

# ============================
# 🧪 STAGE 2: Test Runner (Playwright)
# ============================
FROM mcr.microsoft.com/playwright:v1.48.0-jammy AS tester

WORKDIR /app

# Copia node_modules e código do estágio anterior
COPY --from=builder /app /app

# Instala navegadores Playwright (com cache layer)
RUN npx playwright install --with-deps

# Exponha a porta para o servidor de teste
EXPOSE 3000

# Comando padrão:
# 1️⃣ Sobe o servidor local
# 2️⃣ Espera a URL responder
# 3️⃣ Roda os testes E2E
CMD sh -c "\
  npx http-server ./tests -p 3000 --silent & \
  npx wait-on http://localhost:3000/test.html && \
  npx playwright test --reporter=line"