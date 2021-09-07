FROM node:latest AS base

FROM base AS deps
WORKDIR /deps
COPY package*.json ./
RUN yarn install --frozen-lockfile --silent

FROM base AS builder
ARG DATABASE_URL
ARG COOKIE_SECRET
WORKDIR /builder
COPY --from=deps /deps/node_modules ./node_modules
COPY . .
RUN yarn generate
RUN yarn build

FROM base AS runner
ENV NODE_ENV production
ENV PORT 3000

COPY --from=builder /builder/next.config.js ./
COPY --from=builder /builder/public ./public
COPY --from=builder /builder/prisma ./prisma
COPY --from=builder /builder/.next ./.next
COPY --from=builder /builder/node_modules ./node_modules
COPY --from=builder /builder/package.json ./package.json

EXPOSE ${PORT}
CMD [ "yarn", "start" ]