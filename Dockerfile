FROM node:14-alpine AS builder
WORKDIR /app
COPY /*.json ./
COPY . .
RUN npm i
RUN npm run build

FROM node:14-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3535
CMD ["npm", "run", "start:prod"]