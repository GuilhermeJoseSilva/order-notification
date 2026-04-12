# Usa uma imagem base leve do Node
FROM node:18-slim

# Define a pasta de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência primeiro (isso otimiza o cache!)
COPY package*.json ./

# Instala as dependências dentro do container
RUN npm install

# Copia o restante do código fonte
COPY . .

# Comando para rodar a aplicação
CMD ["node", "src/consumer.js"]