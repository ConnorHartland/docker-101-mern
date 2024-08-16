# Stage 1: Base - Install dependencies
FROM node:22-alpine AS base-image

RUN npm i -g pnpm

FROM base-image AS base

WORKDIR /app

RUN npm i -g pnpm

# Copy only package files first to optimize layer caching
COPY package.json ./

COPY pnpm-lock.yaml ./

# Install dependencies
RUN pnpm i

# Copy the application source code
COPY . .

# Default to development mode
ENV NODE_ENV=development

# Expose port for development
EXPOSE 5173

# Command for development
CMD ["pnpm", "run", "dev", "--host"]

# Stage 2: Test - Run tests
FROM base AS test

# Set environment to test
ENV NODE_ENV=test

# Run the tests
CMD ["pnpm", "run", "test"]

# Stage 3: Build - Build the app for production
FROM base AS build

# Set environment to production
ENV NODE_ENV=production

# Build the app
RUN pnpm run build

# Stage 4: Release - Final production image
FROM node:22-alpine AS release

WORKDIR /app

RUN npm i -g pnpm

# Copy the built application from the build stage
COPY --from=build /app/dist ./dist

# Copy only necessary package files for production
COPY package.json pnpm-lock.json ./

# Install only production dependencies
RUN pnpm i --only=production

# Expose the production port
# Start the app in production mode
CMD ["pnpm", "run", "preview"]
