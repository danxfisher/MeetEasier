FROM node:8-alpine AS build
WORKDIR /app
COPY . .
RUN npm install \
    && cd ui-react \
    && npm install \
    && npm run build

FROM gcr.io/distroless/nodejs
COPY --from=build /app /app
WORKDIR /app
EXPOSE 8080
CMD ["/app/server.js"]
