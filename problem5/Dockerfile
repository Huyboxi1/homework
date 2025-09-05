# Use official Node.js image as a base
FROM node:lts-alpine

# Install Chromium dependencies
RUN apk add --no-cache \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    dumb-init \
    bash

ENV NODE_OPTIONS="--max-old-space-size=8192"
# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn

# Copy the rest of the application code
COPY . .

# Build TypeScript code
RUN yarn build

# Expose port (matches your app's PORT, default 3000)
EXPOSE 3000


# Start the application
CMD ["dumb-init", "sh" , "-c", "yarn migration && yarn start"]