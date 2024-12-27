# Use the official Node.js image
FROM node:17

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies (this will create node_modules inside the container)
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:dev"]
