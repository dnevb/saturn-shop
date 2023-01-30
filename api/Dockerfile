FROM node:lts

WORKDIR /app

RUN corepack enable

COPY package.json .
RUN pnpm install 

COPY . .
RUN pnpm run build

ENTRYPOINT ["pnpm", "run"]