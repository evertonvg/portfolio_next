# Use Node.js 24 (imagem oficial do Node)
FROM node:24

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência primeiro
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do projeto
COPY . .

# Expõe a porta padrão do Next.js
EXPOSE 3000

# Comando padrão para iniciar o Next.js em dev
CMD ["npm", "run", "dev"]
