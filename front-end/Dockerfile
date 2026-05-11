FROM node:22-slim

# Set working directory
WORKDIR /usr/src/app/front_end

# Copy only package files first
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application
COPY . .

# Expose dev port
EXPOSE 3000

# Start dev server
CMD ["yarn", "start"]