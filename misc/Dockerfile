# Fails to build - https://github.com/adnjoo/tern/issues/16

# Use the official Node.js image.
FROM node:18.20.2

# Install necessary dependencies for Chrome
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    unzip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Add Chrome repository to sources
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'

# Install Chrome
RUN apt-get update && apt-get install -y \
    google-chrome-stable \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy project files
COPY . .

# Expose port (if your app uses one)
# EXPOSE 3000

# Set environment variables if needed
# ENV NODE_ENV=production

# Define the command to run the scraper
CMD ["npm", "run", "scrape-la-eq"]
