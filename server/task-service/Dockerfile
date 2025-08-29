FROM node:22-alpine AS builder

WORKDIR /builder

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm prune --production

FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/package*.json ./
COPY --from=builder /build/dist ./dist

EXPOSE 3003

CMD [ "npm", "start" ]