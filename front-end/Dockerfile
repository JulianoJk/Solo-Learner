# Use Node.js 18-slim as the base image
FROM node:alpine

# Sets the working directory
WORKDIR /usr/src/app/front_end

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Add @tabler/icons-react package
RUN yarn add @tabler/icons-react

# Ensure all packages are up to date
RUN yarn 

# Copy the rest of the application files
COPY . .

# Exposes port 3000
EXPOSE 3000

# Runs the command yarn start
CMD ["yarn", "start"]

# cmd ["yarn", "dev", "--debug"]
