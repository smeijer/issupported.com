FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY . .
RUN npm ci --production=false --legacy-peer-deps
RUN npx -y update-browserslist-db@latest
RUN npm run build

EXPOSE 3000
CMD ["yarn", "start"]
