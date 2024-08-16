FROM node:22-alpine AS base-image

RUN npm i -g pnpm

FROM base-image AS base 

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

CMD ["node", "server.mjs"]