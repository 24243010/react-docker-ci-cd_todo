# Stage 1: Build the React frontend
FROM node:18-alpine AS build
WORKDIR /app
COPY my-app/package*.json ./
RUN npm install
COPY my-app/. .
RUN npm run build

# Stage 2: Node backend serves the API and the built frontend
FROM node:18-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install --omit=dev
COPY backend/. .
COPY --from=build /app/dist ./public
ENV PORT=5000
ENV STATIC_DIR=/app/public
EXPOSE 5000
CMD ["node", "server.js"]
