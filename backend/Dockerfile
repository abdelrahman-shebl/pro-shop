FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# copy root package files and install general dependencies
COPY package*.json ./
RUN npm install

# copy frontend and build it
COPY frontend ./frontend
WORKDIR /usr/src/app/frontend
RUN npm install
RUN npm run build

### Production image
FROM node:18-alpine
WORKDIR /usr/src/app

ENV NODE_ENV=production

# copy and install only production deps for the server
COPY package*.json ./
# use npm install omitting dev deps to avoid lockfile mismatch in various environments
RUN npm install --omit=dev --no-audit --no-fund

# copy backend source
COPY backend ./backend

# copy built frontend from builder
COPY --from=builder /usr/src/app/frontend/build ./frontend/build

EXPOSE 5000

CMD ["node", "backend/server.js"]
