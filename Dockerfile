FROM node:16-slim

WORKDIR /app

ENV NODE_OPTIONS=--openssl-legacy-provider

COPY package*.json ./

RUN npm install --omit=dev

COPY server.js .

EXPOSE 3001

CMD ["node", "server.js"]
