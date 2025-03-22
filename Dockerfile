FROM node:18-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json ./

# Install dependencies with legacy peer deps to handle React version conflicts
RUN npm ci --quiet --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Build the app
RUN npm run build

# Use a production-ready server
FROM nginx:alpine

# Copy built files from the previous stage
COPY --from=0 /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]