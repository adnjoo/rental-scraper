# Fails to build - https://github.com/adnjoo/tern/issues/16

# Use the official Node.js image.
FROM node:18.17.0-alpine

# Install necessary dependencies for Chrome
RUN apk add --no-cache chromium chromium-chromedriver

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy project files
COPY . .

USER 1000

# Define the command to run the scraper
CMD ["npm", "run", "scrape-la-eq"]
