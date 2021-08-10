FROM node:alpine as builder
WORKDIR /app

COPY package* ./
COPY tsconfig.json ./

RUN npm ci

COPY src src
RUN npm run build

FROM node:alpine
WORKDIR /app

COPY package* ./
COPY package* ./

RUN npm install --production

COPY --from=builder /app/dist dist

ENV NODE_ENV=production

CMD ["npm","start"]