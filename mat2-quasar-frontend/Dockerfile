# Production build that actually works
FROM node:20

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install Quasar CLI and dependencies
RUN npm install -g @quasar/cli
RUN npm install

# Copy all project files
COPY . .

# Set environment variable for backend URL
ENV MAT2_API_URL_PROD=https://mat2-project-production.up.railway.app/

# Build for production
RUN quasar build -m pwa

# Install simple http server to serve the build
RUN npm install -g serve

# Change to dist directory
WORKDIR /app/dist/pwa

# Expose port
EXPOSE 8080

# Serve the built app
CMD ["serve", "-s", ".", "-l", "8080"]
