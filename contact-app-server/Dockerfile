# Dockerfile (for Node.js backend with SQLite)

# Use an official Node.js runtime as a parent image
FROM node:17-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose port 8888 for the backend server
EXPOSE 8888

# Start the backend server
CMD ["node", "index.js"]