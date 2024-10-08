# Use an official Node.js runtime as a parent image
FROM node:17-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

# Start the app with the HTTP server
CMD ["npm", "start"]