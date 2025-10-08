# Development mode for Railway testing
FROM node:20

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install -g @quasar/cli
RUN npm install

# Copy all files
COPY . .

# Set environment variable for API
ENV MAT2_API_URL_DEV=https://mat2-project-production.up.railway.app/

EXPOSE 8080

# Run in dev mode (hot reload)
CMD ["quasar", "dev"]
