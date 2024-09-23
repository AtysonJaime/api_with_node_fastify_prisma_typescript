# Use a imagem oficial do Node.js
FROM node:22

# Instala o pnpm globalmente
RUN npm install -g pnpm

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o arquivo pnpm-lock.yaml e package.json para o diretório de trabalho
COPY pnpm-lock.yaml ./
COPY package.json ./

# Instala as dependências usando pnpm
RUN pnpm install

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta que o Fastify usará
EXPOSE 3100

# Define o comando para iniciar a aplicação
# CMD ["pnpm", "start"]
