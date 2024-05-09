# Use the Node.js base image
FROM node:21

# Set up the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files and install dependencies
COPY package*.json ./

# Install global dependencies
RUN npm install -g prisma ts-node-dev

# Install local dependencies
RUN npm install

# Copy the application code
COPY . .

# Generate database migrations
RUN npm run db:gen

# Compile TypeScript code
RUN npm run build

# Run the application
CMD ["npm", "start"]

