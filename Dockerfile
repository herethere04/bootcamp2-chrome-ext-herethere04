# Usamos a imagem oficial do Playwright que já vem com tudo que precisamos
FROM mcr.microsoft.com/playwright:v1.56.1-jammy
# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json para instalar as dependências primeiro (cache do Docker)
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o resto dos arquivos do projeto
COPY . .

# Comando padrão para rodar quando o container iniciar
CMD ["npm", "test"]