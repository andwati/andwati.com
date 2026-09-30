# syntax=docker/dockerfile:1
# Static site: build with Next (output: export), serve with static-web-server.
#   docker build -t andwati-site \
#     --build-arg PUBLIC_UMAMI_SCRIPT_URL=... --build-arg PUBLIC_UMAMI_WEBSITE_ID=... .

FROM node:24-alpine AS deps
ENV PNPM_HOME=/pnpm PATH=/pnpm:$PATH
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

FROM node:24-alpine AS build
ENV PNPM_HOME=/pnpm PATH=/pnpm:$PATH NEXT_TELEMETRY_DISABLED=1
RUN corepack enable
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Umami is read at build time (pages are prerendered), so pass these as build args.
ARG PUBLIC_UMAMI_SCRIPT_URL
ARG PUBLIC_UMAMI_WEBSITE_ID
ENV PUBLIC_UMAMI_SCRIPT_URL=$PUBLIC_UMAMI_SCRIPT_URL \
    PUBLIC_UMAMI_WEBSITE_ID=$PUBLIC_UMAMI_WEBSITE_ID
RUN pnpm build

FROM ghcr.io/static-web-server/static-web-server:2
COPY --from=build /app/out /public
COPY sws.toml /sws.toml
EXPOSE 80
