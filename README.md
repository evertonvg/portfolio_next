This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

📦 COMANDOS DOCKER ESSENCIAIS - DESENVOLVIMENTO NEXT.JS COM NODE.JS

🔧 1. Build da imagem
docker build -t nome-da-imagem .

🚀 2. Rodar um container
docker run -d -p 3000:3000 --name nome-do-container nome-da-imagem

💾 3. Usar volumes para hot reload
docker run -d -p 3000:3000 \\
-v $(pwd):/app \\
-v /app/node_modules \\
--name nome-do-container nome-da-imagem

📂 4. Entrar no container (modo interativo)
docker exec -it nome-do-container sh

🔄 5. Rebuild e restart usando Docker Compose
docker-compose up --build

docker-compose down

🧼 6. Limpeza de imagens e containers
docker system prune -a

📜 7. Listar containers e imagens
docker ps # containers em execução
docker ps -a # todos os containers (inclusive parados)
docker images # lista de imagens Docker

🧪 8. Rodar comandos diretamente (ex: npm install)
docker run -it --rm nome-da-imagem npm install
docker exec -it portfolio sh

🔁 9. Restartar container existente
docker restart nome-do-container



🧱 10. Remover container/imagem
docker rm nome-do-container
docker rmi nome-da-imagem

docker compose down --volumes
docker compose up --build

sudo chown -R $(id -u):$(id -g) .

npm install -D eslint prettier eslint-config-prettier eslint-plugin-prettier \
 eslint-plugin-react eslint-plugin-react-hooks \
 @typescript-eslint/eslint-plugin @typescript-eslint/parser
