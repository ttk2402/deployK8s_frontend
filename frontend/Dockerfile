# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Install serve globally to serve the static files
RUN npm install -g serve

# Set the working directory to the build output
WORKDIR /app/build

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["serve", "-s", ".", "-l", "3000"]
