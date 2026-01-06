# Build stage for React frontend
FROM node:18-alpine AS build-stage
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Copy server dependencies
COPY package*.json ./
RUN npm install --production

# Copy server source
COPY server.js ./
COPY routes/ ./routes/
COPY middleware/ ./middleware/

# Copy built frontend from build-stage
COPY --from=build-stage /app/client/dist ./client/dist

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3001

# Expose port
EXPOSE 3001

# Start the server
CMD ["node", "server.js"]
