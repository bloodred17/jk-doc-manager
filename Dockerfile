# Build stage
FROM node:20-alpine

WORKDIR /app

# Copy application files
COPY . .

# Install dependencies and build
RUN npm install
RUN npm run build:backend

# Expose default NestJS port
EXPOSE 3000
EXPOSE 8080

# Command to run the application
CMD ["npm", "run", "start:backend"]
