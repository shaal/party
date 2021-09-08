FROM node:alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /deps
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
ARG DATABASE_URL
ARG COOKIE_SECRET
ENV DATABASE_URL fake
WORKDIR /builder
COPY --from=deps /deps/node_modules ./node_modules
COPY . .
RUN yarn build

# Production image, copy all the files and run next
FROM base AS runner
ENV NODE_ENV production
ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /builder/next.config.js ./
COPY --from=builder /builder/public ./public
COPY --from=builder /builder/prisma ./prisma
COPY --from=builder /builder/.next ./.next
COPY --from=builder /builder/node_modules ./node_modules
COPY --from=builder /builder/package.json ./package.json

EXPOSE ${PORT}
CMD [ "yarn", "start" ]
