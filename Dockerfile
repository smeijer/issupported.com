FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY . .
RUN npm ci --production=false
RUN npm run build

ARG NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}

EXPOSE 3000
CMD ["yarn", "start"]
